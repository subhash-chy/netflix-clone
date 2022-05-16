/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // All images link should be placed here
  images: {
    domains: ["upload.wikimedia.org", "rb.gy", "image.tmdb.org"],
  },
};

module.exports = nextConfig;
