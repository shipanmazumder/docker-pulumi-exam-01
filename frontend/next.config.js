/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  serverRuntimeConfig: {
    // Will only be available on the server side
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
  }
};

module.exports = nextConfig;