import { MainNavItem, SidebarNavItem } from "types/nav";

export interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
  guidesSidebar: SidebarNavItem[]
  apiSidebar: SidebarNavItem[]
  policiesSidebar: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "使用指南",
      href: "/",
      items: [],
    },
    {
      title: "API 文档",
      href: "/api-reference",
      items: [],
    },
    {
      title: "条款与协议",
      href: "/terms",
      items: [],
    },
  ],
  sidebarNav: [], // Legacy fallback placeholder
  guidesSidebar: [
    {
      title: "开始使用",
      items: [
        {
          title: "快速开始",
          href: "/",
          items: [],
        },
        {
          title: "API 兼容性与模型",
          href: "/api-compatibility",
          description: "模型协议、Base URL、基础请求测试",
          items: [],
        },
        {
          title: "常见问题与排障",
          href: "/troubleshooting",
          description: "401、402、429、Base URL 与客户端配置问题",
          items: [],
        },
      ],
    },
    {
      title: "开发工具接入",
      items: [
        {
          title: "Cursor 编辑器",
          href: "/cursor",
          description: "Cursor OpenAI Base URL 与 API Key 配置",
          items: [],
        },
        {
          title: "Claude Code 终端",
          href: "/claude-code",
          description: "Claude Code 安装与 ANTHROPIC_BASE_URL 配置",
          items: [],
        },
        {
          title: "OpenAI Codex CLI",
          href: "/codex-cli",
          description: "OpenAI Codex CLI 安装与接入配置",
          items: [],
        },
        {
          title: "Factory Droid CLI",
          href: "/factory-droid-cli",
          description: "Factory AI 终端代理工具接入",
          items: [],
        },
        {
          title: "Cline / Roo Code 插件",
          href: "/cline-roo-code",
          description: "VS Code Agent 插件 OpenAI Compatible 配置",
          items: [],
        },
        {
          title: "CC Switch 管理工具",
          href: "/cc-switch",
          description: "统一管理 Claude Code / Codex / Gemini CLI 配置",
          items: [],
        },
      ],
    },
    {
      title: "其他客户端 & 接入方式",
      items: [
        {
          title: "Web UI (NextChat / LobeChat)",
          href: "/web-ui",
          description: "NextChat、LobeChat、Cherry Studio 客户端接入",
          items: [],
        },
        {
          title: "更多 AI 应用",
          href: "/other-apps",
          description: "DeepChat、AionUi 等 AI 客户端接入",
          items: [],
        },
        {
          title: "SDK 接入示例",
          href: "/sdk-integration",
          description: "Node.js、Python、环境变量与 OpenAI SDK",
          items: [],
        },
        {
          title: "客户端下载",
          href: "/download",
          items: [],
        },
      ],
    },
    {
      title: "账户与运营",
      items: [
        {
          title: "返佣计划与奖励",
          href: "/affiliate",
          items: [],
        },
      ],
    },
  ],
  apiSidebar: [
    {
      title: "API 指引",
      items: [
        {
          title: "使用概述",
          href: "/api-reference",
          description: "Base URL、Authorization、错误码与最小请求",
          items: [],
        },
        {
          title: "模型与价格",
          href: "/model-pricing",
          description: "模型列表、套餐并发、余额扣费、QPS",
          items: [],
        },
      ],
    },
    {
      title: "AI 模型接口",
      items: [
        {
          title: "聊天 (Chat)",
          href: "/api-chat",
          description: "Chat Completions、stream、Node.js、Python",
          items: [],
        },
        {
          title: "模型列表 (Models)",
          href: "/api-models",
          items: [],
        },
        {
          title: "嵌入 (Embeddings)",
          href: "/api-embeddings",
          items: [],
        },
        {
          title: "重排序 (Rerank)",
          href: "/api-rerank",
          items: [],
        },
        {
          title: "图像 (Images)",
          href: "/api-images",
          items: [],
        },
        {
          title: "音频 (Audio)",
          href: "/api-audio",
          items: [],
        },
        {
          title: "实时语音 (Realtime)",
          href: "/api-realtime",
          items: [],
        },
        {
          title: "视频 (Videos)",
          href: "/api-videos",
          items: [],
        },
        {
          title: "审查 (Moderations)",
          href: "/api-moderations",
          items: [],
        },
        {
          title: "文本补全 (Completions)",
          href: "/api-completions",
          items: [],
        },
      ],
    },
  ],
  policiesSidebar: [
    {
      title: "法律政策与条款",
      items: [
        {
          title: "服务条款 (TOS)",
          href: "/terms",
          items: [],
        },
        {
          title: "隐私政策",
          href: "/privacy",
          items: [],
        },
        {
          title: "退款政策",
          href: "/refund",
          items: [],
        },
        {
          title: "使用守则 (AUP)",
          href: "/aup",
          items: [],
        },
        {
          title: "滥用处理政策 (DMCA)",
          href: "/dmca",
          items: [],
        },
        {
          title: "使用许可",
          href: "/license",
          items: [],
        },
      ],
    },
  ],
}
