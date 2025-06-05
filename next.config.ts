// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import withPWA from "next-pwa";
import type { NextConfig } from "next";

const baseConfig: NextConfig = {
  reactStrictMode: true,
};

const pwaConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // dev এ error এড়াতে
};

export default withPWA(pwaConfig)(baseConfig);
