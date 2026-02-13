/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: "https://electrohub-backend-1-10qa.onrender.com",
  },
};

module.exports = nextConfig;
