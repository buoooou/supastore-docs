
import { siteConfig } from "@/config/site"
import { marketingConfig } from "@/config/marketing"
import { docsConfig } from "@/config/docs"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { SiteFooter } from "@/components/site-footer"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background dot-grid">
      <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-6">
          <MainNav items={marketingConfig.mainNav} />
          <MobileNav mainNav={marketingConfig.mainNav} sidebarNav={docsConfig.sidebarNav} />
        </div>
      </header>
      <main className="flex-1 pt-20">{children}</main>
      <SiteFooter />
    </div>
  )
}
