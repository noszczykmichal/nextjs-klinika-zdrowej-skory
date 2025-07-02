import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                { name: "removeXMLNS" },
                { name: "removeDoctype" },
                { name: "removeEditorsNSData" },
                { name: "removeStyleElement" },
                {
                  name: "removeAttrs",
                  params: { attrs: ["xmlns:*", "xmlns:xlink", "xlink:*"] },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/ddh0mvo4/**",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
