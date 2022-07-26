/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  },
  env: {
    ENABLE_LOGGING: process.env.ENABLE_LOGGING,
  },
  target: 'experimental-serverless-trace'
}
