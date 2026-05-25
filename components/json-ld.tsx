import { siteConfig } from "@/config/site"

interface JsonLdProps {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/android-chrome-512x512.png`,
        description: siteConfig.description,
        foundingDate: "2024-01-01",
        areaServed: "Global",
        sameAs: [
          siteConfig.links.twitter,
          siteConfig.links.github,
          siteConfig.links.telegram,
        ],
        knowsAbout: [
          "AI API Gateway",
          "OpenAI Compatible API",
          "Large Language Models",
          "Claude Code",
          "Cursor",
          "Cline",
          "Model Routing"
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "support@supastore.cc",
          availableLanguage: ["Chinese", "English", "Japanese"],
        },
      }}
    />
  )
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: "zh-CN",
      }}
    />
  )
}

interface FAQItem {
  question: string
  answer: string
}

export function FAQPageJsonLd({ faqs }: { faqs: FAQItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  )
}

interface BlogPostJsonLdProps {
  title: string
  description?: string
  datePublished: string
  dateModified?: string
  image?: string
  authorName: string
  url: string
}

export function BlogPostJsonLd({
  title,
  description,
  datePublished,
  dateModified,
  image,
  authorName,
  url,
}: BlogPostJsonLdProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description: description,
        datePublished,
        dateModified: dateModified || datePublished,
        image: image ? `${siteConfig.url}${image}` : undefined,
        author: {
          "@type": "Person",
          name: authorName,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          logo: {
            "@type": "ImageObject",
            url: `${siteConfig.url}/android-chrome-512x512.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", ".prose p:first-of-type"]
        }
      }}
    />
  )
}

interface BreadcrumbItem {
  name: string
  href: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${siteConfig.url}${item.href}`,
        })),
      }}
    />
  )
}

export function SoftwareApplicationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        description: siteConfig.description,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Windows, macOS, iOS, Android",
        offers: {
          "@type": "Offer",
          price: "15.00",
          priceCurrency: "CNY"
        },
        featureList: [
          "IPLC/IEPL 专线网络",
          "流媒体平台解锁",
          "ChatGPT/AI 服务解锁",
          "多端设备支持",
          "安全隐私保护"
        ]
      }}
    />
  )
}
