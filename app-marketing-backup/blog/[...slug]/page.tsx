import { notFound } from "next/navigation"
import { allAuthors, allPosts } from "@/.content-collections/generated"

import { Mdx } from "@/components/mdx-components"

import "@/styles/mdx.css"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { absoluteUrl, cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { BlogPostJsonLd, BreadcrumbJsonLd } from "@/components/json-ld"
import { RelatedPosts } from "@/components/related-posts"

interface PostPageProps {
  params: Promise<{
    slug: string[]
  }>
}

async function getPostFromParams(params: { slug: string[] }) {
  const slug = params?.slug?.join("/")
  const posts = allPosts || []
  const post = posts.find((post: any) => post.slugAsParams === slug)

  if (!post) {
    return null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(await params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    authors: post.authors.map((author) => ({
      name: author,
    })),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(post.slug),
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  }
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const posts = allPosts || []
  return posts.map((post: any) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(await params)

  if (!post) {
    notFound()
  }

  const authors = post.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === `/authors/${author}`)
  )

  return (
    <article className="container relative max-w-4xl py-4">
      <BreadcrumbJsonLd
        items={[
          { name: "首页", href: "/" },
          { name: "博客", href: "/blog" },
          { name: post.title, href: post.slug },
        ]}
      />
      <BlogPostJsonLd
        title={post.title}
        description={post.description}
        datePublished={new Date(post.date).toISOString()}
        image={post.image}
        authorName={post.authors[0] || "Supaboard"}
        url={absoluteUrl(post.slug)}
      />
      <div>
        {post.date && (
          <time
            dateTime={post.date}
            className="block text-sm text-muted-foreground"
          >
            发布于 {formatDate(post.date)}
          </time>
        )}
        <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
          {post.title}
        </h1>
        {authors?.length ? (
          <div className="mt-4 flex space-x-4">
            {authors.map((author) =>
              author ? (
                <Link
                  key={author.twitter}
                  href={`https://twitter.com/${author.twitter}`}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Image
                    src={author.avatar}
                    alt={author.title}
                    width={42}
                    height={42}
                    className="rounded-full bg-white"
                  />
                  <div className="flex-1 text-left leading-tight">
                    <p className="font-medium">{author.title}</p>
                    <p className="text-[12px] text-muted-foreground">
                      @{author.twitter}
                    </p>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        ) : null}
      </div>
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={720}
          height={405}
          className="my-8 rounded-md border bg-muted transition-colors"
          priority
        />
      )}
      <Mdx code={post.body.code} />

      {/* Related Posts */}
      {(() => {
        const currentSlug = post.slugAsParams
        const keywords = post.title.split(/[\s，、：|—]/)
          .filter((w: string) => w.length >= 2)
        const related = (allPosts || [])
          .filter((p: any) => p.slugAsParams !== currentSlug && p.published !== false)
          .map((p: any) => {
            const score = keywords.filter((kw: string) =>
              p.title.includes(kw) || (p.description && p.description.includes(kw))
            ).length
            return { ...p, score }
          })
          .sort((a: any, b: any) => b.score - a.score || new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 3)
          .map((p: any) => ({
            title: p.title,
            slug: p.slugAsParams,
            image: p.image,
            description: p.description,
          }))

        return <RelatedPosts posts={related} />
      })()}

      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          <Icons.chevronLeft className="mr-2 size-4" />
          查看全部文章
        </Link>
      </div>
    </article>
  )
}
