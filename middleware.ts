import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";

  // 1. 如果通过 docs.supastore.cc 域名访问根目录，直接重定向至文档中心 /docs
  if (host.includes("docs.supastore.cc") && url.pathname === "/") {
    url.pathname = "/docs";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// 仅拦截根路径以获取最高性能
export const config = {
  matcher: ["/"],
};
