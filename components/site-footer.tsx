import * as React from "react"
import Link from "next/link"
import { DynamicRegisterLink } from "@/components/dynamic-register-link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className, "relative bg-white border-t border-neutral-100 mt-20")}>
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:flex md:items-start md:gap-16 md:px-8 md:py-16">
        <div className="mb-8 md:mb-0 md:w-1/3">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg border border-neutral-200/20 shadow-sm">
              <Icons.logo className="size-5 text-white" />
            </div>
            <span className="text-xl font-heading font-bold tracking-tight uppercase">{siteConfig.name}</span>
          </div>
          <div className="flex flex-col md:flex-row md:px-0">
            <p className="text-xs font-sans font-medium text-left mt-3 opacity-60">
              © 2026 SupaStore.
            </p>
          </div>
          <p className="mt-3.5 text-sm font-sans text-muted-foreground leading-relaxed">
            {siteConfig.description}
          </p>

          <div className="mt-6 flex gap-3.5 items-center">
            {[
              { href: siteConfig.links.twitter, icon: Icons.twitter },
              { href: siteConfig.links.github, icon: Icons.github },
              { href: siteConfig.links.telegram, icon: Icons.telegram },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 transition-all"
              >
                <item.icon className="h-4 w-4 text-neutral-600" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation columns */}
        <div className="grid flex-1 grid-cols-2 gap-12 sm:grid-cols-2">
          <div className="space-y-6">
            <h3 className="font-heading font-semibold text-xs tracking-wider uppercase text-neutral-400">产品服务</h3>
            <ul className="space-y-3 font-sans font-medium text-sm text-neutral-600">
              <li>
                <DynamicRegisterLink href={siteConfig.registerUrl} className="hover:text-primary transition-colors">
                  登录
                </DynamicRegisterLink>
              </li>
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  文档首页
                </Link>
              </li>
              <li>
                <a href="https://supastore.cc/console/topup" className="hover:text-primary transition-colors">
                  充值中心
                </a>
              </li>
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  帮助文档
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="hover:text-primary transition-colors">
                  合伙人计划
                </Link>
              </li>
              <li>
                <div className="text-muted-foreground flex items-center gap-2 cursor-default">
                  服务状态
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" title="所有系统运行正常" />
                </div>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="font-heading font-semibold text-xs tracking-wider uppercase text-neutral-400">相关资源</h3>
            <ul className="space-y-3 font-sans font-medium text-sm text-neutral-600">
              <li>
                <Link href="/privacy" className="hover:text-secondary transition-colors">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-secondary transition-colors">
                  退款政策
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="hover:text-secondary transition-colors">
                  滥用处理 (DMCA)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-secondary transition-colors">
                  服务条款
                </Link>
              </li>
              <li>
                <Link href="/aup" className="hover:text-secondary transition-colors">
                  使用守则 (AUP)
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-secondary transition-colors">
                  博客文章
                </Link>
              </li>
              <li>
                <Link href="/tokushoho" className="hover:text-secondary transition-colors">
                  特定商取引法
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
