import { MetadataRoute } from "next"
import { allDocs, allPages, allPosts } from "@/.content-collections/generated"
import { siteConfig } from "@/config/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = siteConfig.url.replace(/\/$/, "")
  const docs = allDocs || []
  const pages = allPages || []
  const posts = allPosts || []

  // Static routes with stable last-modified dates
  const staticRoutes: { route: string; priority: number }[] = [
    { route: "/", priority: 1.0 },
    { route: "/download", priority: 0.9 },
    { route: "/docs", priority: 0.8 },
    { route: "/blog", priority: 0.8 },
    { route: "/contact", priority: 0.6 },
    { route: "/changelog", priority: 0.5 },
    { route: "/tokushoho", priority: 0.3 },
  ]

  return [
    ...staticRoutes.map((item) => ({
      url: `${domain}${item.route}`,
      lastModified: new Date("2026-05-03"),
      changeFrequency: "weekly" as const,
      priority: item.priority,
    })),
    ...pages.map((page) => ({
      url: `${domain}${page.slug}`,
      lastModified: new Date("2026-05-01"),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
    ...docs.map((doc) => ({
      url: `${domain}/docs/${doc.slugAsParams}`,
      lastModified: doc.date ?? new Date("2026-05-01"),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...posts.map((post) => ({
      url: `${domain}/blog/${post.slugAsParams}`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
