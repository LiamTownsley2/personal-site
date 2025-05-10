import type { NextConfig } from "next";
import 'dotenv/config'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://placehold.co/**'), new URL('https://i.imgur.com/**')]
  }
};

export default nextConfig;
