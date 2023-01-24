/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['coding-challenge-images.s3.us-west-1.amazonaws.com', 'loremflickr.com']
  }
}

module.exports = nextConfig
