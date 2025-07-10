import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*', // Match any path starting with /api/
  //       destination: `https://be-on.stage.prettysolution.com/api/:path*`, // Proxy to your external API
  //     },
  //   ];
  // },
};

export default nextConfig;
