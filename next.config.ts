import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // As imagens reais entram depois. Quando forem servidas por um CDN/DAM
    // externo, basta declarar o host aqui.
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
  /**
   * /patrocinadores virou /marcas. O redirect é permanente (308) porque a
   * rota antiga já estava no sitemap e pode ter sido compartilhada — sem ele
   * o link vira 404 e o buscador não transfere o que já tinha indexado.
   */
  async redirects() {
    return [
      { source: "/patrocinadores", destination: "/marcas", permanent: true },
      /* /vencedores virou o próprio /concurso-de-camisetas, agora com o resultado. */
      {
        source: "/concurso-de-camisetas/vencedores",
        destination: "/concurso-de-camisetas",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
