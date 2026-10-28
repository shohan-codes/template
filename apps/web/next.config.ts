import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/shadcn-ui", "@workspace/css"],
}

export default nextConfig
