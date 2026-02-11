import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: "https://electrohub-backend-1-10qa.onrender.com",
  },
};

export default nextConfig;
