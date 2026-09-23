import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.southernpallet.co" }],
        destination: "https://southernpallet.co/:path*",
        statusCode: 301,
      },
    ];
  },
  images: {
    formats: ["image/webp"],
  },
};

export default nextConfig;
