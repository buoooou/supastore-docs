import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { allPosts } from "@/.content-collections/generated"

import { formatDate } from "@/lib/utils"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export const metadata = {
  title: "博客 — 翻墙教程与网络加速干货",
  description: "Supaboard 博客：提供最新的翻墙技术教程、机场评测、VPS 推荐和网络优化干货文章。",
}

const POSTS_PER_PAGE = 6

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const currentPage = typeof params.page === "string" ? parseInt(params.page) : 1
  
  const allFilteredPosts = (allPosts || [])
    .filter((post: any) => post.published !== false)
    .sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  const totalPosts = allFilteredPosts.length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  
  const posts = allFilteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  return (
    <div className="container py-4 max-w-7xl">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            最新的产品动态、网络技术干货以及隐私安全指南。
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {posts?.length ? (
        <>
          <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className="sticker-card p-4 group relative flex flex-col space-y-4 hover:bg-muted/50 transition-colors"
              >
                {post.image && (
                  <div className="overflow-hidden rounded-xl border-2 border-foreground shadow-[2px 2px 0px 0px #1E293B]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={504}
                      height={252}
                      className="w-full aspect-video object-cover transition-transform group-hover:scale-105"
                      priority={index <= 1}
                    />
                  </div>
                )}
                <div className="flex-grow space-y-2">
                  <h2 className="text-2xl font-black font-heading leading-tight">{post.title}</h2>
                  {post.description && (
                    <p className="text-muted-foreground text-sm line-clamp-2">{post.description}</p>
                  )}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-dashed">
                  {post.date && (
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      {formatDate(post.date)}
                    </p>
                  )}
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white border border-foreground shadow-[2px 2px 0px 0px #1E293B]">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <Link href={post.slug} className="absolute inset-0">
                  <span className="sr-only">View Article</span>
                </Link>
              </article>
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href={`/blog?page=${Math.max(1, currentPage - 1)}`}
                      aria-disabled={currentPage <= 1}
                      className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {/* Desktop view: Show more pages */}
                  <div className="hidden sm:flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const pageNum = i + 1;
                      // Logic to show a limited range of pages
                      if (
                        totalPages > 5 &&
                        Math.abs(pageNum - currentPage) > 1 &&
                        pageNum !== 1 &&
                        pageNum !== totalPages
                      ) {
                        if (pageNum === 2 || pageNum === totalPages - 1) {
                          return (
                            <PaginationItem key={pageNum}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        return null;
                      }

                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            href={`/blog?page=${pageNum}`}
                            isActive={currentPage === pageNum}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                  </div>

                  {/* Mobile view: Simple current page indicator */}
                  <PaginationItem className="sm:hidden px-4 text-sm font-medium">
                    Page {currentPage} of {totalPages}
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext 
                      href={`/blog?page=${Math.min(totalPages, currentPage + 1)}`}
                      aria-disabled={currentPage >= totalPages}
                      className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  )
}
