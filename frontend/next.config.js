/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL
  },
  publicRuntimeConfig: {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  }
};

module.exports = nextConfig;