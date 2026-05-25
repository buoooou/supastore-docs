import { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Tier 1 AI Crawlers (Search & Assistant Visibility)
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot"],
        allow: "/",
      },
      // Tier 2 AI Ecosystem
      {
        userAgent: ["Google-Extended", "GoogleOther", "Applebot-Extended", "Amazonbot", "FacebookBot"],
        allow: "/",
      },
      // Aggressive/Low-value training crawlers
      {
        userAgent: ["Bytespider", "CCBot"],
        disallow: "/",
      }
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
