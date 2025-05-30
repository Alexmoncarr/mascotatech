import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'm.media-amazon.com',
      // agrega aquí otros dominios si usas imágenes de otros sitios
    ],
  },
};

export default nextConfig;
