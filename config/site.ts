import { SiteConfig } from "types"

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://docs.supastore.cc"

export const siteConfig: SiteConfig = {
  name: "SupaStore",
  description:
    "为 AI Agent 提供自主的经济网络、智能路由与原生基础设施。让智能体不仅能思考，更能自主协作与价值交换。",
  url: siteUrl,
  ogImage: `${siteUrl}/og.png`,
  telegramBot: "https://t.me/supaboard_vpn_bot",
  links: {
    twitter: "https://x.com/intent/follow?screen_name=Supaboard00",
    github: "https://github.com/buoooou/v2ray-clash-clients-download",
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
