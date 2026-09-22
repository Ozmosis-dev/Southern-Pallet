const baseUrl = process.env.SITE_URL || "http://127.0.0.1:3000";

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)')`, "i"));
  return match?.[1] ?? match?.[2];
}

function decodeHtml(value) {
  return value.replaceAll("&amp;", "&");
}

const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
if (!sitemapResponse.ok) {
  throw new Error(`Could not load sitemap.xml (${sitemapResponse.status}).`);
}

const sitemap = await sitemapResponse.text();
const routes = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map(
  ([, path]) => path || "/",
);
const failures = [];
const optimizedSources = new Map();
let imageCount = 0;

for (const route of routes) {
  const response = await fetch(`${baseUrl}${route}`);
  const html = await response.text();
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map(([tag]) => tag);
  imageCount += images.length;
  let eagerRasterCount = 0;

  for (const tag of images) {
    const alt = attribute(tag, "alt");
    const src = decodeHtml(attribute(tag, "src") || "");
    const srcSet = attribute(tag, "srcset");
    const loading = attribute(tag, "loading");
    const isOptimizedRaster = src.startsWith("/_next/image?");

    if (!tag.includes('data-nimg=')) {
      failures.push(`${route}: rendered image does not come from next/image.`);
    }
    if (!alt?.trim()) {
      failures.push(`${route}: rendered image is missing descriptive alt text (${src}).`);
    }

    if (isOptimizedRaster) {
      if (!srcSet) failures.push(`${route}: optimized image is missing srcset (${src}).`);
      if (attribute(tag, "data-nimg") === "fill" && !attribute(tag, "sizes")) {
        failures.push(`${route}: fill image is missing sizes (${src}).`);
      }
      if (loading !== "lazy") eagerRasterCount += 1;

      const originalSource = new URL(src, baseUrl).searchParams.get("url") || src;
      if (!optimizedSources.has(originalSource)) {
        const verificationUrl = new URL(src, baseUrl);
        verificationUrl.searchParams.set("w", "640");
        optimizedSources.set(originalSource, verificationUrl);
      }
    } else if (!/\.svg(?:\?|$)/i.test(src)) {
      failures.push(`${route}: raster image bypasses Next.js optimization (${src}).`);
    }
  }

  if (images.some((tag) => decodeHtml(attribute(tag, "src") || "").startsWith("/_next/image?"))) {
    if (eagerRasterCount !== 1) {
      failures.push(`${route}: expected one priority LCP image, found ${eagerRasterCount}.`);
    }
  }
}

for (const [source, url] of optimizedSources) {
  const response = await fetch(url, { headers: { accept: "image/webp" } });
  const contentType = response.headers.get("content-type") || "";
  if (!response.ok || !contentType.startsWith("image/webp")) {
    failures.push(
      `${source}: expected a successful WebP optimizer response, received ${response.status} ${contentType}.`,
    );
  }
}

if (failures.length > 0) {
  console.error("Rendered image audit failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Rendered image optimization verified for ${imageCount} images across ${routes.length} indexable routes; ${optimizedSources.size} raster sources return WebP variants.`,
);
