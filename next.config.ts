import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns:[
      {
        hostname:"oceanic-corgi-693.convex.cloud",
        protocol:"https",
      },
      {
        hostname:"hip-octopus-217.convex.cloud",
        protocol:"https",
      }
    ]
  },
};

export default nextConfig;
