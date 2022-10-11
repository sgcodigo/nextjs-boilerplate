/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: { domains: ['images.unsplash.com'] },
  experimental: { newNextLinkBehavior: true },
}

module.exports = nextConfig
