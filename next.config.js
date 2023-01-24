/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['coding-challenge-images.s3.us-west-1.amazonaws.com']
  }
}

module.exports = nextConfig
