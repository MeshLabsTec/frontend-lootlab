import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "ufape.com.br",
      "pub-3c35af89709b4cb295f1df369e7cd3fb.r2.dev",
      "pub-5055a299478c41f1989f7f36205ad5ed.r2.dev",
      "assets.coingecko.com",
    ], // Adicione o domínio aqui
  },
};

export default nextConfig;
