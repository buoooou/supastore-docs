import { MainNavItem, SidebarNavItem } from "types/nav";

export interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "文档首页",
      href: "/docs",
      items: [],
    },
    {
      title: "客户端下载",
      href: "/download",
      items: [],
    },
    {
      title: "充值中心",
      href: "https://supastore.cc/console/topup",
      items: [],
    },
    {
      title: "控制台",
      href: "https://supastore.cc/console",
      items: [],
    },
    {
      title: "邀请返佣",
      href: "https://supastore.cc/console/topup",
      items: [],
    },
  ],
  sidebarNav: [
    {
      title: "开始使用",
      items: [
        {
          title: "快速开始",
          href: "/docs",
          items: [],
        },
        {
          title: "API 兼容性与模型",
          href: "/docs/api-compatibility",
          items: [],
        },
      ],
    },
    {
      title: "开发工具接入",
      items: [
        {
          title: "Cursor 编辑器",
          href: "/docs/cursor",
          items: [],
        },
        {
          title: "Claude Code 终端",
          href: "/docs/claude-code",
          items: [],
        },
        {
          title: "Cline / Roo Code 插件",
          href: "/docs/cline-roo-code",
          items: [],
        },
      ],
    },
    {
      title: "其他客户端 & 接入方式",
      items: [
        {
          title: "Web UI (NextChat / LobeChat)",
          href: "/docs/web-ui",
          items: [],
        },
        {
          title: "SDK 接入示例",
          href: "/docs/sdk-integration",
          items: [],
        },
      ],
    },
    {
      title: "账户与运营",
      items: [
        {
          title: "返佣计划与奖励",
          href: "/docs/affiliate",
          items: [],
        },
      ],
    },
  ],
}