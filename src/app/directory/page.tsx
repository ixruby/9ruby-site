"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Search, ExternalLink, GitFork, Copy, Star, Filter,
  Globe, Cpu, Server, Wrench, Layers, Bot, Palette,
  Box, Plug, Terminal as TerminalIcon, ChevronDown,
  Sparkles, ArrowRight, X, Check, Download,
  Monitor, Cloud, Zap, Code, Layout, Package,
} from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/Breadcrumb"

/* ═══════════════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════════════ */

type Badge = "Local" | "Cloud" | "Both" | "Free" | "Freemium" | "Open Source" | "CLI" | "GUI" | "Web"
  | "macOS" | "Windows" | "Linux" | "Cross-platform" | "Python" | "TypeScript" | "JavaScript"
  | "Go" | "Rust" | "C++" | "CSS" | "Popular" | "New"

interface DirectoryEntry {
  name: string
  description: string
  category: string
  stars?: string
  badges?: Badge[]
  url?: string
  github?: string
  installCmd?: string
  slashCmd?: string
}

/* ═══════════════════════════════════════════════════════════════════
   CATEGORY CONFIG
═══════════════════════════════════════════════════════════════════ */

const categories = [
  { id: "all", label: "All", icon: <Sparkles size={14} /> },
  { id: "templates", label: "Website Templates", icon: <Layout size={14} /> },
  { id: "ai-tools", label: "AI Tools & Models", icon: <Cpu size={14} /> },
  { id: "mcp", label: "MCP Servers", icon: <Plug size={14} /> },
  { id: "dev-tools", label: "Developer Tools", icon: <Wrench size={14} /> },
  { id: "frameworks", label: "Frameworks & Libraries", icon: <Layers size={14} /> },
  { id: "agents", label: "AI Agent Frameworks", icon: <Bot size={14} /> },
  { id: "design", label: "Design & Creative", icon: <Palette size={14} /> },
  { id: "infra", label: "Infrastructure", icon: <Server size={14} /> },
  { id: "integrations", label: "Integrations & APIs", icon: <Globe size={14} /> },
  { id: "skills", label: "Claude Code Skills", icon: <TerminalIcon size={14} /> },
]

/* ═══════════════════════════════════════════════════════════════════
   DATA: 1. WEBSITE TEMPLATES (31)
═══════════════════════════════════════════════════════════════════ */

const websiteTemplates: DirectoryEntry[] = [
  { name: "Next.js Commerce", description: "High-performance e-commerce storefront with Shopify integration. Cart, checkout, product pages, search, and dynamic OG images.", category: "templates", stars: "11.2k", badges: ["TypeScript", "Open Source"], github: "https://github.com/vercel/commerce", url: "https://demo.vercel.store" },
  { name: "Taxonomy", description: "Full-featured blog and documentation starter built with Next.js App Router, ContentLayer, and MDX. Auth, dashboard, and subscriptions.", category: "templates", stars: "18.5k", badges: ["TypeScript", "Open Source"], github: "https://github.com/shadcn-ui/taxonomy" },
  { name: "Platforms Starter Kit", description: "Multi-tenant application starter for building platforms like Vercel, Hashnode, or Medium with custom domains.", category: "templates", stars: "4.9k", badges: ["TypeScript", "Open Source"], github: "https://github.com/vercel/platforms" },
  { name: "Cal.com", description: "Open-source scheduling infrastructure. Self-hostable Calendly alternative with team scheduling, payments, and webhooks.", category: "templates", stars: "32.5k", badges: ["TypeScript", "Open Source"], github: "https://github.com/calcom/cal.com", url: "https://cal.com" },
  { name: "Dub.co", description: "Open-source link management platform. Custom domains, analytics, QR codes, and API. Built with Next.js and Tinybird.", category: "templates", stars: "18.8k", badges: ["TypeScript", "Open Source"], github: "https://github.com/dubinc/dub", url: "https://dub.co" },
  { name: "Papermark", description: "Open-source DocSend alternative. Share documents with real-time analytics, custom branding, and viewer tracking.", category: "templates", stars: "5.1k", badges: ["TypeScript", "Open Source"], github: "https://github.com/mfts/papermark", url: "https://papermark.io" },
  { name: "Documenso", description: "Open-source DocuSign alternative. Digital signatures, templates, API, and self-hosting. Beautiful modern UI.", category: "templates", stars: "8.2k", badges: ["TypeScript", "Open Source"], github: "https://github.com/documenso/documenso", url: "https://documenso.com" },
  { name: "Formbricks", description: "Open-source survey and experience management. In-app surveys, link surveys, and no-code form builder.", category: "templates", stars: "8.5k", badges: ["TypeScript", "Open Source"], github: "https://github.com/formbricks/formbricks", url: "https://formbricks.com" },
  { name: "Inbox Zero", description: "Open-source email management powered by AI. Auto-categorize, bulk unsubscribe, cold email blocker, and analytics.", category: "templates", stars: "3.8k", badges: ["TypeScript", "Open Source"], github: "https://github.com/elie222/inbox-zero", url: "https://getinboxzero.com" },
  { name: "Midday", description: "Open-source financial OS for freelancers. Time tracking, invoicing, file management, and magic inbox.", category: "templates", stars: "5.4k", badges: ["TypeScript", "Open Source"], github: "https://github.com/midday-ai/midday", url: "https://midday.ai" },
  { name: "Plausible Analytics", description: "Privacy-friendly Google Analytics alternative. Lightweight, open source, and GDPR compliant. No cookies needed.", category: "templates", stars: "20.5k", badges: ["Open Source"], github: "https://github.com/plausible/analytics", url: "https://plausible.io" },
  { name: "Rallly", description: "Open-source meeting poll and scheduling tool. Doodle alternative with a beautiful interface. Self-hostable.", category: "templates", stars: "3.5k", badges: ["TypeScript", "Open Source"], github: "https://github.com/lukevella/rallly", url: "https://rallly.co" },
  { name: "Twenty CRM", description: "Modern open-source CRM. Salesforce alternative built with React, Node, and PostgreSQL. Beautiful UI, extensible.", category: "templates", stars: "23.8k", badges: ["TypeScript", "Open Source"], github: "https://github.com/twentyhq/twenty", url: "https://twenty.com" },
  { name: "Hoppscotch", description: "Open-source API development ecosystem. Postman alternative with real-time collaboration, WebSocket, SSE, and GraphQL.", category: "templates", stars: "65.2k", badges: ["TypeScript", "Open Source"], github: "https://github.com/hoppscotch/hoppscotch", url: "https://hoppscotch.io" },
  { name: "Cal.com Atoms", description: "Embeddable scheduling components. Drop calendar widgets into any React app with Cal.com Atoms library.", category: "templates", stars: "32.5k", badges: ["TypeScript", "Open Source"], github: "https://github.com/calcom/cal.com" },
  { name: "Shadcn Taxonomy", description: "Application shell with authentication, subscriptions, API routes, and static pages. Built with Radix UI and Tailwind CSS.", category: "templates", stars: "18.5k", badges: ["TypeScript", "Open Source"], github: "https://github.com/shadcn-ui/taxonomy" },
  { name: "Precedent", description: "Opinionated Next.js starter with auth, Prisma, edge functions, and beautiful animations. By Steven Tey.", category: "templates", stars: "4.7k", badges: ["TypeScript", "Open Source"], github: "https://github.com/steven-tey/precedent", url: "https://precedent.dev" },
  { name: "Novel", description: "Notion-style WYSIWYG editor built with Tiptap and AI autocomplete. Drop-in rich text editor component.", category: "templates", stars: "13.2k", badges: ["TypeScript", "Open Source"], github: "https://github.com/steven-tey/novel", url: "https://novel.sh" },
  { name: "ChatGPT Clone", description: "Full ChatGPT clone template with streaming, markdown rendering, code highlighting, and conversation management.", category: "templates", stars: "2.1k", badges: ["TypeScript", "Open Source"], github: "https://github.com/vercel/ai-chatbot" },
  { name: "Next.js Subscription Payments", description: "Full subscription payments starter with Stripe, Supabase Auth, and database. Production-ready billing flow.", category: "templates", stars: "6.3k", badges: ["TypeScript", "Open Source"], github: "https://github.com/vercel/nextjs-subscription-payments" },
  { name: "Vercel AI Chatbot", description: "Full-featured AI chatbot template using the Vercel AI SDK. Multiple model providers, tool calling, and file uploads.", category: "templates", stars: "7.8k", badges: ["TypeScript", "Open Source", "Popular"], github: "https://github.com/vercel/ai-chatbot" },
  { name: "Next.js SaaS Starter", description: "Complete SaaS boilerplate with Stripe, auth, teams, admin dashboard, activity logging, and Drizzle ORM.", category: "templates", stars: "8.1k", badges: ["TypeScript", "Open Source"], github: "https://github.com/nextjs/saas-starter" },
  { name: "Nextra", description: "Static site generator for documentation and blogs. MDX support, full-text search, and beautiful themes.", category: "templates", stars: "11.8k", badges: ["TypeScript", "Open Source"], github: "https://github.com/shuding/nextra", url: "https://nextra.site" },
  { name: "Tailwind Nextjs Starter Blog", description: "Feature-rich blog template with tags, search, analytics, sitemap, RSS, and dark mode. MDX-powered.", category: "templates", stars: "8.5k", badges: ["TypeScript", "Open Source"], github: "https://github.com/timlrx/tailwind-nextjs-starter-blog" },
  { name: "Next.js Portfolio", description: "Minimalist developer portfolio. Projects showcase, blog with MDX, dark mode, and responsive design.", category: "templates", stars: "3.2k", badges: ["TypeScript", "Open Source"], github: "https://github.com/vercel/next.js/tree/canary/examples/portfolio" },
  { name: "Bulletproof React", description: "Scalable React architecture reference. Feature-based structure, testing patterns, and best practices.", category: "templates", stars: "28.4k", badges: ["TypeScript", "Open Source", "Popular"], github: "https://github.com/alan2207/bulletproof-react" },
  { name: "Turborepo Starter", description: "Monorepo starter with Turborepo. Shared packages, apps workspace, CI/CD, and remote caching.", category: "templates", stars: "26.3k", badges: ["TypeScript", "Open Source"], github: "https://github.com/vercel/turbo" },
  { name: "OpenStatus", description: "Open-source monitoring and status page platform. Uptime monitoring, incident management, and beautiful status pages.", category: "templates", stars: "5.9k", badges: ["TypeScript", "Open Source"], github: "https://github.com/openstatusHQ/openstatus", url: "https://openstatus.dev" },
  { name: "Activepieces", description: "Open-source Zapier alternative. Automation workflows with 100+ integrations and a visual flow builder.", category: "templates", stars: "10.5k", badges: ["TypeScript", "Open Source"], github: "https://github.com/activepieces/activepieces", url: "https://activepieces.com" },
  { name: "Infisical", description: "Open-source secret management platform. Sync secrets across your team and infrastructure. End-to-end encrypted.", category: "templates", stars: "16.2k", badges: ["TypeScript", "Open Source"], github: "https://github.com/Infisical/infisical", url: "https://infisical.com" },
  { name: "Trigger.dev", description: "Open-source background jobs framework. Reliable long-running tasks with retries, scheduling, and observability.", category: "templates", stars: "10.1k", badges: ["TypeScript", "Open Source"], github: "https://github.com/triggerdotdev/trigger.dev", url: "https://trigger.dev" },
]

/* ═══════════════════════════════════════════════════════════════════
   DATA: 2. AI TOOLS & MODELS (25)
═══════════════════════════════════════════════════════════════════ */

const aiTools: DirectoryEntry[] = [
  { name: "Ollama", description: "Run large language models locally. Pull and run Llama 3, Mistral, Gemma, and dozens more with a single command.", category: "ai-tools", stars: "102k", badges: ["Local", "Open Source", "Popular"], github: "https://github.com/ollama/ollama", url: "https://ollama.com" },
  { name: "LM Studio", description: "Desktop app to discover, download, and run local LLMs. Chat UI, OpenAI-compatible server, and model management.", category: "ai-tools", stars: "N/A", badges: ["Local", "Free", "GUI"], url: "https://lmstudio.ai" },
  { name: "Jan", description: "Open-source ChatGPT alternative that runs 100% offline. Local-first, privacy-focused, and extensible with plugins.", category: "ai-tools", stars: "24.5k", badges: ["Local", "Open Source"], github: "https://github.com/janhq/jan", url: "https://jan.ai" },
  { name: "GPT4All", description: "Free, local, privacy-aware chatbot. Run LLMs on consumer hardware with no GPU required. Cross-platform.", category: "ai-tools", stars: "71.2k", badges: ["Local", "Open Source"], github: "https://github.com/nomic-ai/gpt4all", url: "https://gpt4all.io" },
  { name: "LocalAI", description: "Drop-in OpenAI-compatible API that runs locally. Text generation, image generation, audio transcription, and embeddings.", category: "ai-tools", stars: "26.8k", badges: ["Local", "Open Source"], github: "https://github.com/mudler/LocalAI" },
  { name: "Open WebUI", description: "Self-hosted AI interface for Ollama and OpenAI-compatible APIs. Beautiful UI, RAG, web search, and multi-model support.", category: "ai-tools", stars: "52.3k", badges: ["Both", "Open Source", "Popular"], github: "https://github.com/open-webui/open-webui" },
  { name: "LibreChat", description: "Enhanced ChatGPT clone supporting multiple AI providers. Multi-model conversations, plugins, presets, and file sharing.", category: "ai-tools", stars: "19.8k", badges: ["Both", "Open Source"], github: "https://github.com/danny-avila/LibreChat" },
  { name: "LobeChat", description: "Modern AI chat framework. Multi-model, plugin system, TTS, knowledge base, and beautiful customizable UI.", category: "ai-tools", stars: "48.5k", badges: ["Both", "Open Source"], github: "https://github.com/lobehub/lobe-chat", url: "https://lobechat.com" },
  { name: "Chatbot UI", description: "Open-source ChatGPT interface. Multiple models, prompt management, folders, and conversation sharing.", category: "ai-tools", stars: "28.6k", badges: ["Both", "Open Source"], github: "https://github.com/mckaywrigley/chatbot-ui" },
  { name: "AnythingLLM", description: "Full-stack AI application. Private ChatGPT with RAG, agents, multi-user, and any LLM. Desktop and Docker.", category: "ai-tools", stars: "30.2k", badges: ["Both", "Open Source"], github: "https://github.com/Mintplex-Labs/anything-llm", url: "https://anythingllm.com" },
  { name: "Text Generation WebUI", description: "Gradio web UI for running LLMs. Supports transformers, GPTQ, GGUF, llama.cpp, ExLlama, and more.", category: "ai-tools", stars: "41.5k", badges: ["Local", "Open Source"], github: "https://github.com/oobabooga/text-generation-webui" },
  { name: "Stable Diffusion WebUI", description: "Browser interface for Stable Diffusion image generation. Txt2img, img2img, inpainting, extensions, and LoRA support.", category: "ai-tools", stars: "145k", badges: ["Local", "Open Source", "Popular"], github: "https://github.com/AUTOMATIC1111/stable-diffusion-webui" },
  { name: "ComfyUI", description: "Node-based Stable Diffusion GUI. Visual workflow builder for complex image generation pipelines.", category: "ai-tools", stars: "62.8k", badges: ["Local", "Open Source"], github: "https://github.com/comfyanonymous/ComfyUI" },
  { name: "Fooocus", description: "Simplified Stable Diffusion. Midjourney-style ease of use with zero manual tweaking. Just type and generate.", category: "ai-tools", stars: "42.3k", badges: ["Local", "Open Source"], github: "https://github.com/lllyasviel/Fooocus" },
  { name: "InvokeAI", description: "Professional creative AI toolkit. Unified canvas, node editor, ControlNet, IP-Adapter, and batch generation.", category: "ai-tools", stars: "23.8k", badges: ["Local", "Open Source"], github: "https://github.com/invoke-ai/InvokeAI", url: "https://invoke.ai" },
  { name: "Whisper", description: "OpenAI's automatic speech recognition. Multilingual transcription, translation, and language identification.", category: "ai-tools", stars: "72.5k", badges: ["Local", "Open Source", "Python"], github: "https://github.com/openai/whisper" },
  { name: "Bark", description: "Transformer-based text-to-audio model. Generate speech, music, background noise, and sound effects from text prompts.", category: "ai-tools", stars: "36.8k", badges: ["Local", "Open Source", "Python"], github: "https://github.com/suno-ai/bark" },
  { name: "Coqui TTS", description: "Deep learning text-to-speech toolkit. Voice cloning, multi-speaker, multi-lingual. 1100+ pre-trained models.", category: "ai-tools", stars: "35.2k", badges: ["Local", "Open Source", "Python"], github: "https://github.com/coqui-ai/TTS" },
  { name: "MusicGen", description: "Meta's music generation model. Generate high-quality music from text descriptions or melodies. Controllable output.", category: "ai-tools", stars: "N/A", badges: ["Local", "Open Source", "Python"], github: "https://github.com/facebookresearch/audiocraft" },
  { name: "AudioCraft", description: "Meta's audio generation library. MusicGen, AudioGen, and EnCodec. Text-to-music, text-to-sound, and audio compression.", category: "ai-tools", stars: "21.5k", badges: ["Local", "Open Source", "Python"], github: "https://github.com/facebookresearch/audiocraft" },
  { name: "Whisper.cpp", description: "Port of OpenAI Whisper in C/C++. Blazing fast inference on CPU. Real-time transcription on consumer hardware.", category: "ai-tools", stars: "36.2k", badges: ["Local", "Open Source", "C++"], github: "https://github.com/ggerganov/whisper.cpp" },
  { name: "llama.cpp", description: "LLM inference in C/C++. Run Llama, Mistral, and other models on CPU with optional GPU acceleration.", category: "ai-tools", stars: "72.8k", badges: ["Local", "Open Source", "C++", "Popular"], github: "https://github.com/ggerganov/llama.cpp" },
  { name: "Vllm", description: "High-throughput LLM serving engine. PagedAttention for efficient memory management. OpenAI-compatible API.", category: "ai-tools", stars: "35.6k", badges: ["Cloud", "Open Source", "Python"], github: "https://github.com/vllm-project/vllm" },
  { name: "Dify", description: "Open-source LLM app development platform. Visual AI workflow builder, RAG pipeline, agent framework, and observability.", category: "ai-tools", stars: "55.8k", badges: ["Both", "Open Source", "Popular"], github: "https://github.com/langgenius/dify", url: "https://dify.ai" },
  { name: "Perplexica", description: "Open-source Perplexity alternative. AI-powered search engine with citations, focus modes, and local LLM support.", category: "ai-tools", stars: "18.5k", badges: ["Both", "Open Source"], github: "https://github.com/ItzCrazyKns/Perplexica" },
]

/* ═══════════════════════════════════════════════════════════════════
   DATA: 3. MCP SERVERS (22)
═══════════════════════════════════════════════════════════════════ */

const mcpServers: DirectoryEntry[] = [
  { name: "Filesystem", description: "Read, write, and manage local files and directories. Sandboxed access with configurable permissions.", category: "mcp", badges: ["Open Source"], installCmd: "npx @modelcontextprotocol/server-filesystem", github: "https://github.com/modelcontextprotocol/servers" },
  { name: "GitHub", description: "Manage repos, issues, PRs, branches, and actions. Full GitHub API access through MCP.", category: "mcp", badges: ["Open Source", "Popular"], installCmd: "npx @modelcontextprotocol/server-github", github: "https://github.com/modelcontextprotocol/servers" },
  { name: "Slack", description: "Send messages, read channels, search conversations, and manage Slack workspaces.", category: "mcp", badges: ["Open Source"], installCmd: "npx @modelcontextprotocol/server-slack", github: "https://github.com/modelcontextprotocol/servers" },
  { name: "Notion", description: "Read and write Notion pages, databases, and blocks. Full Notion API integration.", category: "mcp", badges: ["Open Source"], installCmd: "npx @modelcontextprotocol/server-notion", github: "https://github.com/modelcontextprotocol/servers" },
  { name: "Google Drive", description: "Access, search, and manage Google Drive files and folders. Read document contents.", category: "mcp", badges: ["Open Source"], installCmd: "npx @modelcontextprotocol/server-gdrive", github: "https://github.com/modelcontextprotocol/servers" },
  { name: "Gmail", description: "Read, search, draft, and manage Gmail messages and threads.", category: "mcp", badges: ["Open Source"], installCmd: "npx @modelcontextprotocol/server-gmail", github: "https://github.com/modelcontextprotocol/servers" },
  { name: "Google Calendar", description: "List, create, update, and delete calendar events. Find free time and manage schedules.", category: "mcp", badges: ["Open Source"], installCmd: "npx @modelcontextprotocol/server-google-calendar", github: "https://github.com/modelcontextprotocol/servers" },
  { name: "Supabase", description: "Execute SQL, manage migrations, deploy edge functions, and interact with your Supabase project.", category: "mcp", badges: ["Open Source"], installCmd: "npx @modelcontextprotocol/server-supabase", github: "https://github.com/modelcontextprotocol/servers" },
  { name: "PostgreSQL", description: "Connect to PostgreSQL databases. Run queries, inspect schemas, and manage data.", category: "mcp", badges: ["Open Source"], installCmd: "npx @modelcontextprotocol/server-postgres", github: "https://github.com/modelcontextprotocol/servers" },
  { name: "SQLite", description: "Read and write SQLite databases. Create tables, run queries, and analyze data.", category: "mcp", badges: ["Open Source"], installCmd: "npx @modelcontextprotocol/server-sqlite", github: "https://github.com/modelcontextprotocol/servers" },
  { name: "Brave Search", description: "Web and local search through the Brave Search API. Get real-time information from the web.", category: "mcp", badges: ["Open Source"], installCmd: "npx @modelcontextprotocol/server-brave-search", github: "https://github.com/modelcontextprotocol/servers" },
  { name: "Fetch", description: "Fetch and convert web pages to markdown. Extract content from URLs for AI processing.", category: "mcp", badges: ["Open Source"], installCmd: "npx @modelcontextprotocol/server-fetch", github: "https://github.com/modelcontextprotocol/servers" },
  { name: "Puppeteer", description: "Browser automation through Puppeteer. Navigate, screenshot, click, fill forms, and scrape pages.", category: "mcp", badges: ["Open Source"], installCmd: "npx @modelcontextprotocol/server-puppeteer", github: "https://github.com/modelcontextprotocol/servers" },
  { name: "Sequential Thinking", description: "Dynamic problem-solving through sequential thought chains. Plan, revise, and branch complex reasoning.", category: "mcp", badges: ["Open Source"], installCmd: "npx @modelcontextprotocol/server-sequential-thinking", github: "https://github.com/modelcontextprotocol/servers" },
  { name: "Memory", description: "Persistent memory storage using a knowledge graph. Remember facts, entities, and relationships across sessions.", category: "mcp", badges: ["Open Source"], installCmd: "npx @modelcontextprotocol/server-memory", github: "https://github.com/modelcontextprotocol/servers" },
  { name: "Figma", description: "Read Figma designs, get screenshots, extract design tokens, and generate code from components.", category: "mcp", badges: ["Open Source", "Popular"], installCmd: "npx @anthropic/mcp-server-figma", github: "https://github.com/anthropics/mcp-server-figma" },
  { name: "Stripe", description: "Manage customers, products, subscriptions, invoices, and payments. Full Stripe API access.", category: "mcp", badges: ["Open Source"], installCmd: "npx @stripe/mcp-server-stripe", github: "https://github.com/stripe/mcp-server-stripe" },
  { name: "Vercel", description: "Deploy projects, manage domains, view logs, and interact with Vercel deployments and teams.", category: "mcp", badges: ["Open Source"], installCmd: "npx @vercel/mcp-server-vercel", github: "https://github.com/vercel/mcp-server-vercel" },
  { name: "Hugging Face", description: "Search models, datasets, and spaces. Fetch documentation and run inference on HuggingFace models.", category: "mcp", badges: ["Open Source"], installCmd: "npx @huggingface/mcp-server", github: "https://github.com/huggingface/mcp-server" },
  { name: "Playwright", description: "Browser automation with Playwright. Navigate, interact, take screenshots, and test web applications.", category: "mcp", badges: ["Open Source", "Popular"], installCmd: "npx @playwright/mcp-server", github: "https://github.com/microsoft/playwright-mcp" },
  { name: "Sentry", description: "Monitor errors and performance. Search issues, view stack traces, and manage Sentry projects.", category: "mcp", badges: ["Open Source"], installCmd: "npx @sentry/mcp-server-sentry", github: "https://github.com/getsentry/sentry-mcp" },
  { name: "Linear", description: "Manage issues, projects, and cycles in Linear. Create, update, and search across your workspace.", category: "mcp", badges: ["Open Source"], installCmd: "npx @linear/mcp-server-linear", github: "https://github.com/linear/linear-mcp" },
]

/* ═══════════════════════════════════════════════════════════════════
   DATA: 4. DEVELOPER TOOLS (22)
═══════════════════════════════════════════════════════════════════ */

const devTools: DirectoryEntry[] = [
  { name: "VS Code", description: "The most popular code editor. Extensions marketplace, integrated terminal, Git, debugging, and AI-assisted coding.", category: "dev-tools", stars: "166k", badges: ["Cross-platform", "Open Source", "Popular"], github: "https://github.com/microsoft/vscode", url: "https://code.visualstudio.com" },
  { name: "Cursor", description: "AI-native code editor built on VS Code. Tab completion, inline editing, chat, and multi-file edits with AI.", category: "dev-tools", badges: ["Cross-platform", "Freemium"], url: "https://cursor.com" },
  { name: "Windsurf", description: "AI-powered IDE by Codeium. Deep codebase understanding, Cascade flows, and intelligent autocomplete.", category: "dev-tools", badges: ["Cross-platform", "Freemium"], url: "https://codeium.com/windsurf" },
  { name: "Zed", description: "High-performance multiplayer code editor. GPU-accelerated, built in Rust. Real-time collaboration built in.", category: "dev-tools", stars: "52.3k", badges: ["Cross-platform", "Open Source", "Rust"], github: "https://github.com/zed-industries/zed", url: "https://zed.dev" },
  { name: "Neovim", description: "Hyperextensible Vim-based text editor. Lua configuration, LSP, treesitter, and massive plugin ecosystem.", category: "dev-tools", stars: "84.5k", badges: ["Cross-platform", "Open Source"], github: "https://github.com/neovim/neovim", url: "https://neovim.io" },
  { name: "WezTerm", description: "GPU-accelerated terminal emulator and multiplexer. Lua-scriptable, cross-platform, with ligature support.", category: "dev-tools", stars: "18.2k", badges: ["Cross-platform", "Open Source", "Rust"], github: "https://github.com/wez/wezterm" },
  { name: "Starship", description: "Minimal, blazing-fast, and customizable shell prompt. Works with any shell. Written in Rust.", category: "dev-tools", stars: "46.5k", badges: ["Cross-platform", "Open Source", "Rust"], github: "https://github.com/starship/starship", url: "https://starship.rs" },
  { name: "lazygit", description: "Simple terminal UI for git. Stage, commit, rebase, cherry-pick, and resolve conflicts with keyboard shortcuts.", category: "dev-tools", stars: "53.8k", badges: ["Cross-platform", "Open Source", "Go"], github: "https://github.com/jesseduffield/lazygit" },
  { name: "delta", description: "Syntax-highlighting pager for git, diff, and grep output. Side-by-side view, line numbers, and themes.", category: "dev-tools", stars: "24.5k", badges: ["Cross-platform", "Open Source", "Rust"], github: "https://github.com/dandavison/delta" },
  { name: "bat", description: "A cat clone with syntax highlighting and Git integration. Themes, line numbers, and paging.", category: "dev-tools", stars: "50.8k", badges: ["Cross-platform", "Open Source", "Rust"], github: "https://github.com/sharkdp/bat" },
  { name: "eza", description: "Modern replacement for ls. Color output, icons, git status, tree view, and extended attributes.", category: "dev-tools", stars: "13.5k", badges: ["Cross-platform", "Open Source", "Rust"], github: "https://github.com/eza-community/eza" },
  { name: "fd", description: "Simple, fast, and user-friendly alternative to find. Regex, glob patterns, and smart case sensitivity.", category: "dev-tools", stars: "34.8k", badges: ["Cross-platform", "Open Source", "Rust"], github: "https://github.com/sharkdp/fd" },
  { name: "ripgrep", description: "Blazingly fast recursive search tool. Respects gitignore, Unicode support, and compressed file search.", category: "dev-tools", stars: "49.5k", badges: ["Cross-platform", "Open Source", "Rust", "Popular"], github: "https://github.com/BurntSushi/ripgrep" },
  { name: "fzf", description: "General-purpose command-line fuzzy finder. Interactive filtering for any list, files, history, and processes.", category: "dev-tools", stars: "66.5k", badges: ["Cross-platform", "Open Source", "Go", "Popular"], github: "https://github.com/junegunn/fzf" },
  { name: "jq", description: "Lightweight command-line JSON processor. Filter, transform, and format JSON data with a powerful query language.", category: "dev-tools", stars: "30.8k", badges: ["Cross-platform", "Open Source"], github: "https://github.com/jqlang/jq", url: "https://jqlang.github.io/jq/" },
  { name: "HTTPie", description: "Human-friendly HTTP client for the API era. JSON highlighting, sessions, file uploads, and auth plugins.", category: "dev-tools", stars: "34.2k", badges: ["Cross-platform", "Open Source", "Python"], github: "https://github.com/httpie/cli", url: "https://httpie.io" },
  { name: "btop", description: "Resource monitor showing CPU, memory, disks, network, and processes. Beautiful TUI with mouse support.", category: "dev-tools", stars: "21.5k", badges: ["Cross-platform", "Open Source", "C++"], github: "https://github.com/aristocratos/btop" },
  { name: "Hoppscotch", description: "Open-source API development ecosystem. REST, GraphQL, WebSocket, SSE, and MQTT testing with real-time collaboration.", category: "dev-tools", stars: "65.2k", badges: ["Web", "Open Source", "Popular"], github: "https://github.com/hoppscotch/hoppscotch", url: "https://hoppscotch.io" },
  { name: "Bruno", description: "Offline-first API client. Git-friendly collections stored as files. No cloud sync, no accounts required.", category: "dev-tools", stars: "28.5k", badges: ["Cross-platform", "Open Source"], github: "https://github.com/usebruno/bruno", url: "https://usebruno.com" },
  { name: "Insomnia", description: "Open-source API development platform. REST, GraphQL, gRPC, WebSocket, and OpenAPI. Git sync and collaboration.", category: "dev-tools", stars: "35.2k", badges: ["Cross-platform", "Open Source"], github: "https://github.com/Kong/insomnia", url: "https://insomnia.rest" },
  { name: "Warp", description: "Modern terminal built in Rust. AI command search, block-based output, collaborative features, and workflows.", category: "dev-tools", badges: ["macOS", "Freemium", "Rust"], url: "https://warp.dev" },
  { name: "Fig (Amazon Q)", description: "AI-powered terminal autocomplete. IDE-style completions for 500+ CLI tools. Now part of Amazon Q.", category: "dev-tools", badges: ["macOS", "Free"], url: "https://fig.io" },
]

/* ═══════════════════════════════════════════════════════════════════
   DATA: 5. FRAMEWORKS & LIBRARIES (22)
═══════════════════════════════════════════════════════════════════ */

const frameworks: DirectoryEntry[] = [
  { name: "Next.js", description: "React framework for production. Server components, app router, middleware, ISR, and edge runtime.", category: "frameworks", stars: "128k", badges: ["TypeScript", "Open Source", "Popular"], github: "https://github.com/vercel/next.js", url: "https://nextjs.org" },
  { name: "React", description: "Library for building user interfaces. Component-based, declarative, with hooks and server components.", category: "frameworks", stars: "231k", badges: ["JavaScript", "Open Source", "Popular"], github: "https://github.com/facebook/react", url: "https://react.dev" },
  { name: "Vue.js", description: "Progressive JavaScript framework. Composition API, reactivity system, and excellent developer experience.", category: "frameworks", stars: "48.2k", badges: ["TypeScript", "Open Source"], github: "https://github.com/vuejs/core", url: "https://vuejs.org" },
  { name: "Svelte", description: "Compiler that generates minimal JavaScript. No virtual DOM, reactive by default. SvelteKit for full-stack.", category: "frameworks", stars: "80.5k", badges: ["TypeScript", "Open Source"], github: "https://github.com/sveltejs/svelte", url: "https://svelte.dev" },
  { name: "Astro", description: "Content-focused web framework. Island architecture, zero JS by default, and multi-framework support.", category: "frameworks", stars: "48.2k", badges: ["TypeScript", "Open Source"], github: "https://github.com/withastro/astro", url: "https://astro.build" },
  { name: "Remix", description: "Full-stack React framework. Nested routes, progressive enhancement, server-first rendering, and form handling.", category: "frameworks", stars: "30.5k", badges: ["TypeScript", "Open Source"], github: "https://github.com/remix-run/remix", url: "https://remix.run" },
  { name: "Nuxt", description: "Intuitive Vue framework. File-based routing, auto-imports, SSR/SSG, and 200+ modules.", category: "frameworks", stars: "55.8k", badges: ["TypeScript", "Open Source"], github: "https://github.com/nuxt/nuxt", url: "https://nuxt.com" },
  { name: "SolidJS", description: "Reactive JavaScript library. Fine-grained reactivity, no virtual DOM, compiled, and tiny bundle size.", category: "frameworks", stars: "32.8k", badges: ["TypeScript", "Open Source"], github: "https://github.com/solidjs/solid", url: "https://solidjs.com" },
  { name: "Hono", description: "Ultrafast web framework for the edge. Works on Cloudflare Workers, Deno, Bun, and Node.js. Express-like API.", category: "frameworks", stars: "21.5k", badges: ["TypeScript", "Open Source"], github: "https://github.com/honojs/hono", url: "https://hono.dev" },
  { name: "Express", description: "Minimal and flexible Node.js web framework. The most popular backend framework in the JavaScript ecosystem.", category: "frameworks", stars: "65.8k", badges: ["JavaScript", "Open Source", "Popular"], github: "https://github.com/expressjs/express", url: "https://expressjs.com" },
  { name: "FastAPI", description: "Modern Python web framework. Async-first, automatic docs, type hints, and blazing fast performance.", category: "frameworks", stars: "79.5k", badges: ["Python", "Open Source", "Popular"], github: "https://github.com/fastapi/fastapi", url: "https://fastapi.tiangolo.com" },
  { name: "Django", description: "High-level Python web framework. ORM, admin, auth, REST framework, and batteries-included approach.", category: "frameworks", stars: "81.5k", badges: ["Python", "Open Source"], github: "https://github.com/django/django", url: "https://djangoproject.com" },
  { name: "Flask", description: "Lightweight Python micro-framework. Minimal core with extensive extension ecosystem. Great for APIs.", category: "frameworks", stars: "68.8k", badges: ["Python", "Open Source"], github: "https://github.com/pallets/flask", url: "https://flask.palletsprojects.com" },
  { name: "Tailwind CSS", description: "Utility-first CSS framework. Build custom designs without writing CSS. JIT compiler and design system integration.", category: "frameworks", stars: "84.5k", badges: ["CSS", "Open Source", "Popular"], github: "https://github.com/tailwindlabs/tailwindcss", url: "https://tailwindcss.com" },
  { name: "shadcn/ui", description: "Beautifully designed components built with Radix UI and Tailwind CSS. Copy-paste, not a component library.", category: "frameworks", stars: "75.8k", badges: ["TypeScript", "Open Source", "Popular"], github: "https://github.com/shadcn-ui/ui", url: "https://ui.shadcn.com" },
  { name: "Radix UI", description: "Unstyled, accessible component primitives. Dropdown, dialog, tooltip, and 30+ components. WAI-ARIA compliant.", category: "frameworks", stars: "16.5k", badges: ["TypeScript", "Open Source"], github: "https://github.com/radix-ui/primitives", url: "https://radix-ui.com" },
  { name: "Framer Motion", description: "Production-ready animation library for React. Layout animations, gestures, scroll-triggered, and SVG animations.", category: "frameworks", stars: "24.5k", badges: ["TypeScript", "Open Source"], github: "https://github.com/framer/motion", url: "https://motion.dev" },
  { name: "Three.js", description: "3D library for the web. WebGL renderer, scenes, cameras, geometries, materials, and post-processing effects.", category: "frameworks", stars: "103k", badges: ["JavaScript", "Open Source", "Popular"], github: "https://github.com/mrdoob/three.js", url: "https://threejs.org" },
  { name: "GSAP", description: "Professional-grade animation platform. Timeline-based, ScrollTrigger, morphSVG, and physics. Silky smooth.", category: "frameworks", stars: "20.2k", badges: ["JavaScript", "Free"], github: "https://github.com/greensock/GSAP", url: "https://gsap.com" },
  { name: "Zustand", description: "Small, fast, and scalable state management for React. No boilerplate, no providers, just a hook.", category: "frameworks", stars: "48.5k", badges: ["TypeScript", "Open Source"], github: "https://github.com/pmndrs/zustand" },
  { name: "tRPC", description: "End-to-end typesafe APIs. Call backend functions from the frontend with full type inference. No code generation.", category: "frameworks", stars: "35.5k", badges: ["TypeScript", "Open Source"], github: "https://github.com/trpc/trpc", url: "https://trpc.io" },
  { name: "Drizzle ORM", description: "TypeScript ORM that feels like SQL. Type-safe queries, migrations, and schema management. Zero dependencies.", category: "frameworks", stars: "25.8k", badges: ["TypeScript", "Open Source"], github: "https://github.com/drizzle-team/drizzle-orm", url: "https://orm.drizzle.team" },
]

/* ═══════════════════════════════════════════════════════════════════
   DATA: 6. AI AGENT FRAMEWORKS (17)
═══════════════════════════════════════════════════════════════════ */

const agentFrameworks: DirectoryEntry[] = [
  { name: "LangChain", description: "Framework for building LLM-powered applications. Chains, agents, RAG, memory, and 700+ integrations.", category: "agents", stars: "98.5k", badges: ["Python", "TypeScript", "Open Source", "Popular"], github: "https://github.com/langchain-ai/langchain", url: "https://langchain.com" },
  { name: "LlamaIndex", description: "Data framework for LLM applications. Connect custom data sources to LLMs with RAG pipelines and agents.", category: "agents", stars: "37.5k", badges: ["Python", "Open Source"], github: "https://github.com/run-llama/llama_index", url: "https://llamaindex.ai" },
  { name: "CrewAI", description: "Framework for orchestrating AI agent teams. Role-based agents collaborate on complex tasks autonomously.", category: "agents", stars: "22.8k", badges: ["Python", "Open Source", "Popular"], github: "https://github.com/crewAIInc/crewAI", url: "https://crewai.com" },
  { name: "AutoGen", description: "Microsoft's multi-agent conversation framework. Agents collaborate through chat to solve complex tasks.", category: "agents", stars: "35.8k", badges: ["Python", "Open Source"], github: "https://github.com/microsoft/autogen" },
  { name: "Semantic Kernel", description: "Microsoft's AI orchestration SDK. Integrate LLMs into C#, Python, and Java apps with plugins and planners.", category: "agents", stars: "22.5k", badges: ["Python", "Open Source"], github: "https://github.com/microsoft/semantic-kernel" },
  { name: "Haystack", description: "End-to-end NLP framework. Build RAG pipelines, question answering, and semantic search with components.", category: "agents", stars: "18.2k", badges: ["Python", "Open Source"], github: "https://github.com/deepset-ai/haystack", url: "https://haystack.deepset.ai" },
  { name: "Flowise", description: "Drag-and-drop LLM flow builder. Build LangChain apps visually. No-code AI workflow automation.", category: "agents", stars: "32.5k", badges: ["TypeScript", "Open Source", "Popular"], github: "https://github.com/FlowiseAI/Flowise", url: "https://flowiseai.com" },
  { name: "n8n", description: "Workflow automation platform with AI capabilities. 400+ integrations, visual builder, and self-hostable.", category: "agents", stars: "51.5k", badges: ["TypeScript", "Open Source", "Popular"], github: "https://github.com/n8n-io/n8n", url: "https://n8n.io" },
  { name: "Dify", description: "LLMOps platform for building AI apps. Visual workflow, RAG, agent framework, and model management.", category: "agents", stars: "55.8k", badges: ["Python", "TypeScript", "Open Source"], github: "https://github.com/langgenius/dify", url: "https://dify.ai" },
  { name: "Langflow", description: "Visual framework for building multi-agent and RAG applications. Drag-and-drop components with Python extensibility.", category: "agents", stars: "38.5k", badges: ["Python", "Open Source"], github: "https://github.com/langflow-ai/langflow", url: "https://langflow.org" },
  { name: "SuperAgent", description: "Open-source framework for building AI assistants. Multi-model, tools, RAG, and workflow orchestration.", category: "agents", stars: "5.2k", badges: ["Python", "Open Source"], github: "https://github.com/superagent-ai/superagent" },
  { name: "AgentGPT", description: "Autonomous AI agents in the browser. Give a goal, watch AI create and execute a task chain to accomplish it.", category: "agents", stars: "32.5k", badges: ["TypeScript", "Open Source"], github: "https://github.com/reworkd/AgentGPT" },
  { name: "BabyAGI", description: "AI-powered task management system. Creates, prioritizes, and executes tasks autonomously using LLMs.", category: "agents", stars: "20.5k", badges: ["Python", "Open Source"], github: "https://github.com/yoheinakajima/babyagi" },
  { name: "MetaGPT", description: "Multi-agent framework that assigns roles. Software company simulation: PM, architect, engineer, and QA.", category: "agents", stars: "45.8k", badges: ["Python", "Open Source"], github: "https://github.com/geekan/MetaGPT" },
  { name: "OpenDevin", description: "Open-source Devin alternative. Autonomous software engineering agent that writes, tests, and deploys code.", category: "agents", stars: "38.2k", badges: ["Python", "Open Source", "Popular"], github: "https://github.com/OpenDevin/OpenDevin" },
  { name: "Mastra", description: "TypeScript AI agent framework. Build agents with tools, memory, RAG, and workflows. Batteries included.", category: "agents", stars: "8.5k", badges: ["TypeScript", "Open Source", "New"], github: "https://github.com/mastra-ai/mastra", url: "https://mastra.ai" },
  { name: "Pydantic AI", description: "Agent framework by the Pydantic team. Type-safe, model-agnostic agents with dependency injection and testing.", category: "agents", stars: "12.5k", badges: ["Python", "Open Source", "New"], github: "https://github.com/pydantic/pydantic-ai", url: "https://ai.pydantic.dev" },
]

/* ═══════════════════════════════════════════════════════════════════
   DATA: 7. DESIGN & CREATIVE (16)
═══════════════════════════════════════════════════════════════════ */

const designTools: DirectoryEntry[] = [
  { name: "Figma", description: "Collaborative interface design tool. Components, auto layout, prototyping, Dev Mode, and FigJam whiteboarding.", category: "design", badges: ["Web", "Freemium", "Popular"], url: "https://figma.com" },
  { name: "Penpot", description: "Open-source design and prototyping platform. Figma alternative that runs in the browser. SVG-native.", category: "design", stars: "34.5k", badges: ["Web", "Open Source"], github: "https://github.com/penpot/penpot", url: "https://penpot.app" },
  { name: "Excalidraw", description: "Virtual whiteboard with a hand-drawn feel. Real-time collaboration, libraries, and embeddable components.", category: "design", stars: "87.5k", badges: ["Web", "Open Source", "Popular"], github: "https://github.com/excalidraw/excalidraw", url: "https://excalidraw.com" },
  { name: "tldraw", description: "Collaborative digital whiteboard. Infinite canvas, real-time multiplayer, and React component.", category: "design", stars: "37.8k", badges: ["Web", "Open Source"], github: "https://github.com/tldraw/tldraw", url: "https://tldraw.com" },
  { name: "GIMP", description: "GNU Image Manipulation Program. Professional photo editing, retouching, composition, and graphic design.", category: "design", stars: "N/A", badges: ["Cross-platform", "Open Source"], url: "https://gimp.org" },
  { name: "Inkscape", description: "Professional vector graphics editor. SVG native, path operations, text tools, and plugin support.", category: "design", stars: "N/A", badges: ["Cross-platform", "Open Source"], url: "https://inkscape.org" },
  { name: "Blender", description: "Complete 3D creation suite. Modeling, sculpting, animation, VFX, rendering, and video editing. Industry standard.", category: "design", stars: "N/A", badges: ["Cross-platform", "Open Source", "Popular"], url: "https://blender.org" },
  { name: "DaVinci Resolve", description: "Professional video editing, color grading, VFX, and audio post-production. Hollywood-grade tools, free edition.", category: "design", badges: ["Cross-platform", "Free"], url: "https://blackmagicdesign.com/products/davinciresolve" },
  { name: "OBS Studio", description: "Free live streaming and screen recording. Scenes, sources, audio mixing, and plugin ecosystem.", category: "design", stars: "61.5k", badges: ["Cross-platform", "Open Source", "Popular"], github: "https://github.com/obsproject/obs-studio", url: "https://obsproject.com" },
  { name: "Kdenlive", description: "Open-source video editor. Multi-track, effects, transitions, keyframes, and titling. Non-destructive editing.", category: "design", stars: "N/A", badges: ["Cross-platform", "Open Source"], url: "https://kdenlive.org" },
  { name: "Krita", description: "Professional digital painting application. Brushes, layers, filters, and animation. Made by artists for artists.", category: "design", stars: "N/A", badges: ["Cross-platform", "Open Source"], url: "https://krita.org" },
  { name: "Photopea", description: "Free online photo editor. Photoshop-compatible PSD, Sketch, and XD support. Runs entirely in the browser.", category: "design", badges: ["Web", "Free"], url: "https://photopea.com" },
  { name: "Pixlr", description: "AI-powered online photo editor. Remove backgrounds, retouch, filters, and templates. Free tier available.", category: "design", badges: ["Web", "Freemium"], url: "https://pixlr.com" },
  { name: "Rive", description: "Interactive animations and motion design for the web and apps. State machines, runtime, and React components.", category: "design", badges: ["Web", "Freemium"], url: "https://rive.app" },
  { name: "Spline", description: "3D design tool for the web. Build interactive 3D scenes, animations, and export to React, Three.js, or video.", category: "design", badges: ["Web", "Freemium"], url: "https://spline.design" },
  { name: "Motionity", description: "Open-source web-based motion graphics editor. After Effects alternative running in the browser.", category: "design", stars: "3.2k", badges: ["Web", "Open Source"], github: "https://github.com/nicholasaakira/motionity" },
]

/* ═══════════════════════════════════════════════════════════════════
   DATA: 8. INFRASTRUCTURE (17)
═══════════════════════════════════════════════════════════════════ */

const infrastructure: DirectoryEntry[] = [
  { name: "Docker", description: "Container platform for building, sharing, and running applications. Compose for multi-container orchestration.", category: "infra", stars: "N/A", badges: ["Cross-platform", "Open Source", "Popular"], url: "https://docker.com" },
  { name: "Kubernetes", description: "Container orchestration at scale. Auto-scaling, self-healing, service discovery, and rolling updates.", category: "infra", stars: "112k", badges: ["Cross-platform", "Open Source", "Go", "Popular"], github: "https://github.com/kubernetes/kubernetes", url: "https://kubernetes.io" },
  { name: "Terraform", description: "Infrastructure as Code. Provision and manage cloud resources across any provider with declarative config.", category: "infra", stars: "43.5k", badges: ["Cross-platform", "Open Source", "Go"], github: "https://github.com/hashicorp/terraform", url: "https://terraform.io" },
  { name: "Coolify", description: "Open-source Heroku/Netlify/Vercel alternative. Self-host anything with automatic SSL, CI/CD, and monitoring.", category: "infra", stars: "35.8k", badges: ["Open Source", "Popular"], github: "https://github.com/coollabsio/coolify", url: "https://coolify.io" },
  { name: "Dokku", description: "Docker-powered mini-Heroku. Git push to deploy. Smallest PaaS implementation. Plugin ecosystem.", category: "infra", stars: "29.2k", badges: ["Open Source"], github: "https://github.com/dokku/dokku", url: "https://dokku.com" },
  { name: "CapRover", description: "Free and open-source PaaS. One-click apps, automatic HTTPS, Docker Swarm, and web dashboard.", category: "infra", stars: "13.5k", badges: ["Open Source"], github: "https://github.com/caprover/caprover", url: "https://caprover.com" },
  { name: "Portainer", description: "Container management UI. Manage Docker, Swarm, and Kubernetes with a beautiful web interface.", category: "infra", stars: "31.5k", badges: ["Open Source"], github: "https://github.com/portainer/portainer", url: "https://portainer.io" },
  { name: "Traefik", description: "Cloud-native reverse proxy and load balancer. Auto-discovers services, automatic HTTPS, and middleware.", category: "infra", stars: "52.5k", badges: ["Open Source", "Go"], github: "https://github.com/traefik/traefik", url: "https://traefik.io" },
  { name: "Nginx", description: "High-performance web server and reverse proxy. Load balancing, caching, SSL termination, and rate limiting.", category: "infra", stars: "25.8k", badges: ["Open Source", "Popular"], github: "https://github.com/nginx/nginx", url: "https://nginx.org" },
  { name: "Caddy", description: "Fast, multi-platform web server with automatic HTTPS. Zero-config TLS, HTTP/3, and extensible modules.", category: "infra", stars: "60.5k", badges: ["Open Source", "Go"], github: "https://github.com/caddyserver/caddy", url: "https://caddyserver.com" },
  { name: "Supabase", description: "Open-source Firebase alternative. PostgreSQL, auth, storage, edge functions, and real-time subscriptions.", category: "infra", stars: "75.5k", badges: ["Open Source", "TypeScript", "Popular"], github: "https://github.com/supabase/supabase", url: "https://supabase.com" },
  { name: "Appwrite", description: "Open-source backend platform. Auth, databases, storage, functions, messaging, and real-time. Multi-runtime.", category: "infra", stars: "46.8k", badges: ["Open Source"], github: "https://github.com/appwrite/appwrite", url: "https://appwrite.io" },
  { name: "PocketBase", description: "Open-source backend in a single file. Auth, real-time database, file storage, and admin dashboard. Written in Go.", category: "infra", stars: "42.5k", badges: ["Open Source", "Go"], github: "https://github.com/pocketbase/pocketbase", url: "https://pocketbase.io" },
  { name: "Directus", description: "Open-source data platform. Instant REST and GraphQL APIs for any SQL database. Admin app included.", category: "infra", stars: "28.5k", badges: ["Open Source", "TypeScript"], github: "https://github.com/directus/directus", url: "https://directus.io" },
  { name: "Strapi", description: "Leading open-source headless CMS. Content types builder, API generation, media library, and admin panel.", category: "infra", stars: "65.2k", badges: ["Open Source", "JavaScript", "Popular"], github: "https://github.com/strapi/strapi", url: "https://strapi.io" },
  { name: "MinIO", description: "High-performance S3-compatible object storage. Kubernetes-native, encryption, and distributed deployment.", category: "infra", stars: "49.5k", badges: ["Open Source", "Go"], github: "https://github.com/minio/minio", url: "https://min.io" },
  { name: "Vault", description: "Secret management and data protection. Dynamic secrets, encryption as a service, and identity-based access.", category: "infra", stars: "31.5k", badges: ["Open Source", "Go"], github: "https://github.com/hashicorp/vault", url: "https://vaultproject.io" },
]

/* ═══════════════════════════════════════════════════════════════════
   DATA: 9. INTEGRATIONS & APIS (17)
═══════════════════════════════════════════════════════════════════ */

const integrations: DirectoryEntry[] = [
  { name: "Stripe", description: "Payment processing infrastructure. Subscriptions, invoicing, Connect, Terminal, and financial reporting. Free to start, pay-per-transaction.", category: "integrations", badges: ["Cloud", "Popular"], url: "https://stripe.com" },
  { name: "Resend", description: "Email API for developers. Beautiful templates, React Email components, and analytics. 3,000 free emails/month.", category: "integrations", badges: ["Cloud", "Free"], url: "https://resend.com" },
  { name: "SendGrid", description: "Email delivery and marketing platform. Transactional and marketing emails, templates. 100 free emails/day.", category: "integrations", badges: ["Cloud", "Free"], url: "https://sendgrid.com" },
  { name: "Twilio", description: "Communication APIs. SMS, voice, video, WhatsApp, and email. Pay-as-you-go pricing with free trial credits.", category: "integrations", badges: ["Cloud", "Freemium"], url: "https://twilio.com" },
  { name: "Cloudflare", description: "Web infrastructure and security. CDN, DNS, DDoS protection, Workers, R2, D1, and Pages. Generous free tier.", category: "integrations", badges: ["Cloud", "Free", "Popular"], url: "https://cloudflare.com" },
  { name: "Vercel", description: "Frontend deployment platform. Git-based deploys, edge functions, analytics, and framework support. Hobby plan free.", category: "integrations", badges: ["Cloud", "Free", "Popular"], url: "https://vercel.com" },
  { name: "Netlify", description: "Web platform for modern development. Deploy, serverless functions, forms, and identity. 100GB bandwidth free.", category: "integrations", badges: ["Cloud", "Free"], url: "https://netlify.com" },
  { name: "Railway", description: "Infrastructure platform for deploying apps. PostgreSQL, Redis, cron jobs, and private networking. $5 free credit/month.", category: "integrations", badges: ["Cloud", "Freemium"], url: "https://railway.app" },
  { name: "Render", description: "Cloud platform for apps and databases. Auto-deploy from Git, managed PostgreSQL, Redis. Free tier for static sites.", category: "integrations", badges: ["Cloud", "Freemium"], url: "https://render.com" },
  { name: "Fly.io", description: "Deploy apps close to users globally. Edge compute, volumes, Postgres, and Redis. Free allowances included.", category: "integrations", badges: ["Cloud", "Freemium"], url: "https://fly.io" },
  { name: "Upstash", description: "Serverless Redis, Kafka, and QStash. Pay-per-request pricing. 10K commands/day free for Redis.", category: "integrations", badges: ["Cloud", "Free"], url: "https://upstash.com" },
  { name: "Neon", description: "Serverless PostgreSQL. Branching, auto-scaling, and bottomless storage. 0.5GB free, 3GB on paid plan.", category: "integrations", badges: ["Cloud", "Free"], url: "https://neon.tech" },
  { name: "Turso", description: "Edge-hosted SQLite database. Multi-region replication, embedded sync, and branching. 9GB free storage.", category: "integrations", badges: ["Cloud", "Free"], url: "https://turso.tech" },
  { name: "Clerk", description: "Complete user management. Authentication, organizations, user profiles, and multi-factor. 10K MAUs free.", category: "integrations", badges: ["Cloud", "Free", "Popular"], url: "https://clerk.com" },
  { name: "Auth0", description: "Identity platform. Universal login, SSO, MFA, and social connections. 25K MAUs free.", category: "integrations", badges: ["Cloud", "Free"], url: "https://auth0.com" },
  { name: "Inngest", description: "Event-driven serverless functions. Durable execution, retries, cron, and fan-out. 50K events free.", category: "integrations", badges: ["Cloud", "Free"], url: "https://inngest.com" },
  { name: "Trigger.dev", description: "Background jobs for full-stack apps. Long-running tasks, retries, scheduling, and real-time logs. Open-source.", category: "integrations", stars: "10.1k", badges: ["Cloud", "Open Source", "Free"], github: "https://github.com/triggerdotdev/trigger.dev", url: "https://trigger.dev" },
]

/* ═══════════════════════════════════════════════════════════════════
   DATA: 10. CLAUDE CODE SKILLS (22)
═══════════════════════════════════════════════════════════════════ */

const claudeSkills: DirectoryEntry[] = [
  { name: "Website Builder", description: "Build a complete landing page from a text description. Generates responsive HTML with modern design and dark themes.", category: "skills", badges: ["CLI"], slashCmd: "/website-builder" },
  { name: "Lead Scraper", description: "Scrape potential business leads from the web. Extract company names, contacts, emails, and social profiles.", category: "skills", badges: ["CLI"], slashCmd: "/lead-scraper" },
  { name: "Invoice Creator", description: "Generate professional HTML invoices with Nine Ruby branding. Auto-calculates totals, taxes, and line items.", category: "skills", badges: ["CLI"], slashCmd: "/invoice-creator" },
  { name: "Proposal Generator", description: "Generate professional project proposals. Scope, timeline, pricing, and terms formatted as polished documents.", category: "skills", badges: ["CLI"], slashCmd: "/proposal-generator" },
  { name: "SEO Auditor", description: "Audit any website for SEO. Analyzes meta tags, headings, page speed, mobile-friendliness, and content quality.", category: "skills", badges: ["CLI"], slashCmd: "/seo-auditor" },
  { name: "YouTube to System", description: "Convert any YouTube video into a fully buildable system. Extracts knowledge and creates implementation plans.", category: "skills", badges: ["CLI"], slashCmd: "/youtube-to-system" },
  { name: "Market Audit", description: "Full market analysis: competitors, SEO landscape, content gaps, conversion optimization, and strategic recommendations.", category: "skills", badges: ["CLI"], slashCmd: "/market-audit" },
  { name: "GEO Audit", description: "Generative Engine Optimization audit. Analyze citability, authority signals, content structure, and AI visibility.", category: "skills", badges: ["CLI"], slashCmd: "/geo-audit" },
  { name: "Morning Brief", description: "Daily briefing with calendar, emails, tasks, weather, and market updates. Delivered as a concise executive summary.", category: "skills", badges: ["CLI"], slashCmd: "/morning-brief" },
  { name: "Email Triage", description: "AI-powered email triage. Categorize, prioritize, and draft responses for your inbox automatically.", category: "skills", badges: ["CLI"], slashCmd: "/email-triage" },
  { name: "Presentation Builder", description: "Generate professional slide decks from a topic. PPTX output with custom themes, layouts, and speaker notes.", category: "skills", badges: ["CLI"], slashCmd: "/presentation-builder" },
  { name: "Analytics Dashboard", description: "Build interactive analytics dashboards from data. Charts, KPIs, filters, and export functionality.", category: "skills", badges: ["CLI"], slashCmd: "/analytics-dashboard" },
  { name: "Frontend Design", description: "Create production-grade frontend interfaces. Landing pages, dashboards, and apps with high design quality.", category: "skills", badges: ["CLI"], slashCmd: "/frontend-design" },
  { name: "Canvas Design", description: "Create visual art as PNG and PDF. Posters, infographics, social cards, and branded materials.", category: "skills", badges: ["CLI"], slashCmd: "/canvas-design" },
  { name: "PDF Tools", description: "Read, create, merge, split, watermark, and manipulate PDF files. Full PDF toolkit in one skill.", category: "skills", badges: ["CLI"], slashCmd: "/pdf" },
  { name: "DOCX Tools", description: "Create and edit Word documents. Tables, headers, formatting, and professional document layouts.", category: "skills", badges: ["CLI"], slashCmd: "/docx" },
  { name: "XLSX Tools", description: "Create and edit Excel spreadsheets. Formulas, charts, formatting, and data analysis.", category: "skills", badges: ["CLI"], slashCmd: "/xlsx" },
  { name: "PPTX Tools", description: "Create and edit PowerPoint presentations. Slides, themes, animations, and speaker notes.", category: "skills", badges: ["CLI"], slashCmd: "/pptx" },
  { name: "Algorithmic Art", description: "Generate algorithmic art with p5.js. Flow fields, particle systems, fractals, and interactive parameter exploration.", category: "skills", badges: ["CLI"], slashCmd: "/algorithmic-art" },
  { name: "MCP Builder", description: "Guide for creating MCP servers. Build integrations for external APIs with Python FastMCP or TypeScript.", category: "skills", badges: ["CLI"], slashCmd: "/mcp-builder" },
  { name: "Skill Creator", description: "Create new Claude Code skills. Modify, test, and benchmark existing skills. Full skill development lifecycle.", category: "skills", badges: ["CLI"], slashCmd: "/skill-creator" },
  { name: "Fetch Design", description: "Clone any website design pixel-perfect. Captures images, fonts, CSS, layout, and spacing from any URL.", category: "skills", badges: ["CLI"], slashCmd: "/fetch-design" },
]

/* ═══════════════════════════════════════════════════════════════════
   ALL ENTRIES COMBINED
═══════════════════════════════════════════════════════════════════ */

const allEntries: DirectoryEntry[] = [
  ...websiteTemplates,
  ...aiTools,
  ...mcpServers,
  ...devTools,
  ...frameworks,
  ...agentFrameworks,
  ...designTools,
  ...infrastructure,
  ...integrations,
  ...claudeSkills,
]

/* ═══════════════════════════════════════════════════════════════════
   BADGE STYLES — Vercel monochrome with subtle differentiation
═══════════════════════════════════════════════════════════════════ */

function badgeStyle(badge: Badge): string {
  const map: Record<string, string> = {
    "Popular": "bg-white/[0.08] text-[#1A1A1A] border-black/[0.15]",
    "New": "bg-white/[0.08] text-[#1A1A1A] border-black/[0.15]",
    "Open Source": "bg-black/[0.03] text-[#7A7A72] border-black/[0.08]",
    "Free": "bg-black/[0.03] text-[#7A7A72] border-black/[0.08]",
    "Freemium": "bg-black/[0.03] text-[#7A7A72] border-black/[0.08]",
    "Local": "bg-black/[0.03] text-[#7A7A72] border-black/[0.08]",
    "Cloud": "bg-black/[0.03] text-[#7A7A72] border-black/[0.08]",
    "Both": "bg-black/[0.03] text-[#7A7A72] border-black/[0.08]",
    "CLI": "bg-black/[0.03] text-[#7A7A72] border-black/[0.08]",
    "GUI": "bg-black/[0.03] text-[#7A7A72] border-black/[0.08]",
    "Web": "bg-black/[0.03] text-[#7A7A72] border-black/[0.08]",
    "macOS": "bg-black/[0.03] text-[#7A7A72] border-black/[0.04]",
    "Windows": "bg-black/[0.03] text-[#7A7A72] border-black/[0.04]",
    "Linux": "bg-black/[0.03] text-[#7A7A72] border-black/[0.04]",
    "Cross-platform": "bg-black/[0.03] text-[#7A7A72] border-black/[0.04]",
    "Python": "bg-black/[0.03] text-[#7A7A72] border-black/[0.04]",
    "TypeScript": "bg-black/[0.03] text-[#7A7A72] border-black/[0.04]",
    "JavaScript": "bg-black/[0.03] text-[#7A7A72] border-black/[0.04]",
    "Go": "bg-black/[0.03] text-[#7A7A72] border-black/[0.04]",
    "Rust": "bg-black/[0.03] text-[#7A7A72] border-black/[0.04]",
    "C++": "bg-black/[0.03] text-[#7A7A72] border-black/[0.04]",
    "CSS": "bg-black/[0.03] text-[#7A7A72] border-black/[0.04]",
  }
  return map[badge] || "bg-black/[0.03] text-[#7A7A72] border-black/[0.04]"
}

/* ═══════════════════════════════════════════════════════════════════
   COPY TO CLIPBOARD
═══════════════════════════════════════════════════════════════════ */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-xs text-[#B8B8B0] hover:text-[#7A7A72] transition-colors shrink-0"
      title="Copy install command"
    >
      {copied ? <Check size={12} className="text-[#1A1A1A]/80" /> : <Copy size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   CARD COMPONENT — Vercel style
═══════════════════════════════════════════════════════════════════ */

function DirectoryCard({ entry }: { entry: DirectoryEntry }) {
  return (
    <div className="group relative rounded-2xl border border-black/[0.04] bg-white/[0.02] p-6 transition-all duration-300 hover:border-black/[0.12] hover:bg-white">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-[15px] font-semibold tracking-tight text-white group-hover:text-white transition-colors leading-tight">
          {entry.name}
        </h3>
        {entry.stars && (
          <div className="flex items-center gap-1 text-xs font-mono text-[#B8B8B0] shrink-0 mt-0.5">
            <Star size={11} className="text-[#B8B8B0]" />
            {entry.stars}
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-[13px] text-[#7A7A72] leading-relaxed mb-4 line-clamp-3">
        {entry.description}
      </p>

      {/* Install command */}
      {entry.installCmd && (
        <div className="mb-4 flex items-center gap-2 bg-[#1A1A1A] border border-black/[0.04] rounded-lg px-3 py-2">
          <code className="text-[11px] text-[#7A7A72] font-mono truncate flex-1">{entry.installCmd}</code>
          <CopyButton text={entry.installCmd} />
        </div>
      )}

      {/* Slash command */}
      {entry.slashCmd && (
        <div className="mb-4 inline-flex items-center gap-2 bg-[#1A1A1A] border border-black/[0.04] rounded-lg px-3 py-1.5">
          <TerminalIcon size={11} className="text-[#B8B8B0]" />
          <code className="text-[11px] text-[#7A7A72] font-mono">{entry.slashCmd}</code>
        </div>
      )}

      {/* Badges */}
      {entry.badges && entry.badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {entry.badges.map((badge) => (
            <span key={badge} className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${badgeStyle(badge)}`}>
              {badge}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-white/[0.04]">
        {entry.url && (
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7A7A72] hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-black/[0.04] hover:border-black/[0.12] px-3 py-1.5 rounded-full transition-all"
          >
            <ExternalLink size={11} /> Visit
          </a>
        )}
        {entry.github && (
          <a
            href={entry.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7A7A72] hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-black/[0.04] hover:border-black/[0.12] px-3 py-1.5 rounded-full transition-all"
          >
            <GitFork size={11} /> Source
          </a>
        )}
        {!entry.url && !entry.github && entry.slashCmd && (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#B8B8B0] bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 rounded-full">
            <Zap size={11} /> Built-in
          </span>
        )}

        <span className="ml-auto font-mono text-[10px] text-[#B8B8B0]">9ruby</span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════════ */

export default function DirectoryPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const filtered = useMemo(() => {
    let results = activeCategory === "all"
      ? allEntries
      : allEntries.filter((e) => e.category === activeCategory)

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      results = results.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.badges?.some((b) => b.toLowerCase().includes(q))
      )
    }
    return results
  }, [activeCategory, searchQuery])

  const totalCount = allEntries.length
  const activeCategoryLabel = categories.find((c) => c.id === activeCategory)?.label || "All"

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: "#000" }}>
      <Navbar />
      <Breadcrumb items={[{ label: "Directory" }]} />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-36 pb-16 px-6 lg:px-8">
        <div className="relative z-10 max-w-[1400px] mx-auto">
          {/* Tagline */}
          <p className="font-mono text-sm text-[#7A7A72] mb-6 tracking-wide">
            Open-Source Directory
          </p>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans tracking-tighter leading-[0.95] mb-6" style={{ color: "#fff" }}>
            The 9Ruby
            <br />
            <span style={{ color: "rgba(255,255,255,0.5)" }}>Directory</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-[#7A7A72] leading-relaxed max-w-2xl mb-10">
            Every tool. Every template. Every integration. All free.
            <br />
            <span className="text-[#B8B8B0]">The most comprehensive open-source directory, curated and rebranded under 9Ruby.</span>
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="inline-flex items-center gap-2 bg-black/[0.03] border border-black/[0.08] text-[#1A1A1A]/80 px-5 py-2.5 rounded-full text-sm font-mono">
              <Package size={14} className="text-[#7A7A72]" />
              {totalCount} tools
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-[#B8B8B0] font-mono">
              <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
              Updated weekly
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-[#B8B8B0] font-mono">
              {categories.length - 1} categories
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SEARCH + FILTERS ═══ */}
      <section className="sticky top-20 z-40 bg-[#F8F7F4]/80 backdrop-blur-xl border-y border-black/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search bar */}
            <div className="relative flex-1 max-w-lg">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8B8B0]" />
              <input
                type="text"
                placeholder="Search tools, templates, frameworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.02] border border-black/[0.08] rounded-full pl-11 pr-10 py-2.5 text-sm text-white placeholder-[#B8B8B0] focus:outline-none focus:border-black/[0.15] focus:bg-black/[0.03] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B8B8B0] hover:text-[#7A7A72] transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden inline-flex items-center gap-2 text-sm text-[#7A7A72] bg-white/[0.02] border border-black/[0.08] px-4 py-2.5 rounded-full"
            >
              <Filter size={14} />
              {activeCategoryLabel}
              <ChevronDown size={14} className={`transition-transform ${showMobileFilters ? "rotate-180" : ""}`} />
            </button>

            {/* Desktop category pills */}
            <div className="hidden lg:flex items-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full border transition-all duration-200 ${
                    activeCategory === cat.id
                      ? "bg-white/[0.08] border-black/[0.15] text-[#1A1A1A]"
                      : "bg-transparent border-black/[0.08] text-[#7A7A72] hover:text-[#1A1A1A]/80 hover:border-black/[0.12]"
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile filter pills */}
          {showMobileFilters && (
            <div className="lg:hidden flex flex-wrap gap-2 pt-3 mt-3 border-t border-black/[0.04]">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    setShowMobileFilters(false)
                  }}
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full border transition-all duration-200 ${
                    activeCategory === cat.id
                      ? "bg-white/[0.08] border-black/[0.15] text-[#1A1A1A]"
                      : "bg-transparent border-black/[0.08] text-[#7A7A72] hover:text-[#1A1A1A]/80"
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ RESULTS COUNT ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#B8B8B0] font-mono">
            Showing <span className="text-[#7A7A72]">{filtered.length}</span> of {totalCount}
            {activeCategory !== "all" && (
              <span> in <span className="text-[#7A7A72]">{activeCategoryLabel}</span></span>
            )}
            {searchQuery && (
              <span> matching &ldquo;<span className="text-[#7A7A72]">{searchQuery}</span>&rdquo;</span>
            )}
          </p>
        </div>
      </section>

      {/* ═══ DIRECTORY GRID ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-8 pb-24">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((entry) => (
              <DirectoryCard key={`${entry.category}-${entry.name}`} entry={entry} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-6">
              <Search size={24} className="text-[#B8B8B0]" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-[#1A1A1A]/80 mb-2">No tools found</h3>
            <p className="text-sm text-[#7A7A72] max-w-sm">
              Try a different search term or category. The directory is growing every week.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("all") }}
              className="mt-6 inline-flex items-center gap-2 text-sm text-[#7A7A72] hover:text-white transition-colors"
            >
              <ArrowRight size={14} className="rotate-180" /> Clear filters
            </button>
          </div>
        )}
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="border-t border-black/[0.04] py-24 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter mb-4 text-[#1A1A1A]">
            Missing a tool?
          </h2>
          <p className="text-lg text-[#7A7A72] mb-10 max-w-lg mx-auto">
            The 9Ruby Directory is community-powered. Suggest a tool, template, or integration to add.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/niceruby/9ruby-directory/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-7 rounded-full bg-[#1A1A1A] text-[#F8F7F4] text-sm font-medium inline-flex items-center gap-2 hover:bg-[#333] transition-colors duration-200"
            >
              <GitFork size={15} /> Suggest a Tool
            </a>
            <Link
              href="/ecosystem"
              className="h-11 px-7 rounded-full text-[#1A1A1A]/80 text-sm font-medium inline-flex items-center gap-2 border border-black/[0.08] hover:border-black/[0.15] bg-white/[0.02] hover:bg-black/[0.03] transition-all duration-200"
            >
              Explore Ecosystem <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
