import type { MetadataRoute } from "next";
import { publishedProjects } from "@/data/siteContent";

const staticRoutes = [
  "",
  "/about-us",
  "/services",
  "/how-we-work",
  "/projects",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
  "/cookie-policy",
  "/accessibility-statement",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    ""
  );

  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}` })),
    ...publishedProjects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
    })),
  ];
}
