// @ts-nocheck
import {
  defineCollection,
  defineConfig,
  suppressDeprecatedWarnings,
} from "@content-collections/core"
import { compileMDX } from "@content-collections/mdx"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import { codeImport } from "remark-code-import"
import remarkGfm from "remark-gfm"
import type { Pluggable } from "unified"
import { visit } from "unist-util-visit"
import { z } from "zod"

import { rehypeNpmCommand } from "./lib/rehype-npm-command"

// Avoid deprecation warning until the config typings support `content`.
suppressDeprecatedWarnings("collectionsConfigProperty")

const remarkPlugins: Pluggable[] = [
  remarkGfm,
  codeImport as unknown as Pluggable,
]

const rehypePlugins: Pluggable[] = [
  rehypeSlug,
  () => (tree: any) => {
    visit(tree, (node: any) => {
      if (node?.type === "element" && node?.tagName === "pre") {
        const [codeEl] = node.children ?? []
        if (!codeEl || codeEl.tagName !== "code") {
          return
        }

        if (codeEl.data?.meta) {
          const regex = /event="([^"]*)"/
          const match = codeEl.data?.meta.match(regex)
          if (match) {
            node.__event__ = match[1]
            codeEl.data.meta = codeEl.data.meta.replace(regex, "")
          }
        }

        node.__rawString__ = codeEl.children?.[0]?.value
        node.__src__ = node.properties?.__src__
        node.__style__ = node.properties?.__style__
      }
    })
  },
  [
    rehypePrettyCode,
    {
      theme: "github-dark",
      onVisitLine(node: any) {
        if (node.children.length === 0) {
          node.children = [{ type: "text", value: " " }]
        }
      },
      onVisitHighlightedLine(node: any) {
        const className = node.properties.className
        if (Array.isArray(className)) {
          className.push("line--highlighted")
        } else if (typeof className === "string") {
          node.properties.className = [className, "line--highlighted"]
        } else {
          node.properties.className = ["line--highlighted"]
        }
      },
      onVisitHighlightedWord(node: any) {
        node.properties.className = ["word--highlighted"]
      },
    },
  ],
  () => (tree: any) => {
    visit(tree, (node: any) => {
      if (node?.type === "element" && node?.tagName === "div") {
        if (!("data-rehype-pretty-code-fragment" in node.properties)) {
          return
        }

        const preElement = node.children.at(-1)
        if (preElement.tagName !== "pre") {
          return
        }

        preElement.properties["__withMeta__"] =
          node.children.at(0).tagName === "div"
        preElement.properties["__rawString__"] = node.__rawString__

        if (node.__src__) {
          preElement.properties["__src__"] = node.__src__
        }

        if (node.__event__) {
          preElement.properties["__event__"] = node.__event__
        }

        if (node.__style__) {
          preElement.properties["__style__"] = node.__style__
        }
      }
    })
  },
  rehypeNpmCommand,
  [
    rehypeAutolinkHeadings,
    {
      properties: {
        className: ["subheading-anchor"],
        ariaLabel: "Link to section",
      },
    },
  ],
]

const mdxOptions = {
  remarkPlugins,
  rehypePlugins,
}

async function withMdx(document: any, context: any) {
  const mdx = await compileMDX(context, document, mdxOptions)
  const slug = `/${document._meta.path}`
  const slugAsParams = document._meta.path.split("/").slice(1).join("/")
  const _id = document._meta.path

  const { content, ...rest } = document
  return {
    ...rest,
    _id,
    slug,
    slugAsParams,
    body: {
      code: mdx,
      raw: content,
    },
  }
}

const linksSchema = z
  .object({
    doc: z.string().optional(),
    api: z.string().optional(),
  })
  .nullish()

const docs = defineCollection({
  name: "docs",
  directory: "content",
  include: "docs/**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    published: z.boolean().optional().default(true),
    links: linksSchema,
    featured: z.boolean().optional().default(false),
    component: z.boolean().optional().default(false),
    toc: z.boolean().optional().default(true),
    content: z.string(),
  }),
  transform: withMdx,
})

const posts = defineCollection({
  name: "posts",
  directory: "content",
  include: "blog/**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    published: z.boolean().optional().default(true),
    image: z.string(),
    authors: z.array(z.string()),
    content: z.string(),
  }),
  transform: withMdx,
})

const authors = defineCollection({
  name: "authors",
  directory: "content",
  include: "authors/**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    avatar: z.string(),
    twitter: z.string(),
    content: z.string(),
  }),
  transform: withMdx,
})

const pages = defineCollection({
  name: "pages",
  directory: "content",
  include: "pages/**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    content: z.string(),
  }),
  transform: withMdx,
})

export default defineConfig({
  content: [pages, docs, posts, authors],
})
