"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MainNavItem } from "types/nav"

import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  const pathname = usePathname()
  const apiPaths = docsConfig.apiSidebar.flatMap((group) =>
    group.items.map((item) => item.href).filter(Boolean)
  )

  const isPoliciesActive = ["/terms", "/privacy", "/refund", "/aup", "/dmca", "/license"].includes(pathname || "")
  const isApiActive = apiPaths.includes(pathname || "") || pathname === "/api"
  const isGuidesActive = !isPoliciesActive && !isApiActive

  const getActiveState = (href: string) => {
    if (href === "/") return isGuidesActive
    if (href === "/api-reference") return isApiActive
    if (href === "/terms") return isPoliciesActive
    return pathname === href
  }

  return (
    <div className="flex gap-6 font-heading">
      <Link href="/" className="hidden items-center space-x-2 lg:flex font-bold mr-4">
        <Icons.logo className="size-6 text-[#5334F5]" />
        <span>{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="hidden lg:flex items-center gap-1">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "relative flex h-14 items-center justify-center px-2 text-sm font-medium transition-colors hover:text-foreground",
                getActiveState(item.href)
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
              {getActiveState(item.href) && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#5334F5]" />
              )}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  )
}
