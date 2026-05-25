import { withContentCollections } from "@content-collections/next"
import path from "node:path"
import { fileURLToPath } from "node:url"

import "./env.mjs"

const rootDir = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.buoucoding.com",
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    root: rootDir,
  },
  serverExternalPackages: [],
  webpack(config) {
    // 添加 GLSL 文件的处理规则
    config.module.rules.push({
      test: /\.glsl$/,
      use: 'raw-loader',
    });

    return config;
  },
}

export default withContentCollections(nextConfig)
