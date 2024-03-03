/** @type {import('next').NextConfig} */
const nextConfig = {
    // Any other Next.js config options you have go here
  
    async rewrites() {
      return [
        {
          source: '/',
          destination: '/application',
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  