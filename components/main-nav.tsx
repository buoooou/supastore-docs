"use client"

import * as React from "react"
import Link from "next/link"
import { MainNavItem } from "types/nav"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Icons } from "@/components/icons"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  return (
    <div className="flex gap-4 font-heading font-bold">
      <Link href="/docs" className="hidden items-center space-x-2 lg:flex">
        <Icons.logo className="size-6" />
        <span>{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="hidden lg:flex gap-2">
          {items?.map((item, index) => (
            <NavigationMenu key={index}>
              <NavigationMenuList>
                {item?.items?.length ? (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(navigationMenuTriggerStyle(), "relative")}
                    >
                      {item.title}
                      {item.label && (
                        <span
                          className={`absolute -top-2 right-0 z-10 ml-2 rounded-md px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline bg-[#fbbf24]`}
                        >
                          {item.label}
                        </span>
                      )}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        {item?.items?.map((item, index) => (
                          <ListItem
                            key={index}
                            href={item.href}
                            title={item.title}
                            className="relative"
                          >
                            {item.description && (
                              <span
                                className={cn(
                                  item.disabled
                                    ? "cursor-not-allowed opacity-60"
                                    : ""
                                )}
                              >
                                {item.description}
                              </span>
                            )}
                            {item.label && (
                              <span
                                className={`absolute -top-2 left-8 z-10 ml-2 rounded-md px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline bg-[#fbbf24]`}
                              >
                                {item.label}
                              </span>
                            )}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        key={index}
                        href={item.disabled ? "#" : item.href}
                        className={cn(navigationMenuTriggerStyle(), "relative")}
                      >
                        {item.title}
                        {item.label && (
                          <span
                            className={`absolute -top-2 right-0 z-10 ml-2 rounded-md px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline bg-[#fbbf24]`}
                          >
                            {item.label}
                          </span>
                        )}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          ))}
        </nav>
      ) : null}
    </div>
  )
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
