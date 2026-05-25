import type { Icon } from "lucide-react";

import { Icons } from "@/components/icons";

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  registerUrl: string
  registerDomains?: string[]
  telegramBot: string
  links: {
    twitter: string
    github: string
    tiktok: string
    ins: string
    thread: string
    discard: string
    telegram: string
  }
}

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}
