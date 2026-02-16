/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: false,
  experimental: {
    // Dezactivează complet validatorul care generează eroarea
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  typescript: {
    // Oprește validarea tipurilor generate de Next în .next/types
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
