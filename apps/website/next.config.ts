import path from "node:path";
import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const mediaUrl = process.env.MEDIA_URL;

if (!mediaUrl) {
  throw new Error("MEDIA_URL environment variable is not defined");
}
const media = new URL(mediaUrl);

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(process.cwd(), "../.."),
  },

  images: {
    dangerouslyAllowLocalIP: isDevelopment,

    remotePatterns: [
      {
        protocol: media.protocol === "https:" ? "https" : "http",

        hostname: media.hostname,

        ...(media.port
          ? {
              port: media.port,
            }
          : {}),

        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
