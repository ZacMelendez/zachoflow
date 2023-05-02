/** @type {import('next').NextConfig} */

const path = require('path');
const removeImports = require("next-remove-imports")();
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

const nextConfig = withBundleAnalyzer(removeImports({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    domains: ["localhost"],
  },
  experimental: {
    optimizeCss: true,
  },
  productionBrowserSourceMaps: true,

}))

module.exports = nextConfig

