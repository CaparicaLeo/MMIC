import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // As imagens reais entram depois. Quando forem servidas por um CDN/DAM
    // externo, basta declarar o host aqui.
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
