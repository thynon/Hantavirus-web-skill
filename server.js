const http = require("http");
const fs = require("fs");
const path = require("path");

const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || 4188);
const ROOT = __dirname;
const SOURCE_DATA_PATH = path.join(ROOT, "data", "sources.json");
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5.4-mini";
const DEFAULT_PROVIDER_CONFIG = {
  provider: process.env.AI_PROVIDER || (process.env.OPENAI_API_KEY ? "openai" : "openai-compatible"),
  apiKey: process.env.AI_API_KEY || "",
  baseUrl: process.env.AI_BASE_URL || "",
  model: process.env.AI_MODEL || OPENAI_MODEL,
};

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const cache = {
  officialFeed: null,
  sourceHealth: null,
  createdAt: 0,
};

function send(response, statusCode, body, contentType = "text/plain; charset=utf-8") {
  response.writeHead(statusCode, {
    "Content-Type": contentType,
    "Cache-Control": "no-store",
  });
  response.end(body);
}

function sendJson(response, statusCode, payload) {
  send(response, statusCode, JSON.stringify(payload, null, 2), "application/json; charset=utf-8");
}

function readSourceData() {
  return JSON.parse(fs.readFileSync(SOURCE_DATA_PATH, "utf8"));
}

function stripHtml(value = "") {
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(value = "", maxLength = 260) {
  const text = String(value).trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}...`;
}

function uniqueById(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item.id || seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function parseDateValue(value) {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date : null;
}

function sortByAuthorityThenDate(a, b) {
  const authorityDelta = (a.authority || 9) - (b.authority || 9);
  if (authorityDelta !== 0) return authorityDelta;
  const aDate = parseDateValue(a.publishedAt)?.getTime() || 0;
  const bDate = parseDateValue(b.publishedAt)?.getTime() || 0;
  return bDate - aDate;
}

function getSourceById(sourceData, id) {
  return sourceData.sources.find((source) => source.id === id);
}

function getSourceUrl(source) {
  return source.endpoint || source.url;
}

function makeFailureStatus(source, error, startedAt) {
  return {
    id: source.id,
    agency: source.agency,
    name: source.name,
    url: source.url,
    region: source.region,
    country: source.country,
    authority: source.authority,
    ok: false,
    mode: "degraded",
    checkedAt: new Date().toISOString(),
    latencyMs: Date.now() - startedAt,
    error: error.name === "AbortError" ? "timeout" : error.message,
  };
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 9000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        Accept: options.accept || "text/html,application/json,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "User-Agent": "HantavirusOfficialMonitor/1.0 (+local research dashboard)",
        ...options.headers,
      },
      method: options.method || "GET",
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function checkSource(source) {
  const startedAt = Date.now();

  try {
    let upstream = await fetchWithTimeout(getSourceUrl(source), { method: "HEAD" }, 6500);

    if ([403, 405, 406].includes(upstream.status) || source.type === "api" || source.type === "pdf") {
      upstream = await fetchWithTimeout(getSourceUrl(source), { method: "GET" }, 9000);
    }

    return {
      id: source.id,
      agency: source.agency,
      name: source.name,
      url: source.url,
      region: source.region,
      country: source.country,
      authority: source.authority,
      ok: upstream.ok,
      status: upstream.status,
      mode: upstream.ok ? "live" : "degraded",
      checkedAt: new Date().toISOString(),
      latencyMs: Date.now() - startedAt,
      error: upstream.ok ? "" : `HTTP ${upstream.status}`,
    };
  } catch (error) {
    return makeFailureStatus(source, error, startedAt);
  }
}

function getWhoUrl(item) {
  const rawUrl = item.ItemDefaultUrl || item.Url || item.Link || item.UrlName || "";
  if (!rawUrl) return "https://www.who.int/emergencies/disease-outbreak-news";
  if (rawUrl.startsWith("http")) {
    return rawUrl.includes("/item/")
      ? rawUrl
      : rawUrl.replace("/emergencies/disease-outbreak-news/", "/emergencies/disease-outbreak-news/item/");
  }
  const normalizedPath = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;
  if (normalizedPath.startsWith("/emergencies/disease-outbreak-news/item/")) {
    return `https://www.who.int${normalizedPath}`;
  }
  if (/^\/20\d{2}-DON\d+/.test(normalizedPath)) {
    return `https://www.who.int/emergencies/disease-outbreak-news/item${normalizedPath}`;
  }
  return `https://www.who.int${normalizedPath}`;
}

function getWhoDate(item) {
  return item.PublicationDateAndTime || item.PublicationDate || item.LastModified || item.DateCreated || "";
}

function itemMentionsHantavirus(item) {
  const text = [
    item.Title,
    item.OverrideTitle,
    item.Summary,
    item.Overview,
    item.Response,
    item.FurtherInformation,
    item.Epidemiology,
    item.Advice,
    item.Assessment,
    item.UrlName,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return text.includes("hantavirus") || text.includes("hanta") || text.includes("andes virus");
}

function extractWhoMetrics(item, source) {
  const title = stripHtml(item.OverrideTitle || item.Title || "WHO Disease Outbreak News");
  const summary = stripHtml(item.Summary || item.Overview || item.Assessment || "");
  const fullText = stripHtml([item.Summary, item.Overview, item.Epidemiology, item.Response, item.Assessment, item.Advice].filter(Boolean).join(" "));
  const publishedAt = getWhoDate(item);
  const url = getWhoUrl(item);
  const metrics = [];
  const lowerText = fullText.toLowerCase();
  const asOfMatch = fullText.match(/as of\s+([^,.]+),?\s+a total of\s+([0-9,]+)\s+cases?,?\s+including\s+([0-9,]+)\s+deaths?/i);
  const confirmedMatch = fullText.match(/([0-9,]+)\s+cases?\s+have been laboratory-confirmed/i);

  if (asOfMatch) {
    metrics.push({
      id: `who-${item.DonId || item.UrlName || title}-cases`,
      sourceId: source.id,
      source: source.name,
      agency: source.agency,
      authority: source.authority,
      country: "Multi-country",
      region: "Global",
      metric: `${title}: reported cases`,
      value: asOfMatch[2].replace(/,/g, ""),
      unit: "cases",
      publishedAt,
      url,
      excerpt: truncate(asOfMatch[0], 320),
      live: true,
    });
    metrics.push({
      id: `who-${item.DonId || item.UrlName || title}-deaths`,
      sourceId: source.id,
      source: source.name,
      agency: source.agency,
      authority: source.authority,
      country: "Multi-country",
      region: "Global",
      metric: `${title}: reported deaths`,
      value: asOfMatch[3].replace(/,/g, ""),
      unit: "deaths",
      publishedAt,
      url,
      excerpt: truncate(asOfMatch[0], 320),
      live: true,
    });
  }

  if (confirmedMatch) {
    metrics.push({
      id: `who-${item.DonId || item.UrlName || title}-confirmed`,
      sourceId: source.id,
      source: source.name,
      agency: source.agency,
      authority: source.authority,
      country: "Multi-country",
      region: "Global",
      metric: `${title}: laboratory-confirmed infections`,
      value: confirmedMatch[1].replace(/,/g, ""),
      unit: "confirmed infections",
      publishedAt,
      url,
      excerpt: truncate(confirmedMatch[0], 240),
      live: true,
    });
  }

  if (lowerText.includes("risk") && (lowerText.includes("low") || lowerText.includes("moderate"))) {
    const riskSentence = fullText
      .split(/(?<=[.!?])\s+/)
      .find((sentence) => /risk/i.test(sentence) && /(low|moderate|high)/i.test(sentence));

    if (riskSentence) {
      metrics.push({
        id: `who-${item.DonId || item.UrlName || title}-risk`,
        sourceId: source.id,
        source: source.name,
        agency: source.agency,
        authority: source.authority,
        country: "Global",
        region: "Global",
        metric: `${title}: risk assessment`,
        value: truncate(riskSentence, 140),
        unit: "risk statement",
        publishedAt,
        url,
        excerpt: truncate(riskSentence, 320),
        live: true,
      });
    }
  }

  return {
    event: {
      id: item.DonId || item.UrlName || title,
      title,
      agency: source.agency,
      source: source.name,
      authority: source.authority,
      region: "Global",
      country: "Multi-country",
      publishedAt,
      url,
      summary: truncate(summary || fullText, 420),
      excerpt: truncate(fullText, 520),
      live: true,
    },
    metrics,
  };
}

async function fetchWhoFeed(source) {
  const startedAt = Date.now();

  try {
    const upstream = await fetchWithTimeout(source.endpoint, { accept: "application/json" }, 10000);
    const text = await upstream.text();
    if (!upstream.ok) {
      throw new Error(`HTTP ${upstream.status}`);
    }

    const payload = JSON.parse(text);
    const items = Array.isArray(payload.value) ? payload.value : [];
    const hantavirusItems = items.filter(itemMentionsHantavirus);
    const normalized = hantavirusItems.map((item) => extractWhoMetrics(item, source));

    return {
      status: {
        id: source.id,
        agency: source.agency,
        name: source.name,
        url: source.url,
        region: source.region,
        country: source.country,
        authority: source.authority,
        ok: true,
        status: upstream.status,
        mode: "live",
        checkedAt: new Date().toISOString(),
        latencyMs: Date.now() - startedAt,
        error: "",
        count: hantavirusItems.length,
      },
      events: normalized.map((item) => item.event),
      metrics: normalized.flatMap((item) => item.metrics),
    };
  } catch (error) {
    return {
      status: makeFailureStatus(source, error, startedAt),
      events: [],
      metrics: [],
    };
  }
}

function buildCountryCards(sourceData, metrics, health) {
  const sourceMap = new Map(sourceData.sources.map((source) => [source.id, source]));
  const healthMap = new Map(health.map((status) => [status.id, status]));

  return sourceData.countrySeeds.map((country) => {
    const sourceIds = country.sourceIds || [];
    const countrySources = sourceIds.map((id) => sourceMap.get(id)).filter(Boolean);
    const countryMetrics = metrics
      .filter((metric) => {
        if (metric.country === country.country) return true;
        if (country.sourceIds.includes(metric.sourceId)) return true;
        if (metric.country === "Americas" && country.region.includes("America")) return true;
        if (metric.country === "EU/EEA" && country.region === "Europe") return true;
        return false;
      })
      .sort(sortByAuthorityThenDate)
      .slice(0, 5);
    const bestMetric = countryMetrics[0] || null;
    const sourceHealth = sourceIds.map((id) => healthMap.get(id)).filter(Boolean);
    const onlineCount = sourceHealth.filter((item) => item.ok).length;

    return {
      country: country.country,
      region: country.region,
      authority: country.authority,
      headline: country.headline,
      topSource: countrySources.sort((a, b) => (a.authority || 9) - (b.authority || 9))[0] || null,
      sourceCount: countrySources.length,
      onlineCount,
      sourceHealth,
      metrics: countryMetrics,
      bestMetric,
      status: bestMetric ? "has-evidence" : onlineCount ? "source-ready" : "degraded",
    };
  });
}

function buildRegionalStats(metrics) {
  const groups = new Map();

  for (const metric of metrics) {
    if (!groups.has(metric.region)) {
      groups.set(metric.region, {
        region: metric.region,
        metrics: [],
        authorities: new Set(),
        latest: "",
      });
    }

    const group = groups.get(metric.region);
    group.metrics.push(metric);
    group.authorities.add(metric.agency);
    if (!group.latest || (parseDateValue(metric.publishedAt)?.getTime() || 0) > (parseDateValue(group.latest)?.getTime() || 0)) {
      group.latest = metric.publishedAt;
    }
  }

  return [...groups.values()].map((group) => ({
    region: group.region,
    metrics: group.metrics.sort(sortByAuthorityThenDate).slice(0, 4),
    agencyCount: group.authorities.size,
    latest: group.latest,
  }));
}

function providerLabel(provider = "openai-compatible") {
  const labels = {
    openai: "OpenAI",
    "openai-compatible": "OpenAI-compatible",
    anthropic: "Anthropic",
    gemini: "Google Gemini",
    deepseek: "DeepSeek",
    qwen: "通义千问 / Qwen",
    openrouter: "OpenRouter",
    mistral: "Mistral AI",
    groq: "Groq",
    kimi: "Moonshot Kimi",
    zhipu: "智谱 GLM",
    xai: "xAI",
  };
  return labels[provider] || provider;
}

function providerEnvKey(provider = "openai-compatible") {
  const byProvider = {
    openai: process.env.OPENAI_API_KEY,
    "openai-compatible": process.env.AI_API_KEY || process.env.OPENAI_API_KEY,
    anthropic: process.env.ANTHROPIC_API_KEY,
    gemini: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY,
    deepseek: process.env.DEEPSEEK_API_KEY,
    qwen: process.env.DASHSCOPE_API_KEY || process.env.QWEN_API_KEY,
    openrouter: process.env.OPENROUTER_API_KEY,
    mistral: process.env.MISTRAL_API_KEY,
    groq: process.env.GROQ_API_KEY,
    kimi: process.env.MOONSHOT_API_KEY || process.env.KIMI_API_KEY,
    zhipu: process.env.ZHIPU_API_KEY || process.env.GLM_API_KEY,
    xai: process.env.XAI_API_KEY,
  };
  return byProvider[provider] || DEFAULT_PROVIDER_CONFIG.apiKey || process.env.OPENAI_API_KEY || "";
}

function buildManualSummary(evidence, config = {}) {
  const top = evidence.slice().sort(sortByAuthorityThenDate).slice(0, 5);
  const citations = top.map((item) => ({
    source: item.source,
    url: item.url,
    publishedAt: item.publishedAt,
  }));

  return {
    mode: "manual",
    available: false,
    provider: config.provider || "openai-compatible",
    providerLabel: providerLabel(config.provider),
    reason: `${providerLabel(config.provider)} API key is not configured. Official data is shown, but AI summary is disabled.`,
    summary: {
      zh: `AI 摘要不可用，因为本地没有配置 ${providerLabel(config.provider)} 的 API Key。页面仍显示官方来源、证据摘录、统计数字和来源健康状态。`,
      en: `AI summary is unavailable because the ${providerLabel(config.provider)} API key is not configured. The page still shows official sources, evidence excerpts, metrics, and source health.`
    },
    keyNumbers: top.map((item) => ({
      metric: item.metric,
      value: item.value,
      unit: item.unit,
      source: item.source,
      publishedAt: item.publishedAt,
      url: item.url,
    })),
    affectedCountries: [...new Set(top.map((item) => item.country).filter(Boolean))],
    riskAssessment: {
      zh: "未生成 AI 风险摘要；请查看每条官方证据的原始来源。",
      en: "No AI risk summary was generated; review each official evidence item at source."
    },
    citations,
  };
}

function normalizeProviderConfig(config = {}) {
  const provider = String(config.provider || DEFAULT_PROVIDER_CONFIG.provider || "openai").trim();
  const defaults = {
    openai: { baseUrl: "https://api.openai.com/v1", model: OPENAI_MODEL },
    "openai-compatible": { baseUrl: "https://api.openai.com/v1", model: OPENAI_MODEL },
    anthropic: { baseUrl: "https://api.anthropic.com/v1", model: "claude-3-5-sonnet-latest" },
    gemini: { baseUrl: "https://generativelanguage.googleapis.com/v1beta", model: "gemini-1.5-pro" },
    deepseek: { baseUrl: "https://api.deepseek.com/v1", model: "deepseek-chat" },
    qwen: { baseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1", model: "qwen-plus" },
    openrouter: { baseUrl: "https://openrouter.ai/api/v1", model: "openai/gpt-4o-mini" },
    mistral: { baseUrl: "https://api.mistral.ai/v1", model: "mistral-large-latest" },
    groq: { baseUrl: "https://api.groq.com/openai/v1", model: "llama-3.3-70b-versatile" },
    kimi: { baseUrl: "https://api.moonshot.cn/v1", model: "moonshot-v1-32k" },
    zhipu: { baseUrl: "https://open.bigmodel.cn/api/paas/v4", model: "glm-4-plus" },
    xai: { baseUrl: "https://api.x.ai/v1", model: "grok-2-latest" },
  };
  const selected = defaults[provider] || defaults["openai-compatible"];

  return {
    provider,
    apiKey: String(config.apiKey || providerEnvKey(provider) || "").trim(),
    baseUrl: String(config.baseUrl || DEFAULT_PROVIDER_CONFIG.baseUrl || selected.baseUrl).replace(/\/+$/, ""),
    model: String(config.model || process.env.AI_MODEL || selected.model).trim(),
  };
}

function buildSummaryPrompt(evidenceForAi, language) {
  return [
    "You are an evidence-bound public-health summarizer.",
    "Use only the provided evidence JSON. Do not infer missing case counts, deaths, trends, or risk levels.",
    "Every statement and every key number must cite at least one URL from the evidence.",
    "If evidence conflicts, present sources side by side and say the dates or scopes differ.",
    "Return strict JSON only, with this shape:",
    "{ \"summary\": { \"zh\": string, \"en\": string }, \"statements\": [{ \"zh\": string, \"en\": string, \"citations\": [url] }], \"keyNumbers\": [{ \"metric\": string, \"value\": string, \"unit\": string, \"country\": string, \"source\": string, \"publishedAt\": string, \"url\": string }], \"affectedCountries\": [string], \"riskAssessment\": { \"zh\": string, \"en\": string }, \"citations\": [{ \"source\": string, \"url\": string, \"publishedAt\": string }] }",
    JSON.stringify({ preferredLanguage: language, evidence: evidenceForAi }),
  ].join("\n\n");
}

function extractJsonText(text) {
  const trimmed = String(text || "").trim();
  if (trimmed.startsWith("{")) return trimmed;
  const match = trimmed.match(/\{[\s\S]*\}/);
  return match ? match[0] : trimmed;
}

async function callOpenAiCompatible(config, prompt) {
  const makeBody = (withResponseFormat) => ({
    model: config.model,
    messages: [
      { role: "system", content: "Return strict JSON only. No markdown." },
      { role: "user", content: prompt },
    ],
    ...(withResponseFormat ? { response_format: { type: "json_object" } } : {}),
    temperature: 0.1,
  });

  const post = (withResponseFormat) => fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(makeBody(withResponseFormat)),
  });

  let response = await post(true);
  let payload = await response.json();
  const message = payload?.error?.message || "";
  if (!response.ok && /response_format|json_object|unsupported/i.test(message)) {
    response = await post(false);
    payload = await response.json();
  }

  if (!response.ok) throw new Error(payload?.error?.message || `AI API error ${response.status}`);
  return payload.choices?.[0]?.message?.content || "";
}

async function callAnthropic(config, prompt) {
  const response = await fetch(`${config.baseUrl}/messages`, {
    method: "POST",
    headers: {
      "x-api-key": config.apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: 1800,
      temperature: 0,
      system: "Return strict JSON only. No markdown.",
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload?.error?.message || `Anthropic API error ${response.status}`);
  return (payload.content || []).map((part) => part.text || "").join("");
}

async function callGemini(config, prompt) {
  const url = `${config.baseUrl}/models/${encodeURIComponent(config.model)}:generateContent?key=${encodeURIComponent(config.apiKey)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0,
        responseMimeType: "application/json",
      },
    }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload?.error?.message || `Gemini API error ${response.status}`);
  return payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("") || "";
}

function makeEvidenceForAi(evidence) {
  return evidence.slice().sort(sortByAuthorityThenDate).slice(0, 24).map((item) => ({
    source: item.source,
    url: item.url,
    publishedAt: item.publishedAt,
    country: item.country,
    metric: item.metric,
    value: item.value,
    unit: item.unit,
    excerpt: item.excerpt,
  }));
}

function filterAiSummary(summary, evidence, config = {}) {
  const allowedUrls = new Set(evidence.map((item) => item.url).filter(Boolean));
  const citations = Array.isArray(summary.citations)
    ? summary.citations.filter((citation) => citation?.url && allowedUrls.has(citation.url))
    : [];

  const keyNumbers = Array.isArray(summary.keyNumbers)
    ? summary.keyNumbers.filter((item) => item?.url && allowedUrls.has(item.url))
    : [];

  const statements = Array.isArray(summary.statements)
    ? summary.statements.filter((item) => Array.isArray(item.citations) && item.citations.some((url) => allowedUrls.has(url)))
    : [];

  return {
    mode: "ai",
    available: citations.length > 0 || keyNumbers.length > 0 || statements.length > 0,
    provider: config.provider || "openai-compatible",
    providerLabel: providerLabel(config.provider),
    generatedAt: new Date().toISOString(),
    summary: {
      zh: String(summary?.summary?.zh || "").trim(),
      en: String(summary?.summary?.en || "").trim(),
    },
    statements,
    keyNumbers,
    affectedCountries: Array.isArray(summary.affectedCountries) ? summary.affectedCountries.slice(0, 16) : [],
    riskAssessment: {
      zh: String(summary?.riskAssessment?.zh || "").trim(),
      en: String(summary?.riskAssessment?.en || "").trim(),
    },
    citations,
  };
}

async function callOpenAiSummary(evidence, language = "zh", providerConfig = {}) {
  const config = normalizeProviderConfig(providerConfig);
  if (!config.apiKey) {
    return buildManualSummary(evidence, config);
  }

  const evidenceForAi = makeEvidenceForAi(evidence);
  const prompt = buildSummaryPrompt(evidenceForAi, language);
  const summarySchema = {
    type: "object",
    additionalProperties: false,
    required: ["summary", "statements", "keyNumbers", "affectedCountries", "riskAssessment", "citations"],
    properties: {
      summary: {
        type: "object",
        additionalProperties: false,
        required: ["zh", "en"],
        properties: {
          zh: { type: "string" },
          en: { type: "string" },
        },
      },
      statements: {
        type: "array",
        maxItems: 6,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["zh", "en", "citations"],
          properties: {
            zh: { type: "string" },
            en: { type: "string" },
            citations: {
              type: "array",
              minItems: 1,
              items: { type: "string" },
            },
          },
        },
      },
      keyNumbers: {
        type: "array",
        maxItems: 8,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["metric", "value", "unit", "country", "source", "publishedAt", "url"],
          properties: {
            metric: { type: "string" },
            value: { type: "string" },
            unit: { type: "string" },
            country: { type: "string" },
            source: { type: "string" },
            publishedAt: { type: "string" },
            url: { type: "string" },
          },
        },
      },
      affectedCountries: {
        type: "array",
        maxItems: 16,
        items: { type: "string" },
      },
      riskAssessment: {
        type: "object",
        additionalProperties: false,
        required: ["zh", "en"],
        properties: {
          zh: { type: "string" },
          en: { type: "string" },
        },
      },
      citations: {
        type: "array",
        minItems: 1,
        maxItems: 12,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["source", "url", "publishedAt"],
          properties: {
            source: { type: "string" },
            url: { type: "string" },
            publishedAt: { type: "string" },
          },
        },
      },
    },
  };
  if (config.provider !== "openai") {
    let text = "";
    if (config.provider === "anthropic") text = await callAnthropic(config, prompt);
    else if (config.provider === "gemini") text = await callGemini(config, prompt);
    else text = await callOpenAiCompatible(config, prompt);
    return filterAiSummary(JSON.parse(extractJsonText(text)), evidenceForAi, config);
  }

  const instructions = prompt;
  const response = await fetch(`${config.baseUrl}/responses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      instructions,
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify({
                preferredLanguage: language,
                evidence: evidenceForAi,
              }),
            },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "hantavirus_evidence_summary",
          strict: true,
          schema: summarySchema,
        },
      },
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.error?.message || `OpenAI API error ${response.status}`);
  }

  const rawText = payload.output_text || payload.output?.flatMap((item) => item.content || []).find((item) => item.type === "output_text")?.text || "";
  const parsed = JSON.parse(rawText);
  return filterAiSummary(parsed, evidenceForAi, config);
}

async function buildOfficialFeed(force = false) {
  if (!force && cache.officialFeed && Date.now() - cache.createdAt < 1000 * 60 * 8) {
    return cache.officialFeed;
  }

  const sourceData = readSourceData();
  const whoSource = getSourceById(sourceData, "who-don");
  const whoResult = whoSource ? await fetchWhoFeed(whoSource) : { status: null, events: [], metrics: [] };
  const highValueSourceIds = new Set([
    "cdc-hantavirus",
    "cdc-situation",
    "cdc-reported-cases",
    "cdc-nndss",
    "paho-alert-2025",
    "paho-topic",
    "ecdc-hantavirus",
    "ecdc-aer-2023",
    "argentina-health",
    "chile-health",
    "brazil-health",
    "china-cdc",
    "korea-kdca",
    "germany-rki",
    "finland-thl",
    "south-africa-nicd",
  ]);
  const healthChecks = await Promise.all(
    sourceData.sources
      .filter((source) => source.id !== "who-don" && highValueSourceIds.has(source.id))
      .map(checkSource),
  );
  const health = [whoResult.status, ...healthChecks].filter(Boolean);
  const healthById = new Map(health.map((status) => [status.id, status]));
  const seedMetrics = sourceData.seedMetrics.map((metric) => ({
    ...metric,
    live: false,
    fallback: true,
  }));
  const liveMetricIds = new Set(whoResult.metrics.map((metric) => metric.id));
  const metrics = uniqueById([
    ...whoResult.metrics,
    ...seedMetrics.filter((metric) => !liveMetricIds.has(metric.id)),
  ]).sort(sortByAuthorityThenDate);
  const events = [
    ...whoResult.events,
    {
      id: "who-don600-snapshot",
      title: "Hantavirus cluster linked to cruise ship travel, Multi-country",
      agency: "WHO",
      source: "WHO Disease Outbreak News",
      authority: 1,
      region: "Global",
      country: "Multi-country",
      publishedAt: "2026-05-08",
      url: "https://www.who.int/emergencies/disease-outbreak-news/item/2026-DON600",
      summary: "WHO reported a multi-country hantavirus cluster linked to cruise-ship travel, including cases, deaths, laboratory confirmation, and risk assessment.",
      excerpt: "As of 8 May, a total of eight cases, including three deaths, have been reported. Six cases have been laboratory-confirmed as hantavirus infections, with all identified as Andes virus.",
      live: false,
    },
    {
      id: "paho-2025-alert",
      title: "Epidemiological Alert: Hantavirus Pulmonary Syndrome in the Americas",
      agency: "PAHO",
      source: "PAHO Epidemiological Alert",
      authority: 1,
      region: "Americas",
      country: "Americas",
      publishedAt: "2025-12-19",
      url: "https://www.paho.org/sites/default/files/2025-12/2025-12-19-epidemiological-alert-hantavirus-engfinal_0.pdf",
      summary: "PAHO reported HPS cases, deaths, and public-health recommendations for the Region of the Americas in 2025 through epidemiological week 47.",
      excerpt: "In 2025, as of epidemiological week 47, eight countries reported 229 cases and 59 deaths, with a case fatality rate of 25.7%.",
      live: false,
    },
    {
      id: "ecdc-2023-aer",
      title: "Hantavirus infection - Annual Epidemiological Report for 2023",
      agency: "ECDC",
      source: "ECDC Annual Epidemiological Report",
      authority: 1,
      region: "Europe",
      country: "EU/EEA",
      publishedAt: "2025-07-17",
      url: "https://www.ecdc.europa.eu/en/publications-data/hantavirus-infection-annual-epidemiological-report-2023",
      summary: "ECDC reported EU/EEA hantavirus infection surveillance for 2023 and regional distribution patterns.",
      excerpt: "In the European Region, 1885 hantavirus infections were reported in 2023, marking the lowest rate observed between 2019 and 2023.",
      live: false,
    },
    {
      id: "cdc-current-situation",
      title: "CDC Hantavirus Current Situation",
      agency: "CDC",
      source: "CDC Current Situation",
      authority: 1,
      region: "North America",
      country: "United States",
      publishedAt: "2026-05-08",
      url: "https://www.cdc.gov/hantavirus/situation-summary/index.html",
      summary: "CDC current situation page provides United States public-risk context and travel-related monitoring information.",
      excerpt: "CDC describes the current risk to the general U.S. public and travelers as extremely low and says no cases have been reported in the United States related to the cruise-ship event.",
      live: false,
    },
  ]
    .filter((event, index, events) => events.findIndex((candidate) => candidate.id === event.id || candidate.url === event.url) === index)
    .sort(sortByAuthorityThenDate);
  const countries = buildCountryCards(sourceData, metrics, health);
  const regionalStats = buildRegionalStats(metrics);
  const feed = {
    generatedAt: new Date().toISOString(),
    metadata: sourceData.metadata,
    sources: sourceData.sources,
    health,
    metrics,
    evidence: metrics.map((metric) => ({
      source: metric.source,
      url: metric.url,
      publishedAt: metric.publishedAt,
      country: metric.country,
      metric: metric.metric,
      value: metric.value,
      unit: metric.unit,
      excerpt: metric.excerpt,
      authority: metric.authority,
      agency: metric.agency,
    })),
    events,
    countries,
    regionalStats,
    stats: {
      sourceCount: sourceData.sources.length,
      checkedSources: health.length,
      onlineSources: health.filter((item) => item.ok).length,
      evidenceCount: metrics.length,
      countryCount: countries.length,
      highestAuthorityMetrics: metrics.filter((metric) => metric.authority === 1).length,
      degradedSources: health.filter((item) => !item.ok).length,
    },
    degradation: health
      .filter((item) => !item.ok)
      .map((item) => ({
        id: item.id,
        name: item.name,
        agency: item.agency,
        url: item.url,
        error: item.error,
      })),
  };

  cache.officialFeed = feed;
  cache.sourceHealth = {
    generatedAt: feed.generatedAt,
    health,
    stats: feed.stats,
  };
  cache.createdAt = Date.now();

  return feed;
}

async function handleOfficialFeed(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const force = url.searchParams.get("force") === "1";

  try {
    const feed = await buildOfficialFeed(force);
    sendJson(response, 200, feed);
  } catch (error) {
    sendJson(response, 500, {
      error: "official-feed failed",
      message: error.message,
    });
  }
}

async function handleSourceHealth(response) {
  try {
    if (!cache.sourceHealth) {
      await buildOfficialFeed(false);
    }
    sendJson(response, 200, cache.sourceHealth);
  } catch (error) {
    sendJson(response, 500, {
      error: "source-health failed",
      message: error.message,
    });
  }
}

async function readRequestJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error("Request body is too large"));
      }
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    request.on("error", reject);
  });
}

async function handleAiSummary(request, response) {
  try {
    const body = request.method === "POST" ? await readRequestJson(request) : {};
    const feed = await buildOfficialFeed(false);
    const evidence = Array.isArray(body.evidence) && body.evidence.length ? body.evidence : feed.evidence;
    const summary = await callOpenAiSummary(evidence, body.language || "zh", body.providerConfig || {});
    sendJson(response, 200, summary);
  } catch (error) {
    sendJson(response, 502, {
      mode: "error",
      available: false,
      error: "ai-summary failed",
      message: error.message,
      fallback: buildManualSummary((cache.officialFeed && cache.officialFeed.evidence) || [], body.providerConfig || {}),
    });
  }
}

function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const pathname = url.pathname === "/" ? "/hantavirus.html" : url.pathname;
  const filePath = path.resolve(ROOT, `.${pathname}`);

  if (!filePath.startsWith(ROOT)) {
    send(response, 403, "Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      send(response, 404, "Not found");
      return;
    }

    send(response, 200, data, contentTypes[path.extname(filePath)] || "application/octet-stream");
  });
}

const server = http.createServer((request, response) => {
  if (request.url.startsWith("/api/official-feed")) {
    handleOfficialFeed(request, response);
    return;
  }

  if (request.url.startsWith("/api/source-health")) {
    handleSourceHealth(response);
    return;
  }

  if (request.url.startsWith("/api/ai-summary")) {
    handleAiSummary(request, response);
    return;
  }

  serveStatic(request, response);
});

function startServer() {
  server.listen(PORT, HOST, () => {
    console.log(`Hantavirus official monitor running at http://${HOST}:${PORT}/`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use. Start with PORT=4189 npm start to choose another port.`);
      process.exit(1);
    }
    if (error.code === "EACCES" || error.code === "EPERM") {
      console.error(`Could not listen on ${HOST}:${PORT}. Check local permissions or start outside the restricted sandbox.`);
      process.exit(1);
    }
    throw error;
  });
}

if (require.main === module) {
  startServer();
}

module.exports = {
  buildOfficialFeed,
  callOpenAiSummary,
  startServer,
};
