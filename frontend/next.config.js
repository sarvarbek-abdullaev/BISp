/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io', 'placehold.jp', 'img.abercrombie.com', 'cdn.pixabay.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
