/** @type {import('next').NextConfig} */
const { API_URL } = process.env
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL,
  },
  images: {
    domains: ['159.223.75.67'],
  },
}

module.exports = nextConfig
