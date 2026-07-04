/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Definido pelo CI para o GitHub Pages (/dinya-site); vazio em dev e Cloudflare
  basePath: process.env.BASE_PATH || "",
  images: {
    unoptimized: true,
  },
}

export default nextConfig
