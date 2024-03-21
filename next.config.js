/** @type {import('next').NextConfig} */
const nextConfig = {
    // Any other Next.js config options you have go here
    images: {
      domains: ['firstprojectaws.s3.ap-southeast-1.amazonaws.com'],
    },
    async rewrites() {
      return [
        {
          source: '/',
          destination: '/application',
        },
        {
          source:'/login',
          destination:'/application/auth/login'
        }
      ];
    },
  };
  
  module.exports = nextConfig;
  