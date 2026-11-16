import type { NextConfig } from "next";
import legacyRedirects from "./legacy-redirects.json";
import legacyProjectMap from "./legacy-project-map.json";

// Old project page slug -> new /detailProject slug, matched by street and suburb.
// Old projects with no clear single match (several on one street, or unpublished here) fall through to the home page.
const projectRedirects = Object.entries(legacyProjectMap).flatMap(([oldSlug, slug]) =>
  ["", "/portfolio", "/project"].map((prefix) => ({
    source: `${prefix}/${oldSlug}`,
    destination: `/detailProject/${slug}`,
    permanent: true,
  }))
);

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
      // first match wins, so exact project pages go before the catch-alls below
      ...projectRedirects,
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
