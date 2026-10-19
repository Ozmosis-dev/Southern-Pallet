import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-config";

const routes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/recycle-pallets", modified: "2026-10-19", changeFrequency: "weekly", priority: 0.9 },
  { path: "/pallet-services", modified: "2026-10-04", changeFrequency: "monthly", priority: 0.9 },
  { path: "/pallet-supply", modified: "2026-10-19", changeFrequency: "weekly", priority: 0.9 },
  { path: "/pallet-supply/heat-treated-pallets", modified: "2026-10-19", changeFrequency: "monthly", priority: 0.8 },
  { path: "/locations/poplarville-ms", modified: "2026-10-19", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog/grade-a-vs-grade-b-pallets", modified: "2026-10-19", changeFrequency: "monthly", priority: 0.7 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.6 },
  { path: "/blog", modified: "2026-10-19", changeFrequency: "monthly", priority: 0.7 },
  {
    path: "/blog/where-to-buy-used-pallets",
    modified: "2026-10-19",
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
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(`${"modified" in route ? route.modified : "2026-08-03"}T12:00:00-04:00`),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
