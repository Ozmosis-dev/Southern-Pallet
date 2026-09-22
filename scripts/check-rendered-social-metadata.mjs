import { readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const baseUrl = process.env.SITE_URL || "http://127.0.0.1:3000";
const expectedSiteName = "Southern Pallet";
const failures = [];

const socialCardSource = readFileSync(
  join(process.cwd(), "lib/social-cards.ts"),
  "utf8",
);
if (/image:\s*["'][^"']+\.webp["']/.test(socialCardSource)) {
  failures.push(
    "Social-card backgrounds must use JPEG or PNG sources because next/og does not render the current WebP assets.",
  );
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([:\w-]+)=(?:"([^"]*)"|'([^']*)')/g)].map(
      ([, name, doubleQuoted, singleQuoted]) => [
        name.toLowerCase(),
        decodeHtml(doubleQuoted ?? singleQuoted ?? ""),
      ],
    ),
  );
}

function socialMetadata(html) {
  const metadata = new Map();
  for (const [tag] of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = attributes(tag);
    const key = attrs.property || attrs.name;
    if (key?.startsWith("og:") || key?.startsWith("twitter:")) {
      metadata.set(key, attrs.content || "");
    }
  }
  return metadata;
}

async function regionVariation(bytes, region) {
  const { data, info } = await sharp(Buffer.from(bytes))
    .extract(region)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const sums = new Array(info.channels).fill(0);
  const squaredSums = new Array(info.channels).fill(0);
  const pixelCount = data.length / info.channels;

  for (let index = 0; index < data.length; index += info.channels) {
    for (let channel = 0; channel < info.channels; channel += 1) {
      const value = data[index + channel];
      sums[channel] += value;
      squaredSums[channel] += value * value;
    }
  }

  return Math.max(
    ...sums.map((sum, channel) => {
      const mean = sum / pixelCount;
      return Math.sqrt(squaredSums[channel] / pixelCount - mean * mean);
    }),
  );
}

const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
if (!sitemapResponse.ok) {
  throw new Error(`Could not load sitemap.xml (${sitemapResponse.status}).`);
}

const sitemap = await sitemapResponse.text();
const routes = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map(
  ([, path]) => path.replace(/\/$/, "") || "/",
);
const imageRoutes = new Map();

for (const route of routes) {
  const response = await fetch(`${baseUrl}${route}`);
  const html = await response.text();
  const metadata = socialMetadata(html);
  const expectedType = route.startsWith("/blog/") ? "article" : "website";
  const required = {
    "og:title": null,
    "og:description": null,
    "og:url": null,
    "og:site_name": expectedSiteName,
    "og:locale": "en_US",
    "og:type": expectedType,
    "og:image": null,
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:alt": null,
    "twitter:card": "summary_large_image",
    "twitter:title": null,
    "twitter:description": null,
    "twitter:image": null,
    "twitter:image:alt": null,
  };

  for (const [key, expected] of Object.entries(required)) {
    const value = metadata.get(key);
    if (!value) failures.push(`${route}: missing ${key}.`);
    else if (expected && value !== expected) {
      failures.push(`${route}: expected ${key}=${expected}, received ${value}.`);
    }
  }

  const ogImage = metadata.get("og:image");
  const twitterImage = metadata.get("twitter:image");
  if (ogImage && twitterImage && ogImage !== twitterImage) {
    failures.push(`${route}: Open Graph and Twitter should share the same card image.`);
  }
  if (ogImage) {
    const imagePath = new URL(ogImage).pathname;
    if (!/^\/social-card\/v\d+\//.test(imagePath)) {
      failures.push(`${route}: social-card URL is not versioned for safe cache invalidation.`);
    }
    imageRoutes.set(route, ogImage);
  }
}

if (new Set(imageRoutes.values()).size !== routes.length) {
  failures.push(
    `Expected a unique social image for each of ${routes.length} indexable routes; found ${new Set(imageRoutes.values()).size}.`,
  );
}

for (const [route, imageUrl] of imageRoutes) {
  const productionUrl = new URL(imageUrl);
  const localUrl = new URL(`${productionUrl.pathname}${productionUrl.search}`, baseUrl);
  const response = await fetch(localUrl);
  const contentType = response.headers.get("content-type") || "";
  if (!response.ok || !contentType.startsWith("image/png")) {
    failures.push(`${route}: social image returned ${response.status} ${contentType}.`);
    continue;
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const width = view.getUint32(16);
  const height = view.getUint32(20);
  if (width !== 1200 || height !== 630) {
    failures.push(`${route}: social image is ${width}×${height}; expected 1200×630.`);
  }

  for (const [label, region] of [
    ["brand", { left: 48, top: 40, width: 260, height: 86 }],
    ["footer", { left: 48, top: 520, width: 250, height: 80 }],
    ["photography", { left: 700, top: 40, width: 430, height: 550 }],
  ]) {
    const variation = await regionVariation(bytes, region);
    if (variation < 4) {
      failures.push(`${route}: generated social card is missing visible ${label}.`);
    }
  }
}

if (failures.length > 0) {
  console.error("Rendered social metadata audit failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Rendered Open Graph and Twitter metadata verified across ${routes.length} indexable routes with ${imageRoutes.size} unique 1200×630 social cards.`,
);
