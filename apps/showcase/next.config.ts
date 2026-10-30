import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/shadcn-ui", "@workspace/pattern", "@workspace/css"],
}

export default nextConfig

