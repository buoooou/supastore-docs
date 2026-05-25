"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation"
import { PanelLeft } from "lucide-react"
import { MainNavItem, SidebarNavItem } from "types/nav"

import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"

interface MobileNavProps {
  mainNav?: MainNavItem[]
  sidebarNav?: SidebarNavItem[]
}

export function MobileNav({ }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <PanelLeft />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="px-2">
        <MobileLink
          href="/"
          className="flex items-center px-4 pb-4"
          onOpenChange={setOpen}
        >
          <Icons.logo className="size-6 text-[#5334F5]" />
          <span className="ml-2 font-bold">{siteConfig.name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-6 pr-6">

            {/* 1. Console Action Links */}
            <div className="flex flex-col space-y-2 pb-2">
              <a
                href="https://supastore.cc/console/topup"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="font-heading font-bold text-sm text-[#5334F5] hover:underline"
              >
                充值中心 ↗
              </a>
              <a
                href="https://supastore.cc/console"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="font-heading font-bold text-sm text-[#5334F5] hover:underline"
              >
                控制台 ↗
              </a>
              <a
                href="https://supastore.cc/console/invite"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="font-heading font-bold text-sm text-[#5334F5] hover:underline"
              >
                邀请返佣 ↗
              </a>
            </div>

            {/* 2. 使用指南 */}
            <div className="flex flex-col space-y-2">
              <div className="border-b pb-2 pt-2">
                <span className="font-heading font-bold text-base text-foreground">使用指南</span>
              </div>
              {docsConfig.guidesSidebar.map((section, idx) => (
                <div key={idx} className="flex flex-col space-y-2 pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{section.title}</h4>
                  {section.items?.filter(item => item.href).map((item) => (
                    <MobileLink
                      key={item.href}
                      href={item.href!}
                      onOpenChange={setOpen}
                      className="pl-2 text-sm text-foreground/80 hover:text-foreground font-normal hover:underline"
                    >
                      {item.title}
                    </MobileLink>
                  ))}
                </div>
              ))}
            </div>

            {/* 3. API 文档 */}
            <div className="flex flex-col space-y-2">
              <div className="border-b pb-2 pt-2">
                <span className="font-heading font-bold text-base text-foreground">API 文档</span>
              </div>
              {docsConfig.apiSidebar.map((section, idx) => (
                <div key={idx} className="flex flex-col space-y-2 pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{section.title}</h4>
                  {section.items?.filter(item => item.href).map((item) => (
                    <MobileLink
                      key={item.href}
                      href={item.href!}
                      onOpenChange={setOpen}
                      className="pl-2 text-sm text-foreground/80 hover:text-foreground font-normal hover:underline"
                    >
                      {item.title}
                    </MobileLink>
                  ))}
                </div>
              ))}
            </div>

            {/* 4. 条款与协议 */}
            <div className="flex flex-col space-y-2">
              <div className="border-b pb-2 pt-2">
                <span className="font-heading font-bold text-base text-foreground">条款与协议</span>
              </div>
              {docsConfig.policiesSidebar.map((section, idx) => (
                <div key={idx} className="flex flex-col space-y-2 pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{section.title}</h4>
                  {section.items?.filter(item => item.href).map((item) => (
                    <MobileLink
                      key={item.href}
                      href={item.href!}
                      onOpenChange={setOpen}
                      className="pl-2 text-sm text-foreground/80 hover:text-foreground font-normal hover:underline"
                    >
                      {item.title}
                    </MobileLink>
                  ))}
                </div>
              ))}
            </div>

          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        if (href.toString().startsWith("#")) {
          return
        }
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
