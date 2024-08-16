/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['localhost'], // Add any other domains you might use
    },
    assetPrefix: process.env.NODE_ENV === 'production' ? '/{vr}' : '',
    basePath: process.env.NODE_ENV === 'production' ? '/{vr}' : '',
  }

export default nextConfig;
