/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs-2.thirdwebcdn.com',
        
      },
    ],
  },
};

module.exports = nextConfig;
