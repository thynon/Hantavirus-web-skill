const ENDPOINTS = {
  feed: "/api/official-feed",
  ai: "/api/ai-summary",
};

const OFFLINE_FEED = {
  generatedAt: "2026-05-09T00:00:00Z",
  metadata: {
    snapshotDate: "2026-05-09",
  },
  sources: [
    {
      id: "who-don",
      agency: "WHO",
      name: "WHO Disease Outbreak News",
      type: "api",
      authority: 1,
      region: "Global",
      country: "Global",
      url: "https://www.who.int/emergencies/disease-outbreak-news",
    },
    {
      id: "cdc-situation",
      agency: "CDC",
      name: "CDC Current Situation",
      type: "page",
      authority: 1,
      region: "North America",
      country: "United States",
      url: "https://www.cdc.gov/hantavirus/situation-summary/index.html",
    },
    {
      id: "cdc-reported-cases",
      agency: "CDC",
      name: "CDC Reported Cases",
      type: "page",
      authority: 1,
      region: "North America",
      country: "United States",
      url: "https://www.cdc.gov/hantavirus/data-research/cases/index.html",
    },
    {
      id: "paho-alert-2025",
      agency: "PAHO",
      name: "Epidemiological Alert: Hantavirus Pulmonary Syndrome in the Americas",
      type: "pdf",
      authority: 1,
      region: "Americas",
      country: "Americas",
      url: "https://www.paho.org/sites/default/files/2025-12/2025-12-19-epidemiological-alert-hantavirus-engfinal_0.pdf",
    },
    {
      id: "ecdc-aer-2023",
      agency: "ECDC",
      name: "Annual Epidemiological Report for 2023",
      type: "page",
      authority: 1,
      region: "Europe",
      country: "EU/EEA",
      url: "https://www.ecdc.europa.eu/en/publications-data/hantavirus-infection-annual-epidemiological-report-2023",
    },
    {
      id: "argentina-health",
      agency: "National",
      name: "Argentina Ministry of Health",
      type: "page",
      authority: 2,
      region: "South America",
      country: "Argentina",
      url: "https://www.argentina.gob.ar/salud",
    },
    {
      id: "chile-health",
      agency: "National",
      name: "Chile Ministry of Health",
      type: "page",
      authority: 2,
      region: "South America",
      country: "Chile",
      url: "https://www.minsal.cl/",
    },
    {
      id: "brazil-health",
      agency: "National",
      name: "Brazil Ministry of Health",
      type: "page",
      authority: 2,
      region: "South America",
      country: "Brazil",
      url: "https://www.gov.br/saude/",
    },
    {
      id: "china-cdc",
      agency: "National",
      name: "Chinese Center for Disease Control and Prevention",
      type: "page",
      authority: 2,
      region: "East Asia",
      country: "China",
      url: "https://www.chinacdc.cn/",
    },
    {
      id: "korea-kdca",
      agency: "National",
      name: "Korea Disease Control and Prevention Agency",
      type: "page",
      authority: 2,
      region: "East Asia",
      country: "South Korea",
      url: "https://www.kdca.go.kr/",
    },
    {
      id: "germany-rki",
      agency: "National",
      name: "Robert Koch Institute",
      type: "page",
      authority: 2,
      region: "Europe",
      country: "Germany",
      url: "https://www.rki.de/",
    },
    {
      id: "south-africa-nicd",
      agency: "National",
      name: "National Institute for Communicable Diseases",
      type: "page",
      authority: 2,
      region: "Southern Africa",
      country: "South Africa",
      url: "https://www.nicd.ac.za/",
    },
  ],
  health: [],
  metrics: [
    {
      id: "who-don600-cases",
      sourceId: "who-don",
      source: "WHO Disease Outbreak News",
      agency: "WHO",
      authority: 1,
      country: "Multi-country",
      region: "Global",
      metric: "reported cases in cruise-ship cluster",
      value: "8",
      unit: "cases",
      publishedAt: "2026-05-08",
      url: "https://www.who.int/emergencies/disease-outbreak-news/item/2026-DON600",
      excerpt: "As of 8 May, a total of eight cases, including three deaths, have been reported. Six cases have been laboratory-confirmed as hantavirus infections, with all identified as Andes virus.",
      fallback: true,
    },
    {
      id: "who-don600-deaths",
      sourceId: "who-don",
      source: "WHO Disease Outbreak News",
      agency: "WHO",
      authority: 1,
      country: "Multi-country",
      region: "Global",
      metric: "reported deaths in cruise-ship cluster",
      value: "3",
      unit: "deaths",
      publishedAt: "2026-05-08",
      url: "https://www.who.int/emergencies/disease-outbreak-news/item/2026-DON600",
      excerpt: "As of 8 May, a total of eight cases, including three deaths, have been reported.",
      fallback: true,
    },
    {
      id: "who-don600-confirmed",
      sourceId: "who-don",
      source: "WHO Disease Outbreak News",
      agency: "WHO",
      authority: 1,
      country: "Multi-country",
      region: "Global",
      metric: "laboratory-confirmed infections in cruise-ship cluster",
      value: "6",
      unit: "confirmed infections",
      publishedAt: "2026-05-08",
      url: "https://www.who.int/emergencies/disease-outbreak-news/item/2026-DON600",
      excerpt: "Six cases have been laboratory-confirmed as hantavirus infections, with all identified as Andes virus.",
      fallback: true,
    },
    {
      id: "cdc-situation-us-risk",
      sourceId: "cdc-situation",
      source: "CDC Current Situation",
      agency: "CDC",
      authority: 1,
      country: "United States",
      region: "North America",
      metric: "current United States public risk",
      value: "extremely low",
      unit: "risk statement",
      publishedAt: "2026-05-08",
      url: "https://www.cdc.gov/hantavirus/situation-summary/index.html",
      excerpt: "CDC describes the current risk to the general U.S. public and travelers as extremely low and says no cases have been reported in the United States related to the cruise-ship event.",
      fallback: true,
    },
    {
      id: "paho-2025-americas-cases",
      sourceId: "paho-alert-2025",
      source: "PAHO Epidemiological Alert",
      agency: "PAHO",
      authority: 1,
      country: "Americas",
      region: "Americas",
      metric: "HPS cases reported in the Americas in 2025 through epidemiological week 47",
      value: "229",
      unit: "cases",
      publishedAt: "2025-12-19",
      url: "https://www.paho.org/sites/default/files/2025-12/2025-12-19-epidemiological-alert-hantavirus-engfinal_0.pdf",
      excerpt: "In 2025, as of epidemiological week 47, eight countries in the Region of the Americas reported 229 cases of HPS.",
      fallback: true,
    },
    {
      id: "paho-2025-americas-deaths",
      sourceId: "paho-alert-2025",
      source: "PAHO Epidemiological Alert",
      agency: "PAHO",
      authority: 1,
      country: "Americas",
      region: "Americas",
      metric: "HPS deaths reported in the Americas in 2025 through epidemiological week 47",
      value: "59",
      unit: "deaths",
      publishedAt: "2025-12-19",
      url: "https://www.paho.org/sites/default/files/2025-12/2025-12-19-epidemiological-alert-hantavirus-engfinal_0.pdf",
      excerpt: "In 2025, as of epidemiological week 47, eight countries reported 229 cases and 59 deaths, with a case fatality rate of 25.7%.",
      fallback: true,
    },
    {
      id: "ecdc-2023-eueea-cases",
      sourceId: "ecdc-aer-2023",
      source: "ECDC Annual Epidemiological Report",
      agency: "ECDC",
      authority: 1,
      country: "EU/EEA",
      region: "Europe",
      metric: "hantavirus infections reported by EU/EEA countries in 2023",
      value: "1885",
      unit: "cases",
      publishedAt: "2025-07-17",
      url: "https://www.ecdc.europa.eu/en/publications-data/hantavirus-infection-annual-epidemiological-report-2023",
      excerpt: "In the European Region, 1885 hantavirus infections were reported in 2023, marking the lowest rate observed between 2019 and 2023.",
      fallback: true,
    },
    {
      id: "ecdc-2023-finland-germany-share",
      sourceId: "ecdc-aer-2023",
      source: "ECDC Annual Epidemiological Report",
      agency: "ECDC",
      authority: 1,
      country: "Finland; Germany",
      region: "Europe",
      metric: "share of EU/EEA hantavirus infections reported by Finland and Germany in 2023",
      value: "60.5",
      unit: "percent",
      publishedAt: "2025-07-17",
      url: "https://www.ecdc.europa.eu/en/publications-data/hantavirus-infection-annual-epidemiological-report-2023",
      excerpt: "Finland and Germany together accounted for 60.5% of reported EU/EEA hantavirus infections in 2023.",
      fallback: true,
    },
  ],
  events: [
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
    },
  ],
};

const translations = {
  zh: {
    "nav.sources": "来源",
    "nav.countries": "国家",
    "nav.ai": "AI 摘要",
    "nav.health": "健康状态",
    "nav.disclaimer": "免责声明",
    "actions.refresh": "刷新",
    "actions.refreshAi": "刷新摘要",
    "actions.refreshing": "刷新中",
    "actions.refreshingAi": "摘要中",
    "hero.kicker": "多机构官方数据",
    "hero.title": "全球 Hantavirus 官方监测。",
    "hero.lede": "从 WHO、CDC、PAHO、ECDC 与国家卫生机构交叉核验数据。AI 只摘要可追溯的官方证据，不猜测病例数、趋势或风险。",
    "hero.policy": "最高权威优先，其次按日期并排显示。",
    "hero.sources": "官方来源",
    "cards.latestEvent": "最新国际事件",
    "cards.authority": "最高权威证据",
    "cards.countries": "国家/地区池",
    "cards.countriesHint": "全球广覆盖",
    "cards.ai": "AI 可信状态",
    "sources.kicker": "官方来源总览",
    "sources.title": "不是 WHO 独角戏，而是多机构交叉核验。",
    "sources.body": "每个数字保留来源、日期和摘录。若来源阻挡抓取，页面展示降级原因和官方链接。",
    "countries.kicker": "国家数据矩阵",
    "countries.title": "全球国家池，按证据和来源状态排序。",
    "countries.search": "搜索国家或地区",
    "regions.all": "全部地区",
    "regional.kicker": "区域统计",
    "regional.title": "不同口径并排显示，不强行合并。",
    "timeline.kicker": "事件时间线",
    "timeline.title": "从最新事件到区域基线。",
    "ai.kicker": "严谨 AI 摘要",
    "ai.title": "AI 只处理官方证据包。",
    "ai.body": "输入字段被限制为来源、链接、发布日期、国家、指标、数值和摘录。没有引用的结论会被丢弃。",
    "ai.button": "生成 AI 摘要",
    "ai.generating": "生成中",
    "ai.empty": "等待生成。可在左侧配置任意支持的 AI 供应商。",
    "ai.unavailable": "AI 摘要不可用",
    "ai.available": "可用",
    "ai.manual": "未配置密钥",
    "ai.ready": "等待生成",
    "about.kicker": "Hantavirus 是什么",
    "about.title": "一组多由啮齿动物传播的病毒。",
    "about.body": "Hantavirus 可导致美洲常见的 HPS/HCPS，也可导致欧洲和亚洲常见的 HFRS。暴露通常与被感染啮齿动物的尿液、粪便或唾液污染环境有关。",
    "method.title": "数据方法",
    "method.item1": "官方/准官方来源优先。",
    "method.item2": "数字冲突时并排展示，不合并。",
    "method.item3": "最高权威来源用醒目状态强调。",
    "method.item4": "抓取失败时透明降级。",
    "health.kicker": "来源健康",
    "health.title": "每次刷新都留下审计线索。",
    "health.source": "来源",
    "health.agency": "机构",
    "health.status": "状态",
    "health.checked": "检查时间",
    "health.reason": "说明",
    "footer.note": "仅用于公共卫生信息监测，不构成医学建议。",
    "labels.highest": "最高权威",
    "labels.live": "实时",
    "labels.snapshot": "快照",
    "labels.degraded": "降级",
    "labels.open": "打开来源",
    "labels.evidence": "证据",
    "labels.sourcesOnline": "来源可用",
    "labels.noMetric": "暂无可断言数字",
    "labels.sourceReady": "来源可核验",
    "labels.generated": "生成于",
    "labels.checked": "检查",
    "labels.ok": "可访问",
    "labels.failed": "受限",
    "labels.noResults": "没有匹配的国家。",
    "labels.published": "发布日期",
    "labels.generatedAt": "摘要生成",
    "labels.autoRefresh": "每 5 分钟自动刷新",
    "labels.viewDetails": "查看详情",
    "labels.keyNumbers": "关键数字",
    "labels.statements": "摘要结论",
    "labels.citations": "引用",
    "api.title": "自定义 AI 供应商",
    "api.body": "支持 OpenAI 兼容接口、OpenAI、Anthropic、Gemini、DeepSeek、通义千问等。密钥只保存在本机浏览器。",
    "api.provider": "供应商",
    "api.model": "模型",
    "api.baseUrl": "Base URL",
    "api.key": "API Key",
    "api.save": "保存配置",
    "api.clear": "清除",
    "api.saved": "已保存 AI 供应商配置。",
    "api.cleared": "已清除 AI 供应商配置。",
    "api.notConfigured": "未配置供应商密钥",
    "disclaimer.title": "使用前请阅读完整免责声明。",
    "disclaimer.body": "本网站仅用于官方公共卫生信息监测与研究辅助，不提供医学诊断、治疗建议、旅行建议或风险预测。",
    "disclaimer.open": "打开免责声明",
  },
  en: {
    "nav.sources": "Sources",
    "nav.countries": "Countries",
    "nav.ai": "AI Summary",
    "nav.health": "Health",
    "nav.disclaimer": "Disclaimer",
    "actions.refresh": "Refresh",
    "actions.refreshAi": "Refresh summary",
    "actions.refreshing": "Refreshing",
    "actions.refreshingAi": "Summarizing",
    "hero.kicker": "Multi-agency official data",
    "hero.title": "Global Hantavirus official monitor.",
    "hero.lede": "Cross-check WHO, CDC, PAHO, ECDC, and national public-health sources. AI only summarizes traceable official evidence, never inventing case counts, trends, or risk.",
    "hero.policy": "Highest authority first, then newer evidence shown side by side.",
    "hero.sources": "official sources",
    "cards.latestEvent": "Latest international event",
    "cards.authority": "Highest authority evidence",
    "cards.countries": "Country pool",
    "cards.countriesHint": "global coverage",
    "cards.ai": "AI trust state",
    "sources.kicker": "Official source overview",
    "sources.title": "Not just WHO: a multi-agency verification surface.",
    "sources.body": "Every number keeps its source, date, and excerpt. If live access is blocked, the page shows the degraded state and official link.",
    "countries.kicker": "Country data matrix",
    "countries.title": "A global country pool sorted by evidence and source state.",
    "countries.search": "Search country or region",
    "regions.all": "All regions",
    "regional.kicker": "Regional statistics",
    "regional.title": "Different scopes stay side by side, not merged.",
    "timeline.kicker": "Event timeline",
    "timeline.title": "From the latest event to regional baselines.",
    "ai.kicker": "Strict AI summary",
    "ai.title": "AI only sees official evidence packets.",
    "ai.body": "Inputs are limited to source, URL, publication date, country, metric, value, and excerpt. Any uncited conclusion is discarded.",
    "ai.button": "Generate AI summary",
    "ai.generating": "Generating",
    "ai.empty": "Waiting to generate. Configure any supported AI provider on the left.",
    "ai.unavailable": "AI unavailable",
    "ai.available": "Available",
    "ai.manual": "No API key",
    "ai.ready": "Ready",
    "about.kicker": "What Hantavirus is",
    "about.title": "A group of viruses often carried by rodents.",
    "about.body": "Hantaviruses can cause HPS/HCPS, often discussed in the Americas, and HFRS, often discussed in Europe and Asia. Exposure is usually linked to environments contaminated by infected rodents' urine, feces, or saliva.",
    "method.title": "Data method",
    "method.item1": "Official and quasi-official sources first.",
    "method.item2": "Conflicting numbers are shown side by side.",
    "method.item3": "Highest-authority sources are visually emphasized.",
    "method.item4": "Blocked sources degrade transparently.",
    "health.kicker": "Source health",
    "health.title": "Every refresh leaves an audit trail.",
    "health.source": "Source",
    "health.agency": "Agency",
    "health.status": "Status",
    "health.checked": "Checked",
    "health.reason": "Note",
    "footer.note": "For public-health information monitoring only; not medical advice.",
    "labels.highest": "Highest authority",
    "labels.live": "Live",
    "labels.snapshot": "Snapshot",
    "labels.degraded": "Degraded",
    "labels.open": "Open source",
    "labels.evidence": "Evidence",
    "labels.sourcesOnline": "sources online",
    "labels.noMetric": "No asserted statistic",
    "labels.sourceReady": "Source ready",
    "labels.generated": "Generated",
    "labels.checked": "Checked",
    "labels.ok": "Reachable",
    "labels.failed": "Restricted",
    "labels.noResults": "No matching countries.",
    "labels.published": "Published",
    "labels.generatedAt": "Summary generated",
    "labels.autoRefresh": "Auto-refreshes every 5 minutes",
    "labels.viewDetails": "View details",
    "labels.keyNumbers": "Key numbers",
    "labels.statements": "Statements",
    "labels.citations": "Citations",
    "api.title": "Custom AI provider",
    "api.body": "Supports OpenAI-compatible APIs, OpenAI, Anthropic, Gemini, DeepSeek, Qwen, and more. The key is stored only in this browser.",
    "api.provider": "Provider",
    "api.model": "Model",
    "api.baseUrl": "Base URL",
    "api.key": "API Key",
    "api.save": "Save config",
    "api.clear": "Clear",
    "api.saved": "AI provider config saved.",
    "api.cleared": "AI provider config cleared.",
    "api.notConfigured": "Provider key not configured",
    "disclaimer.title": "Read the full disclaimer before use.",
    "disclaimer.body": "This site is only for official public-health information monitoring and research assistance. It does not provide diagnosis, treatment advice, travel advice, or risk prediction.",
    "disclaimer.open": "Open disclaimer",
  },
};

const state = {
  language: localStorage.getItem("hanta-language") || "zh",
  feed: null,
  aiSummary: null,
  regionFilter: "all",
  query: "",
  aiTimer: null,
  lastAiRefreshAt: null,
  apiConfig: null,
  lastDetailTriggerRect: null,
  modalClosing: false,
};

const elements = {
  languageToggle: document.querySelector("#language-toggle"),
  languageLabel: document.querySelector("#language-label"),
  refreshButton: document.querySelector("#refresh-button"),
  refreshAiButton: document.querySelector("#refresh-ai-button"),
  pageProgressBar: document.querySelector("#page-progress-bar"),
  generatedAt: document.querySelector("#generated-at"),
  sourceCount: document.querySelector("#source-count"),
  latestEventTitle: document.querySelector("#latest-event-title"),
  latestEventDate: document.querySelector("#latest-event-date"),
  authorityMetric: document.querySelector("#authority-metric"),
  authoritySource: document.querySelector("#authority-source"),
  countryCount: document.querySelector("#country-count"),
  aiStatus: document.querySelector("#ai-status"),
  aiStatusDetail: document.querySelector("#ai-status-detail"),
  sourceGrid: document.querySelector("#source-grid"),
  countrySearch: document.querySelector("#country-search"),
  regionFilter: document.querySelector("#region-filter"),
  countryMatrix: document.querySelector("#country-matrix"),
  regionalGrid: document.querySelector("#regional-grid"),
  timeline: document.querySelector("#timeline"),
  generateAi: document.querySelector("#generate-ai"),
  aiResult: document.querySelector("#ai-result"),
  healthTable: document.querySelector("#health-table"),
  detailModal: document.querySelector("#detail-modal"),
  detailBackdrop: document.querySelector("#detail-backdrop"),
  detailClose: document.querySelector("#detail-close"),
  detailKicker: document.querySelector("#detail-kicker"),
  detailTitle: document.querySelector("#detail-title"),
  detailBody: document.querySelector("#detail-body"),
  apiProvider: document.querySelector("#api-provider"),
  apiModel: document.querySelector("#api-model"),
  apiBaseUrl: document.querySelector("#api-base-url"),
  apiKey: document.querySelector("#api-key"),
  saveApiConfig: document.querySelector("#save-api-config"),
  clearApiConfig: document.querySelector("#clear-api-config"),
  apiConfigStatus: document.querySelector("#api-config-status"),
};

function t(key) {
  return translations[state.language][key] || translations.zh[key] || key;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function providerDefaults(provider) {
  const defaults = {
    openai: { baseUrl: "https://api.openai.com/v1", model: "gpt-5.4-mini" },
    "openai-compatible": { baseUrl: "https://api.openai.com/v1", model: "gpt-5.4-mini" },
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
  return defaults[provider] || defaults["openai-compatible"];
}

function providerLabel(provider) {
  const option = [...elements.apiProvider.options].find((item) => item.value === provider);
  return option?.textContent || provider || "AI";
}

function loadApiConfig() {
  try {
    const parsed = JSON.parse(localStorage.getItem("hanta-ai-config") || "{}");
    state.apiConfig = parsed.provider ? parsed : null;
  } catch {
    state.apiConfig = null;
  }
}

function saveApiConfig() {
  const provider = elements.apiProvider.value;
  const defaults = providerDefaults(provider);
  const config = {
    provider,
    model: elements.apiModel.value.trim() || defaults.model,
    baseUrl: elements.apiBaseUrl.value.trim() || defaults.baseUrl,
    apiKey: elements.apiKey.value.trim(),
  };
  localStorage.setItem("hanta-ai-config", JSON.stringify(config));
  state.apiConfig = config;
  elements.apiConfigStatus.textContent = t("api.saved");
  renderAiSummary();
}

function clearApiConfig() {
  localStorage.removeItem("hanta-ai-config");
  state.apiConfig = null;
  fillApiConfigForm();
  elements.apiConfigStatus.textContent = t("api.cleared");
  renderAiSummary();
}

function fillApiConfigForm() {
  const config = state.apiConfig || {};
  const provider = config.provider || "openai-compatible";
  const defaults = providerDefaults(provider);
  elements.apiProvider.value = provider;
  elements.apiModel.value = config.model || defaults.model;
  elements.apiBaseUrl.value = config.baseUrl || defaults.baseUrl;
  elements.apiKey.value = config.apiKey || "";
  elements.apiConfigStatus.textContent = config.apiKey ? t("api.saved") : t("api.notConfigured");
}

function updateProviderDefaults() {
  const provider = elements.apiProvider.value;
  const defaults = providerDefaults(provider);
  elements.apiModel.value = defaults.model;
  elements.apiBaseUrl.value = defaults.baseUrl;
  elements.apiKey.value = "";
  elements.apiConfigStatus.textContent = `${providerLabel(provider)} · ${t("api.notConfigured")}`;
}

function currentAiConfigForRequest() {
  const formProvider = elements.apiProvider.value || state.apiConfig?.provider || "openai-compatible";
  const defaults = providerDefaults(formProvider);
  const formConfig = {
    provider: formProvider,
    model: elements.apiModel.value.trim() || state.apiConfig?.model || defaults.model,
    baseUrl: elements.apiBaseUrl.value.trim() || state.apiConfig?.baseUrl || defaults.baseUrl,
    apiKey: elements.apiKey.value.trim() || state.apiConfig?.apiKey || "",
  };
  return formConfig.apiKey ? formConfig : state.apiConfig || formConfig;
}

function sortMetrics(a, b) {
  const authorityDelta = (a.authority || 9) - (b.authority || 9);
  if (authorityDelta !== 0) return authorityDelta;
  return new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0);
}

function createSourceMap(sources) {
  return new Map(sources.map((source) => [source.id, source]));
}

function createOfflineHealth(sources) {
  return sources.map((source) => ({
    id: source.id,
    agency: source.agency,
    name: source.name,
    url: source.url,
    region: source.region,
    country: source.country,
    authority: source.authority,
    ok: false,
    mode: "snapshot",
    checkedAt: OFFLINE_FEED.generatedAt,
    error: state.language === "zh" ? "直接打开本地文件，实时接口未连接" : "Opened as a local file; live API is not connected",
  }));
}

function createOfflineCountries(sources, metrics, health) {
  const sourceMap = createSourceMap(sources);
  const healthMap = new Map(health.map((item) => [item.id, item]));
  const countrySeeds = [
    ["United States", "North America", ["cdc-situation", "cdc-reported-cases"], { zh: "CDC 当前态势和病例页可作为美国数据核验入口。", en: "CDC situation and reported-cases pages are the United States verification entry points." }],
    ["Argentina", "South America", ["argentina-health", "who-don", "paho-alert-2025"], { zh: "纳入 Andes virus 和 WHO 邮轮事件协调背景。", en: "Included for Andes virus and WHO cruise-ship event coordination context." }],
    ["Chile", "South America", ["chile-health", "who-don", "paho-alert-2025"], { zh: "纳入南锥体和 Andes virus 监测背景。", en: "Included for Southern Cone and Andes virus surveillance context." }],
    ["Brazil", "South America", ["brazil-health", "paho-alert-2025"], { zh: "通过国家卫生部和 PAHO 区域警报核验。", en: "Verified through the national health ministry and PAHO regional alert." }],
    ["Panama", "Central America", ["paho-alert-2025"], { zh: "通过 PAHO HPS 区域警报纳入。", en: "Included through PAHO HPS regional alert coverage." }],
    ["Paraguay", "South America", ["paho-alert-2025"], { zh: "通过 PAHO 区域警报纳入。", en: "Included through PAHO regional alert coverage." }],
    ["Bolivia", "South America", ["paho-alert-2025"], { zh: "通过 PAHO 区域警报纳入。", en: "Included through PAHO regional alert coverage." }],
    ["Uruguay", "South America", ["paho-alert-2025"], { zh: "通过 PAHO 区域警报纳入。", en: "Included through PAHO regional alert coverage." }],
    ["China", "East Asia", ["china-cdc"], { zh: "纳入东亚 HFRS 监测来源。", en: "Included for East Asia HFRS surveillance source coverage." }],
    ["South Korea", "East Asia", ["korea-kdca"], { zh: "纳入 HFRS 和国家疾控来源核验。", en: "Included for HFRS and national disease-control source verification." }],
    ["Germany", "Europe", ["germany-rki", "ecdc-aer-2023"], { zh: "通过 RKI 和 ECDC 年度监测背景纳入。", en: "Included through RKI and ECDC annual surveillance context." }],
    ["Finland", "Europe", ["ecdc-aer-2023"], { zh: "通过 ECDC 年度监测背景纳入。", en: "Included through ECDC annual surveillance context." }],
    ["South Africa", "Southern Africa", ["south-africa-nicd", "who-don"], { zh: "通过 NICD 和 WHO 实验室确认背景纳入。", en: "Included through NICD and WHO laboratory-confirmation context." }],
  ];

  return countrySeeds.map(([country, region, sourceIds, headline]) => {
    const topSource = sourceIds.map((id) => sourceMap.get(id)).filter(Boolean).sort((a, b) => (a.authority || 9) - (b.authority || 9))[0] || null;
    const countryMetrics = metrics
      .filter((metric) => {
        if (metric.country === country) return true;
        if (sourceIds.includes(metric.sourceId)) return true;
        if (metric.country === "Americas" && (region.includes("America") || region === "Central America")) return true;
        if (metric.country === "EU/EEA" && region === "Europe") return true;
        return false;
      })
      .sort(sortMetrics)
      .slice(0, 5);
    const sourceHealth = sourceIds.map((id) => healthMap.get(id)).filter(Boolean);

    return {
      country,
      region,
      authority: topSource?.authority || 2,
      headline,
      topSource,
      sourceCount: sourceIds.length,
      onlineCount: 0,
      sourceHealth,
      metrics: countryMetrics,
      bestMetric: countryMetrics[0] || null,
      status: countryMetrics.length ? "has-evidence" : "snapshot",
    };
  });
}

function createOfflineRegionalStats(metrics) {
  const groups = new Map();
  metrics.forEach((metric) => {
    if (!groups.has(metric.region)) {
      groups.set(metric.region, {
        region: metric.region,
        metrics: [],
        agencies: new Set(),
        latest: metric.publishedAt,
      });
    }
    const group = groups.get(metric.region);
    group.metrics.push(metric);
    group.agencies.add(metric.agency);
    if (new Date(metric.publishedAt || 0) > new Date(group.latest || 0)) {
      group.latest = metric.publishedAt;
    }
  });

  return [...groups.values()].map((group) => ({
    region: group.region,
    metrics: group.metrics.sort(sortMetrics).slice(0, 4),
    agencyCount: group.agencies.size,
    latest: group.latest,
  }));
}

function createOfflineFeed(reason = "") {
  const feed = clone(OFFLINE_FEED);
  feed.health = createOfflineHealth(feed.sources);
  feed.countries = createOfflineCountries(feed.sources, feed.metrics, feed.health);
  feed.regionalStats = createOfflineRegionalStats(feed.metrics);
  feed.evidence = feed.metrics.map((metric) => ({
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
  }));
  feed.stats = {
    sourceCount: feed.sources.length,
    checkedSources: feed.health.length,
    onlineSources: 0,
    evidenceCount: feed.metrics.length,
    countryCount: feed.countries.length,
    highestAuthorityMetrics: feed.metrics.filter((metric) => metric.authority === 1).length,
    degradedSources: feed.health.length,
  };
  feed.degradation = feed.health.map((item) => ({
    id: item.id,
    name: item.name,
    agency: item.agency,
    url: item.url,
    error: reason || item.error,
  }));
  return feed;
}

function localized(value) {
  if (!value || typeof value === "string") return value || "";
  return value[state.language] || value.en || value.zh || "";
}

function localizedText(value) {
  if (!value || typeof value === "string") return value || "";
  return value[state.language] || value.en || value.zh || value.text || "";
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDate(value) {
  if (!value) return "--";
  const raw = String(value);
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(raw) ? `${raw}T12:00:00` : raw);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(state.language === "zh" ? "zh-CN" : "en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatSourceTime(value) {
  if (!value) return "--";
  const raw = String(value);
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(raw) ? `${raw}T12:00:00` : raw);
  if (Number.isNaN(date.getTime())) return value;
  const hasTime = /T\d{2}:\d{2}/.test(raw);
  return new Intl.DateTimeFormat(state.language === "zh" ? "zh-CN" : "en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...(hasTime
      ? {
          hour: "2-digit",
          minute: "2-digit",
        }
      : {}),
  }).format(date);
}

function formatTimestamp(value) {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(state.language === "zh" ? "zh-CN" : "en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatValue(metric) {
  if (!metric) return "--";
  const value = metric.value;
  const numeric = Number(String(value).replace(/,/g, ""));
  const shownValue = Number.isFinite(numeric) && String(value).trim() !== "" ? new Intl.NumberFormat(state.language === "zh" ? "zh-CN" : "en").format(numeric) : value;
  return `${shownValue}${metric.unit ? ` ${metric.unit}` : ""}`;
}

function detailBlock(title, body) {
  if (!body) return "";
  return `
    <section class="detail-block">
      <h3>${escapeHtml(title)}</h3>
      <p>${body}</p>
    </section>
  `;
}

function detailMetric(metric) {
  if (!metric) return "";
  return detailBlock(
    metric.metric || t("labels.evidence"),
    `${escapeHtml(formatValue(metric))}<br>${escapeHtml(metric.source || "")}<br>${escapeHtml(t("labels.published"))}: ${escapeHtml(formatSourceTime(metric.publishedAt))}<br><a href="${escapeHtml(metric.url)}" target="_blank" rel="noreferrer">${t("labels.open")}</a><br>${escapeHtml(metric.excerpt || "")}`,
  );
}

function modalTargetRect() {
  const width = Math.min(900, Math.max(320, window.innerWidth - 44));
  const height = Math.min(Math.max(520, window.innerHeight * 0.82), window.innerHeight - 44, 820);
  return {
    left: window.innerWidth / 2,
    top: window.innerHeight / 2,
    width,
    height,
  };
}

function rectFromTrigger(triggerElement) {
  if (!triggerElement || typeof triggerElement.getBoundingClientRect !== "function") {
    return null;
  }
  const rect = triggerElement.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  return {
    left: rect.left + rect.width / 2,
    top: rect.top + rect.height / 2,
    width: Math.max(120, rect.width),
    height: Math.max(120, rect.height),
  };
}

function setModalRect(rect, panelOpacity = 1) {
  elements.detailModal.style.setProperty("--modal-left", `${Math.round(rect.left)}px`);
  elements.detailModal.style.setProperty("--modal-top", `${Math.round(rect.top)}px`);
  elements.detailModal.style.setProperty("--modal-width", `${Math.round(rect.width)}px`);
  elements.detailModal.style.setProperty("--modal-height", `${Math.round(rect.height)}px`);
  elements.detailModal.style.setProperty("--modal-panel-opacity", panelOpacity);
}

function openDetail({ kicker, title, body }, triggerElement = null) {
  state.modalClosing = false;
  state.lastDetailTriggerRect = rectFromTrigger(triggerElement) || state.lastDetailTriggerRect || modalTargetRect();
  const sourceRect = state.lastDetailTriggerRect;
  const targetRect = modalTargetRect();

  elements.detailKicker.textContent = kicker || t("labels.viewDetails");
  elements.detailTitle.textContent = title || "";
  elements.detailBody.innerHTML = body || "";
  elements.detailModal.classList.remove("open", "opening", "closing", "settled");
  elements.detailModal.style.setProperty("--modal-radius", "22px");
  elements.detailModal.style.setProperty("--modal-content-opacity", "0");
  elements.detailModal.style.setProperty("--modal-scale", "0.985");
  setModalRect(sourceRect, 0.18);
  elements.detailModal.classList.add("open", "opening");
  elements.detailModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  window.requestAnimationFrame(() => {
    elements.detailModal.style.setProperty("--modal-radius", "32px");
    elements.detailModal.style.setProperty("--modal-scale", "1");
    elements.detailModal.style.setProperty("--modal-content-opacity", "1");
    setModalRect(targetRect, 1);
    window.setTimeout(() => {
      elements.detailModal.classList.remove("opening");
      elements.detailModal.classList.add("settled");
      elements.detailClose.focus();
    }, 620);
  });
}

function closeDetail() {
  if (!elements.detailModal.classList.contains("open") || state.modalClosing) return;
  state.modalClosing = true;
  elements.detailModal.style.setProperty("--modal-content-opacity", "0");
  elements.detailModal.style.setProperty("--modal-panel-opacity", "0");
  elements.detailModal.style.setProperty("--modal-scale", "0.992");
  elements.detailModal.classList.add("closing");
  window.setTimeout(() => {
    elements.detailModal.classList.remove("open", "opening", "closing", "settled");
    elements.detailModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    elements.detailModal.style.removeProperty("--modal-panel-opacity");
    elements.detailModal.style.removeProperty("--modal-content-opacity");
    elements.detailModal.style.removeProperty("--modal-scale");
    state.modalClosing = false;
  }, 260);
}

function getSource(id) {
  return state.feed?.sources.find((source) => source.id === id) || null;
}

function getCountry(countryName) {
  return state.feed?.countries.find((country) => country.country === countryName) || null;
}

function getRegion(regionName) {
  return state.feed?.regionalStats.find((region) => region.region === regionName) || null;
}

function getEvent(id) {
  return state.feed?.events.find((event) => event.id === id) || null;
}

function openSourceDetail(id, triggerElement) {
  const source = getSource(id);
  if (!source) return;
  const status = state.feed.health.find((item) => item.id === id);
  const metrics = state.feed.metrics.filter((metric) => metric.sourceId === id || metric.source === source.name);
  openDetail({
    kicker: source.agency,
    title: source.name,
    body: [
      detailBlock(t("labels.evidence"), `${escapeHtml(source.region)} · ${escapeHtml(source.country)}<br>${statusBadge(status)}<br>${escapeHtml(status?.error || `HTTP ${status?.status || 200}`)}<br><a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${t("labels.open")}</a>`),
      ...metrics.map(detailMetric),
    ].join(""),
  }, triggerElement);
}

function openCountryDetail(name, triggerElement) {
  const country = getCountry(name);
  if (!country) return;
  openDetail({
    kicker: country.region,
    title: country.country,
    body: [
      detailBlock(t("labels.evidence"), `${escapeHtml(localized(country.headline))}<br>${country.onlineCount}/${country.sourceCount} ${t("labels.sourcesOnline")}`),
      ...country.metrics.map(detailMetric),
      ...country.sourceHealth.map((status) =>
        detailBlock(status.name, `${statusBadge(status)}<br>${escapeHtml(status.error || `HTTP ${status.status || 200}`)}<br><a href="${escapeHtml(status.url)}" target="_blank" rel="noreferrer">${t("labels.open")}</a>`),
      ),
    ].join(""),
  }, triggerElement);
}

function openRegionDetail(name, triggerElement) {
  const region = getRegion(name);
  if (!region) return;
  openDetail({
    kicker: t("regional.kicker"),
    title: region.region,
    body: [
      detailBlock(t("labels.published"), `${escapeHtml(formatSourceTime(region.latest))}<br>${region.agencyCount} ${state.language === "zh" ? "个机构" : "agencies"}`),
      ...region.metrics.map(detailMetric),
    ].join(""),
  }, triggerElement);
}

function openEventDetail(id, triggerElement) {
  const event = getEvent(id);
  if (!event) return;
  const metrics = state.feed.metrics.filter((metric) => metric.url === event.url || metric.source === event.source);
  openDetail({
    kicker: event.agency,
    title: event.title,
    body: [
      detailBlock(t("labels.published"), `${escapeHtml(formatSourceTime(event.publishedAt))}<br>${escapeHtml(event.region)} · ${escapeHtml(event.country)}<br><a href="${escapeHtml(event.url)}" target="_blank" rel="noreferrer">${t("labels.open")}</a>`),
      detailBlock("Summary", escapeHtml(event.summary || event.excerpt || "")),
      ...metrics.map(detailMetric),
    ].join(""),
  }, triggerElement);
}

function openAiDetail(triggerElement) {
  if (!state.aiSummary) {
    generateAiSummary({ silent: false });
    return;
  }
  const summary = state.aiSummary;
  const statements = summary.statements || [];
  const keyNumbers = summary.keyNumbers || [];
  const citations = summary.citations || [];
  openDetail({
    kicker: t("ai.kicker"),
    title: summary.available ? t("ai.available") : t("ai.unavailable"),
    body: [
      detailBlock(t("labels.generatedAt"), `${escapeHtml(formatTimestamp(summary.generatedAt || state.lastAiRefreshAt))}<br>${escapeHtml(t("labels.autoRefresh"))}`),
      detailBlock("Summary", escapeHtml(localized(summary.summary) || summary.reason || "")),
      detailBlock(
        t("labels.statements"),
        statements.length
          ? statements
              .map((statement) => `${escapeHtml(localizedText(statement))}<br>${(statement.citations || []).map((url) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(url)}</a>`).join("<br>")}`)
              .join("<br><br>")
          : "--",
      ),
      detailBlock(
        t("labels.keyNumbers"),
        keyNumbers.length
          ? keyNumbers
              .map((item) => `${escapeHtml(item.metric || "")}: <strong>${escapeHtml(`${item.value || ""}${item.unit ? ` ${item.unit}` : ""}`)}</strong><br>${escapeHtml(item.source || "")} · ${escapeHtml(formatSourceTime(item.publishedAt))}<br><a href="${escapeHtml(item.url || "")}" target="_blank" rel="noreferrer">${t("labels.open")}</a>`)
              .join("<br><br>")
          : "--",
      ),
      detailBlock(
        t("labels.citations"),
        citations.length ? citations.map((citation) => `<a href="${escapeHtml(citation.url)}" target="_blank" rel="noreferrer">${escapeHtml(citation.source || citation.url)}</a> · ${escapeHtml(formatSourceTime(citation.publishedAt))}`).join("<br>") : "--",
      ),
    ].join(""),
  }, triggerElement);
}

function openMetricDetail(metricId, triggerElement) {
  const metric = state.feed?.metrics.find((item) => item.id === metricId) || state.feed?.metrics.slice().sort(sortMetrics)[0];
  if (!metric) return;
  openDetail({
    kicker: metric.agency,
    title: metric.metric,
    body: detailMetric(metric),
  }, triggerElement);
}

function openCountriesOverview(triggerElement) {
  const countries = state.feed?.countries || [];
  openDetail({
    kicker: t("countries.kicker"),
    title: `${countries.length} ${state.language === "zh" ? "个国家/地区条目" : "country/region entries"}`,
    body: countries
      .slice(0, 24)
      .map((country) =>
        detailBlock(
          `${country.country} · ${country.region}`,
          `${escapeHtml(localized(country.headline))}<br>${escapeHtml(country.bestMetric ? formatValue(country.bestMetric) : t("labels.noMetric"))}`,
        ),
      )
      .join(""),
  }, triggerElement);
}

function handleCardAction(kind, id, triggerElement) {
  if (!state.feed) return;
  if (kind === "source") openSourceDetail(id, triggerElement);
  if (kind === "country") openCountryDetail(id, triggerElement);
  if (kind === "region") openRegionDetail(id, triggerElement);
  if (kind === "event") openEventDetail(id, triggerElement);
  if (kind === "ai") openAiDetail(triggerElement);
  if (kind === "metric") openMetricDetail(id, triggerElement);
  if (kind === "countries") openCountriesOverview(triggerElement);
}

function applyTranslations() {
  document.documentElement.lang = state.language;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });
  elements.languageLabel.textContent = state.language === "zh" ? "EN" : "中";
  fillApiConfigForm();
}

function setupSignalCards() {
  const cards = document.querySelectorAll(".signal-card");
  const configs = [
    ["event", state.feed?.events[0]?.id || ""],
    ["metric", state.feed?.metrics.slice().sort(sortMetrics)[0]?.id || ""],
    ["countries", "all"],
    ["ai", "summary"],
  ];
  cards.forEach((card, index) => {
    card.classList.add("clickable-card");
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", t("labels.viewDetails"));
    card.dataset.openKind = configs[index][0];
    card.dataset.openId = configs[index][1];
  });
}

function statusBadge(status) {
  if (!status) {
    return `<span class="status-badge degraded">${t("labels.degraded")}</span>`;
  }
  const label = status.ok ? t("labels.ok") : t("labels.failed");
  const mode = status.ok ? "live" : "degraded";
  return `<span class="status-badge ${mode}">${label}</span>`;
}

function sourceCard(source, health) {
  const primary = source.authority === 1;
  const status = health?.find((item) => item.id === source.id);
  const mode = status?.ok ? t("labels.live") : t("labels.degraded");
  return `
    <article class="source-card clickable-card ${primary ? "primary-source" : ""}" data-open-kind="source" data-open-id="${escapeHtml(source.id)}" tabindex="0" role="button" aria-label="${escapeHtml(t("labels.viewDetails"))}">
      <span class="label">${escapeHtml(source.agency)}</span>
      <h3>${escapeHtml(source.name)}</h3>
      <p>${escapeHtml(source.region)} · ${escapeHtml(source.country)}</p>
      <div class="source-meta">
        ${primary ? `<span class="badge authority">${t("labels.highest")}</span>` : ""}
        ${statusBadge(status)}
        <span class="badge">${escapeHtml(source.type.toUpperCase())}</span>
        <span class="badge">${escapeHtml(mode)}</span>
      </div>
      <div class="card-footer">
        <a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${t("labels.open")}</a>
      </div>
    </article>
  `;
}

function renderHero() {
  const feed = state.feed;
  const latest = feed.events[0];
  const topMetric = feed.metrics.slice().sort(sortMetrics)[0];

  elements.generatedAt.textContent = `${t("labels.generated")} ${formatTimestamp(feed.generatedAt)}`;
  elements.sourceCount.textContent = feed.stats.sourceCount;
  elements.latestEventTitle.textContent = latest?.title || "--";
  elements.latestEventDate.textContent = latest ? `${latest.agency} · ${formatSourceTime(latest.publishedAt)}` : "--";
  elements.authorityMetric.textContent = topMetric ? formatValue(topMetric) : "--";
  elements.authoritySource.textContent = topMetric ? `${topMetric.source} · ${formatSourceTime(topMetric.publishedAt)}` : "--";
  elements.countryCount.textContent = feed.stats.countryCount;
  elements.aiStatus.textContent = state.aiSummary?.available ? t("ai.available") : t("ai.ready");
  elements.aiStatusDetail.textContent = state.lastAiRefreshAt
    ? `${providerLabel(state.aiSummary?.provider || state.apiConfig?.provider || elements.apiProvider.value)} · ${formatTimestamp(state.lastAiRefreshAt)}`
    : `${providerLabel(state.apiConfig?.provider || elements.apiProvider.value)} · ${feed.stats.evidenceCount} ${t("labels.evidence")}`;
  setupSignalCards();
}

function renderSources() {
  const priority = new Set(["WHO", "CDC", "PAHO", "ECDC"]);
  const spotlight = [
    ...state.feed.sources.filter((source) => priority.has(source.agency)),
    ...state.feed.sources.filter((source) => !priority.has(source.agency)).slice(0, 8),
  ].slice(0, 12);
  elements.sourceGrid.innerHTML = spotlight.map((source) => sourceCard(source, state.feed.health)).join("");
}

function populateRegions() {
  const regions = [...new Set(state.feed.countries.map((country) => country.region))].sort();
  const current = elements.regionFilter.value || "all";
  elements.regionFilter.innerHTML = `<option value="all">${t("regions.all")}</option>${regions
    .map((region) => `<option value="${escapeHtml(region)}">${escapeHtml(region)}</option>`)
    .join("")}`;
  elements.regionFilter.value = regions.includes(current) ? current : "all";
}

function countryCard(country) {
  const metric = country.bestMetric;
  const hasMetric = Boolean(metric);
  const source = country.topSource;
  const status = hasMetric ? t("labels.evidence") : country.onlineCount ? t("labels.sourceReady") : t("labels.degraded");
  const badgeClass = hasMetric ? "live" : country.onlineCount ? "degraded" : "error";
  const sourceUrl = metric?.url || source?.url || "#";
  return `
    <article class="country-card clickable-card" data-open-kind="country" data-open-id="${escapeHtml(country.country)}" tabindex="0" role="button" aria-label="${escapeHtml(t("labels.viewDetails"))}">
      <div class="country-top">
        <div>
          <span class="country-region">${escapeHtml(country.region)}</span>
          <h3>${escapeHtml(country.country)}</h3>
        </div>
        <span class="status-badge ${badgeClass}">${escapeHtml(status)}</span>
      </div>
      <p>${escapeHtml(localized(country.headline))}</p>
      <div class="evidence-box">
        <strong>${hasMetric ? escapeHtml(formatValue(metric)) : t("labels.noMetric")}</strong>
        <small>${hasMetric ? escapeHtml(metric.metric) : `${country.onlineCount}/${country.sourceCount} ${t("labels.sourcesOnline")}`}</small>
        ${hasMetric ? `<small>${escapeHtml(metric.source)} · ${escapeHtml(formatDate(metric.publishedAt))}</small>` : ""}
      </div>
      <div class="card-footer">
        <a href="${escapeHtml(sourceUrl)}" target="_blank" rel="noreferrer">${t("labels.open")}</a>
        ${country.authority === 1 ? `<span class="badge authority">${t("labels.highest")}</span>` : ""}
      </div>
    </article>
  `;
}

function renderCountries() {
  const query = state.query.trim().toLowerCase();
  const filtered = state.feed.countries.filter((country) => {
    const matchesRegion = state.regionFilter === "all" || country.region === state.regionFilter;
    const text = `${country.country} ${country.region}`.toLowerCase();
    const matchesQuery = !query || text.includes(query);
    return matchesRegion && matchesQuery;
  });

  elements.countryMatrix.innerHTML = filtered.length ? filtered.map(countryCard).join("") : `<div class="empty">${t("labels.noResults")}</div>`;
}

function renderRegionalStats() {
  elements.regionalGrid.innerHTML = state.feed.regionalStats
    .map(
      (region) => `
        <article class="regional-card clickable-card" data-open-kind="region" data-open-id="${escapeHtml(region.region)}" tabindex="0" role="button" aria-label="${escapeHtml(t("labels.viewDetails"))}">
          <span class="label">${escapeHtml(region.region)}</span>
          <h3>${region.agencyCount} ${state.language === "zh" ? "个机构" : "agencies"}</h3>
          <p>${state.language === "zh" ? "最新证据" : "Latest evidence"} · ${escapeHtml(formatSourceTime(region.latest))}</p>
          <div class="metric-list">
            ${region.metrics
              .map(
                (metric) => `
                  <div class="metric-row">
                    <span>${escapeHtml(metric.metric)}</span>
                    <strong>${escapeHtml(formatValue(metric))}</strong>
                  </div>
                `,
              )
              .join("")}
          </div>
        </article>
      `,
    )
    .join("");
}

function renderTimeline() {
  elements.timeline.innerHTML = state.feed.events
    .slice(0, 8)
    .map(
      (event) => `
        <article class="timeline-item clickable-card" data-open-kind="event" data-open-id="${escapeHtml(event.id)}" tabindex="0" role="button" aria-label="${escapeHtml(t("labels.viewDetails"))}">
          <div class="timeline-date">${escapeHtml(formatSourceTime(event.publishedAt))}<br>${escapeHtml(event.agency)}</div>
          <div>
            <h3>${escapeHtml(event.title)}</h3>
            <p>${escapeHtml(event.summary || event.excerpt || "")}</p>
          </div>
          <a href="${escapeHtml(event.url)}" target="_blank" rel="noreferrer">${t("labels.open")}</a>
        </article>
      `,
    )
    .join("");
}

function renderHealth() {
  elements.healthTable.innerHTML = state.feed.health
    .map(
      (status) => `
        <tr>
          <td><a href="${escapeHtml(status.url)}" target="_blank" rel="noreferrer">${escapeHtml(status.name)}</a></td>
          <td>${escapeHtml(status.agency)}</td>
          <td>${statusBadge(status)}</td>
          <td>${escapeHtml(formatTimestamp(status.checkedAt))}</td>
          <td>${escapeHtml(status.ok ? `HTTP ${status.status || 200}` : status.error || "blocked")}</td>
        </tr>
      `,
    )
    .join("");
}

function renderAiSummary() {
  const summary = state.aiSummary;
  if (!summary) {
    elements.aiResult.innerHTML = `<div class="empty">${t("ai.empty")}</div>`;
    elements.aiStatus.textContent = t("ai.ready");
    elements.aiStatusDetail.textContent = state.feed ? `${providerLabel(state.apiConfig?.provider || elements.apiProvider.value)} · ${state.feed.stats.evidenceCount} ${t("labels.evidence")}` : "--";
    return;
  }

  elements.aiStatus.textContent = summary.available ? t("ai.available") : t("ai.unavailable");
  elements.aiStatusDetail.textContent = summary.mode === "manual" || summary.mode === "local"
    ? `${providerLabel(summary.provider || state.apiConfig?.provider || elements.apiProvider.value)} · ${t("ai.manual")}`
    : `${providerLabel(summary.provider || state.apiConfig?.provider || elements.apiProvider.value)} · ${formatTimestamp(summary.generatedAt)}`;
  const intro = localized(summary.summary) || summary.reason || "";
  const statements = summary.statements || [];
  const keyNumbers = summary.keyNumbers || [];
  const citations = summary.citations || [];

  elements.aiResult.innerHTML = `
    <h3>${summary.available ? t("ai.available") : t("ai.unavailable")}</h3>
    <p>${escapeHtml(intro)}</p>
    <p><strong>${escapeHtml(t("labels.autoRefresh"))}</strong>${state.lastAiRefreshAt ? ` · ${escapeHtml(formatTimestamp(state.lastAiRefreshAt))}` : ""}</p>
    <div class="ai-statements">
      ${statements
        .map(
          (statement, index) => `
            <div class="ai-statement">
              ${escapeHtml(localizedText(statement))}
              <div class="card-footer">
                ${(statement.citations || [])
                  .map((url, citationIndex) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(`${t("labels.open")} ${index + 1}-${citationIndex + 1}`)}</a>`)
                  .join("")}
              </div>
            </div>
          `,
        )
        .join("")}
      ${keyNumbers
        .map(
          (item) => `
            <div class="metric-row">
              <span>${escapeHtml(item.metric || "")}<br>${escapeHtml(item.source || "")} · ${escapeHtml(formatSourceTime(item.publishedAt))}</span>
              <strong>${escapeHtml(`${item.value || ""}${item.unit ? ` ${item.unit}` : ""}`)}</strong>
            </div>
          `,
        )
        .join("")}
    </div>
    <div class="card-footer citation-list">
      ${citations
        .map((citation, index) => `<a href="${escapeHtml(citation.url)}" target="_blank" rel="noreferrer">${escapeHtml(`${index + 1}. ${citation.source || citation.url} · ${formatSourceTime(citation.publishedAt)}`)}</a>`)
        .join("")}
    </div>
  `;
  setupSignalCards();
}

function renderAll() {
  applyTranslations();
  if (!state.feed) return;
  renderHero();
  renderSources();
  populateRegions();
  renderCountries();
  renderRegionalStats();
  renderTimeline();
  renderHealth();
  renderAiSummary();
}

function buildLocalSummary(reason = "") {
  const evidence = state.feed?.evidence || [];
  const keyNumbers = evidence.slice(0, 8).map((item) => ({
    metric: item.metric,
    value: item.value,
    unit: item.unit,
    country: item.country,
    source: item.source,
    publishedAt: item.publishedAt,
    url: item.url,
  }));
  const citations = evidence.slice(0, 8).map((item) => ({
    source: item.source,
    url: item.url,
    publishedAt: item.publishedAt,
  }));

  return {
    mode: "local",
    available: false,
    generatedAt: new Date().toISOString(),
    summary: {
      zh: reason || "当前使用本地证据摘要：AI 接口不可用或页面处于本地文件模式，但所有数字仍来自内置官方来源快照。",
      en: reason || "Using a local evidence summary: the AI endpoint is unavailable or the page is in local-file mode, while all numbers still come from built-in official-source snapshots.",
    },
    statements: evidence.slice(0, 5).map((item) => ({
      zh: `${item.source}：${item.metric} 为 ${item.value}${item.unit ? ` ${item.unit}` : ""}。`,
      en: `${item.source}: ${item.metric} is ${item.value}${item.unit ? ` ${item.unit}` : ""}.`,
      citations: [item.url],
    })),
    keyNumbers,
    affectedCountries: [...new Set(evidence.map((item) => item.country).filter(Boolean))].slice(0, 16),
    riskAssessment: {
      zh: "本地摘要不新增风险判断，只展示官方证据中已有的风险表述。",
      en: "The local summary adds no new risk assessment; it only displays risk language already present in official evidence.",
    },
    citations,
  };
}

async function loadFeed(force = false) {
  document.body.classList.add("loading");
  elements.refreshButton.disabled = true;
  elements.refreshButton.querySelector("span").textContent = t("actions.refreshing");

  try {
    if (window.location.protocol === "file:") {
      state.feed = createOfflineFeed("file:// snapshot mode");
      renderAll();
      return;
    }

    const response = await fetch(`${ENDPOINTS.feed}${force ? "?force=1" : ""}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.feed = await response.json();
    renderAll();
  } catch (error) {
    state.feed = createOfflineFeed(error.message);
    renderAll();
    elements.aiResult.innerHTML = `<div class="empty">${escapeHtml(error.message)}<br>${escapeHtml(state.language === "zh" ? "已显示内置官方快照。" : "Showing built-in official snapshot.")}</div>`;
  } finally {
    elements.refreshButton.disabled = false;
    elements.refreshButton.querySelector("span").textContent = t("actions.refresh");
    document.body.classList.remove("loading");
  }
}

async function generateAiSummary(options = {}) {
  const silent = Boolean(options.silent);
  if (!state.feed) return;
  elements.generateAi.disabled = true;
  elements.refreshAiButton.disabled = true;
  elements.generateAi.textContent = t("ai.generating");
  elements.refreshAiButton.querySelector("span").textContent = t("actions.refreshingAi");
  if (!silent) {
    elements.aiResult.innerHTML = `<div class="empty">${t("ai.generating")}...</div>`;
  }

  try {
    if (window.location.protocol === "file:") {
      state.aiSummary = buildLocalSummary();
      state.lastAiRefreshAt = new Date().toISOString();
      renderAiSummary();
      return;
    }

    const response = await fetch(ENDPOINTS.ai, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({
      language: state.language,
      evidence: state.feed.evidence,
      providerConfig: currentAiConfigForRequest(),
    }),
  });
    const payload = await response.json();
    state.aiSummary = response.ok ? payload : payload.fallback || payload;
    state.lastAiRefreshAt = new Date().toISOString();
    renderAiSummary();
  } catch (error) {
    state.aiSummary = buildLocalSummary(state.language === "zh" ? `AI 摘要请求失败：${error.message}` : `AI summary request failed: ${error.message}`);
    state.lastAiRefreshAt = new Date().toISOString();
    renderAiSummary();
  } finally {
    elements.generateAi.disabled = false;
    elements.refreshAiButton.disabled = false;
    elements.generateAi.textContent = t("ai.button");
    elements.refreshAiButton.querySelector("span").textContent = t("actions.refreshAi");
  }
}

function scheduleAiRefresh() {
  if (state.aiTimer) {
    window.clearInterval(state.aiTimer);
  }
  state.aiTimer = window.setInterval(() => {
    generateAiSummary({ silent: true });
  }, 5 * 60 * 1000);
}

function setupReveal() {
  document.documentElement.classList.add("js-ready");
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  items.forEach((item) => observer.observe(item));
  window.setTimeout(() => {
    items.forEach((item) => item.classList.add("visible"));
  }, 250);
}

function updatePageProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, scrollTop / maxScroll));
  elements.pageProgressBar.style.transform = `scaleX(${progress})`;
}

elements.languageToggle.addEventListener("click", () => {
  state.language = state.language === "zh" ? "en" : "zh";
  localStorage.setItem("hanta-language", state.language);
  renderAll();
});

elements.refreshButton.addEventListener("click", () => loadFeed(true));
elements.refreshAiButton.addEventListener("click", () => generateAiSummary({ silent: false }));
elements.generateAi.addEventListener("click", () => generateAiSummary({ silent: false }));
elements.apiProvider.addEventListener("change", updateProviderDefaults);
elements.saveApiConfig.addEventListener("click", saveApiConfig);
elements.clearApiConfig.addEventListener("click", clearApiConfig);
elements.countrySearch.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderCountries();
});
elements.regionFilter.addEventListener("change", (event) => {
  state.regionFilter = event.target.value;
  renderCountries();
});
document.addEventListener("click", (event) => {
  const card = event.target.closest("[data-open-kind]");
  if (!card) return;
  if (event.target.closest("a, button, input, select")) return;
  handleCardAction(card.dataset.openKind, card.dataset.openId, card);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDetail();
    return;
  }

  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest("[data-open-kind]");
  if (!card) return;
  event.preventDefault();
  handleCardAction(card.dataset.openKind, card.dataset.openId, card);
});
elements.detailBackdrop.addEventListener("click", closeDetail);
elements.detailClose.addEventListener("click", closeDetail);
window.addEventListener("scroll", updatePageProgress, { passive: true });
window.addEventListener("resize", updatePageProgress);

loadApiConfig();
fillApiConfigForm();
applyTranslations();
setupReveal();
updatePageProgress();
loadFeed(false).then(() => {
  updatePageProgress();
  generateAiSummary({ silent: true });
  scheduleAiRefresh();
});
