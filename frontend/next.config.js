/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export since we need runtime environment variables
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
