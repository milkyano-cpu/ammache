import type { NextConfig } from "next";
import legacyRedirects from "./legacy-redirects.json";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Old WordPress URLs that Google still lists. Send them to a live page instead of a 404.
  async redirects() {
    const toHome = "/";
    return [
      { source: "/:dir(portfolio|portfolio-category|project|project-category|project-year|projects)", destination: toHome, permanent: true },
      { source: "/:dir(portfolio|portfolio-category|project|project-category|project-year|projects)/:path*", destination: toHome, permanent: true },
      // old project pages named by street address, e.g. /14-white-st-beaumaris, and /2018/08 archives
      { source: "/:slug(\\d[^/]*)/:path*", destination: toHome, permanent: true },
      { source: "/:page/thank-you", destination: "/contact", permanent: true },
      { source: "/:slug(thank-?you[^/]*)", destination: "/contact", permanent: true },
      ...legacyRedirects,
    ];
  },
};

export default nextConfig;
