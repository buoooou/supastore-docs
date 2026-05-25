"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";

interface DynamicRegisterLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
}

let activeDomainPromise: Promise<string | null> | null = null;
let resolvedActiveDomain: string | null = null;

// Helper to check connectivity of a single domain via no-cors fetch
async function checkDomain(domain: string): Promise<string> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 2500); // 2.5s timeout
  
  try {
    // Add cache buster query parameter to prevent browser cache from giving instant false positives
    const testUrl = `https://${domain}/favicon.ico?t=${Date.now()}`;
    await fetch(testUrl, {
      method: "GET",
      mode: "no-cors",
      signal: controller.signal,
      credentials: "omit",
      cache: "no-store",
    });
    clearTimeout(id);
    return domain;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

// Custom promise race that resolves as soon as any promise succeeds
function promiseAny<T>(promises: Promise<T>[]): Promise<T> {
  return new Promise((resolve, reject) => {
    let rejectedCount = 0;
    if (promises.length === 0) {
      reject(new Error("No domains to check"));
      return;
    }
    promises.forEach((p) => {
      Promise.resolve(p)
        .then(resolve)
        .catch(() => {
          rejectedCount++;
          if (rejectedCount === promises.length) {
            reject(new Error("All domains failed"));
          }
        });
    });
  });
}

// Find the first domain that resolves successfully
async function findActiveDomain(domains: string[]): Promise<string | null> {
  const promises = domains.map((domain) => checkDomain(domain));
  try {
    return await promiseAny(promises);
  } catch (e) {
    return null;
  }
}

// Silent background check to update cache
async function triggerBackgroundCheck(domains: string[]): Promise<string | null> {
  const result = await findActiveDomain(domains);
  if (result) {
    resolvedActiveDomain = result;
    try {
      localStorage.setItem(
        "supaboard_active_domain_info",
        JSON.stringify({
          domain: result,
          timestamp: Date.now(),
        })
      );
    } catch (e) {}
  }
  return result;
}

// Initialize domain checking, checking cache first
function initDomainCheck(domains: string[]): Promise<string | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (activeDomainPromise) return activeDomainPromise;

  try {
    const cached = localStorage.getItem("supaboard_active_domain_info");
    if (cached) {
      const { domain, timestamp } = JSON.parse(cached);
      // Cache valid for 10 minutes
      if (Date.now() - timestamp < 10 * 60 * 1000 && domains.includes(domain)) {
        resolvedActiveDomain = domain;
        // Run background check silently to keep cache updated
        triggerBackgroundCheck(domains);
        return Promise.resolve(domain);
      }
    }
  } catch (e) {}

  activeDomainPromise = triggerBackgroundCheck(domains);
  return activeDomainPromise;
}

// Construct final register URL using target domain and preserving route / query params
export function getRegisterUrl(domain: string, inviteCode?: string | null): string {
  try {
    const defaultUrl = new URL(siteConfig.registerUrl);
    defaultUrl.host = domain;
    
    if (inviteCode) {
      const hashPart = defaultUrl.hash;
      if (hashPart.includes("code=")) {
        defaultUrl.hash = hashPart.replace(/code=[^&]*/, `code=${inviteCode}`);
      } else {
        if (hashPart.includes("?")) {
          defaultUrl.hash = `${hashPart}&code=${inviteCode}`;
        } else {
          defaultUrl.hash = `${hashPart}?code=${inviteCode}`;
        }
      }
    }
    return defaultUrl.toString();
  } catch (e) {
    const fallbackBase = `https://${domain}/#/register`;
    return inviteCode ? `${fallbackBase}?code=${inviteCode}` : fallbackBase;
  }
}

export function DynamicRegisterLink({ href, children, ...props }: DynamicRegisterLinkProps) {
  const isRegisterLink = href === siteConfig.registerUrl || !href;
  
  // Helper to resolve dynamic URL on the fly (for mouse hover or immediate navigation)
  const resolveTargetUrl = (domainOverride?: string) => {
    if (typeof window === "undefined") return siteConfig.registerUrl;

    // 1. Get invite code from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code") || urlParams.get("ref");

    // 2. Fall back to localStorage
    if (!code) {
      code = localStorage.getItem("xboard_invite_code");
    }

    const defaultHost = new URL(siteConfig.registerUrl).host;
    const targetDomain = domainOverride || resolvedActiveDomain || defaultHost;
    
    return getRegisterUrl(targetDomain, code);
  };

  const [currentHref, setCurrentHref] = useState(href || siteConfig.registerUrl);

  // Run dynamic connectivity check on mount
  useEffect(() => {
    if (!isRegisterLink) return;
    
    const domains = siteConfig.registerDomains || [];
    if (domains.length === 0) return;

    if (resolvedActiveDomain) {
      setCurrentHref(resolveTargetUrl(resolvedActiveDomain));
      return;
    }

    initDomainCheck(domains).then((activeDomain) => {
      if (activeDomain) {
        setCurrentHref(resolveTargetUrl(activeDomain));
      }
    });
  }, [isRegisterLink]);

  // Update href state on hover so browser status bar preview is accurate
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isRegisterLink) {
      setCurrentHref(resolveTargetUrl());
    }
    if (props.onMouseEnter) {
      props.onMouseEnter(e);
    }
  };

  // Enforce latest checked URL on click to bypass state synchronization delay
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isRegisterLink) {
      e.preventDefault();
      const targetUrl = resolveTargetUrl();
      if (props.target === "_blank") {
        window.open(targetUrl, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = targetUrl;
      }
    }
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <Link 
      href={isRegisterLink ? currentHref : (href || "")} 
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
}
