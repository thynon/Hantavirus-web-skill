# Hantavirus Global Monitor

一个本地运行的 Hantavirus 官方数据监测网页，面向多国家/地区公共卫生来源，提供中英双语界面、官方来源健康状态、证据绑定的 AI 摘要，以及 Apple 风格的卡片、弹窗和轮播交互。

> 仅用于公共卫生信息监测和学习展示，不构成医学建议、诊断建议、旅行建议或公共卫生决策依据。

## Features

- 多机构官方来源：WHO、CDC、PAHO、ECDC 和多个国家/地区卫生机构。
- 多国家数据矩阵：按国家、地区、来源状态和可核验证据展示。
- 来源健康面板：透明显示抓取是否成功、检查时间和失败原因。
- 严谨 AI 摘要：AI 只能总结后端整理出的官方证据包，并保留引用来源。
- 自定义 AI 供应商：支持 OpenAI Compatible、OpenAI、Anthropic、Gemini、DeepSeek、Qwen、OpenRouter、Mistral、Groq、Kimi、智谱、xAI 等。
- 本地优先：项目可在 `127.0.0.1:4188` 运行，API Key 可通过网页表单保存在本机浏览器。
- 设计体验：Apple 风格布局、可展开卡片、毛玻璃弹窗、区域轮播和页面进度条。

## Quick Start

需要 Node.js 18 或更高版本。

```bash
cd /Users/jayu/Desktop/Codex/Hantavirus
npm start
```

打开浏览器访问：

```text
http://127.0.0.1:4188/
```

macOS 也可以双击：

```text
start-local.command
```

如果端口 `4188` 被占用：

```bash
PORT=4189 npm start
```

## AI Provider Setup

网页内配置：

1. 打开页面的 `AI 摘要` 区域。
2. 选择 AI 供应商。
3. 填写模型、Base URL 和 API Key。
4. 点击 `保存配置`。

网页保存的 API Key 位于本机浏览器 localStorage，不会写入 Git 仓库。

也可以通过环境变量配置服务端默认值。复制 `.env.example` 后自行填写真实密钥，但不要提交 `.env`：

```bash
cp .env.example .env
```

常用变量：

```text
AI_PROVIDER=openai-compatible
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-5.4-mini
AI_API_KEY=your_api_key_here
```

## Data Rules

AI 摘要遵守以下规则：

- 只接收后端整理后的官方证据包。
- 每条结论必须绑定官方来源链接。
- 不推断病例数、死亡数、趋势或风险等级。
- 数字冲突时并排展示，不强行合并。
- 无 API Key 时，官方数据和来源卡片仍可浏览，AI 摘要显示不可用。

## Official Source Scope

初始来源包括：

- WHO Disease Outbreak News
- CDC Hantavirus
- PAHO Hantavirus / Epidemiological Alert
- ECDC Hantavirus Infection
- 多个国家卫生部、疾控或公共卫生机构

来源配置位于：

```text
data/sources.json
```

## API Endpoints

本地服务提供：

```text
GET  /api/official-feed
GET  /api/source-health
POST /api/ai-summary
```

## Disclaimer

免责声明页面：

```text
http://127.0.0.1:4188/disclaimer.html
```

页面底部和顶部导航均包含免责声明入口。

## Security Notes

- 不要把真实 API Key、GitHub token 或 `.env` 文件提交到仓库。
- `.gitignore` 已忽略 `.env`、本地配置、压缩包和 `node_modules`。
- 如果 token 曾经出现在聊天、日志或公开位置，建议在供应商后台撤销并重新生成。

## Project Structure

```text
.
├── data/sources.json
├── disclaimer.html
├── hantavirus.css
├── hantavirus.html
├── hantavirus.js
├── package.json
├── server.js
├── start-local.command
└── start-local.sh
```

