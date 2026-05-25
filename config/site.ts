import { SiteConfig } from "types"

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://docs.supastore.cc"

export const siteConfig: SiteConfig = {
  name: "SupaStore",
  description:
    "SupaStore 提供高可用的大模型 API 中转服务，兼容 OpenAI 标准接口，一键接入 Cursor、Claude Code、Cline 与各类 AI 应用。",
  url: siteUrl,
  ogImage: `${siteUrl}/og.png`,
  telegramBot: "https://t.me/supastore_api_bot",
  links: {
    twitter: "https://x.com/intent/follow?screen_name=SupaStoreAI",
    github: "https://github.com/buoooou/supastore-docs",
    tiktok: "https://www.tiktok.com/@buoooou",
    thread: "https://www.threads.net/@zhangkuo92",
    ins: "https://www.instagram.com/zhangkuo92",
    discard: "https://discord.gg/nNbB7CpSue",
    telegram: "https://t.me/+IXFv_lGI_EUzYWNl",
  },
  registerUrl: "https://supastore.cc/register?aff=Grar",
  registerDomains: [
    "supastore.cc",
  ]
}
