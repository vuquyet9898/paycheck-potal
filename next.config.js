/** @type {import('next').NextConfig} */
const { API_URL } = process.env
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL,
  },
}

module.exports = nextConfig
