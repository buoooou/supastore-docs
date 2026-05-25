import { docsConfig } from "@/config/docs"
import { CommandMenu } from "@/components/command-menu"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { DocsSidebarNav } from "@/components/sidebar-nav"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default async function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <MainNav items={docsConfig.mainNav}>
            <DocsSidebarNav config={docsConfig} />
          </MainNav>
          <MobileNav
            mainNav={docsConfig.mainNav}
            sidebarNav={docsConfig.sidebarNav}
          />
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu />
            </div>
            <ModeToggle />
          </div>
        </div>
      </header>
      <div className="flex-1 border-b">
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
            <ScrollArea className="h-full py-6 pr-6 lg:py-8">
              <DocsSidebarNav config={docsConfig} />
            </ScrollArea>
          </aside>
          {children}
        </div>
      </div>
    </div>
  )
}
