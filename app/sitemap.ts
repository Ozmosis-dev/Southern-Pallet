import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-config";

const routes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/recycle-pallets", changeFrequency: "weekly", priority: 0.9 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.6 },
  { path: "/blog", changeFrequency: "monthly", priority: 0.7 },
  {
    path: "/blog/where-to-buy-used-pallets",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/blog/pallet-recycling-environmental-benefits",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/blog/cost-effective-pallet-management-strategies",
    changeFrequency: "monthly",
    priority: 0.7,
  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-03T00:00:00-04:00");

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
