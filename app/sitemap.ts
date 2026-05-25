import { MetadataRoute } from "next"
import { allDocs } from "@/.content-collections/generated"
import { siteConfig } from "@/config/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = siteConfig.url.replace(/\/$/, "")
  const docs = allDocs || []

  // Static root route
  const staticRoutes = [
    { route: "/", priority: 1.0 },
  ]

  // Map of all documentation pages dynamically
  const dynamicRoutes = docs.map((doc) => {
    const routePath = doc.slugAsParams ? `/${doc.slugAsParams}` : ""
    return {
      url: `${domain}${routePath}`,
      lastModified: doc.date ?? new Date("2026-05-25"),
      changeFrequency: "weekly" as const,
      priority: doc.slugAsParams ? 0.8 : 1.0,
    }
  })

  // Dedup routes by URL to avoid duplicates (e.g. root "/" and slugAsParams === "")
  const routeMap = new Map<string, any>()
  
  staticRoutes.forEach((item) => {
    routeMap.set(`${domain}${item.route}`, {
      url: `${domain}${item.route}`,
      lastModified: new Date("2026-05-25"),
      changeFrequency: "weekly" as const,
      priority: item.priority,
    })
  })

  dynamicRoutes.forEach((item) => {
    if (!routeMap.has(item.url)) {
      routeMap.set(item.url, item)
    }
  })

  return Array.from(routeMap.values())
}
