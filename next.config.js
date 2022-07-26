/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  },
  env: {
    ENABLE_LOGGING: process.env.ENABLE_LOGGING,
    ACCESS_ID_AWS: process.env.ACCESS_ID_AWS,
    SECRET_KEY_AWS: process.env.SECRET_KEY_AWS
  }
}
