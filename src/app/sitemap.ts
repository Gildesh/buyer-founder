import type { MetadataRoute } from "next";
import { listCampaignSlugs } from "@/lib/campaigns";
import { listPainPageSlugs } from "@/lib/pain-pages";
import { products } from "@/lib/products";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://buyer-founder.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/try",
    "/waitlist",
    "/samples",
    "/samples/wedge",
    "/samples/feasibility",
    "/samples/clauses",
    "/products",
    "/pricing",
    "/about",
    "/contact",
    "/pipeline",
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: (path === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "" ? 1 : 0.7,
    })),
    ...products.map((product) => ({
      url: `${siteUrl}/products/${product.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: product.status === "live" ? 0.9 : 0.6,
    })),
    ...listCampaignSlugs().map((slug) => ({
      url: `${siteUrl}/l/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...listPainPageSlugs().map((slug) => ({
      url: `${siteUrl}/pain/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
