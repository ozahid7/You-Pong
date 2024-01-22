/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "http", hostname: `${process.env.NEXT_PUBLIC_HOST_IP}` },
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "cdn.intra.42.fr" },
    ],
  },
};

module.exports = nextConfig;
