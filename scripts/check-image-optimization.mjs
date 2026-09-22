import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const projectRoot = process.cwd();
const sourceRoots = ["app", "components"];
const sourceExtensions = new Set([".js", ".jsx", ".ts", ".tsx"]);
const errors = [];

const nextConfig = readFileSync(join(projectRoot, "next.config.ts"), "utf8");
if (!/formats\s*:\s*\[[^\]]*["']image\/webp["']/.test(nextConfig)) {
  errors.push("next.config.ts: explicitly enable WebP output for optimized images.");
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

for (const sourceRoot of sourceRoots) {
  for (const file of walk(join(projectRoot, sourceRoot))) {
    if (!sourceExtensions.has(extname(file))) continue;

    const source = readFileSync(file, "utf8");
    const displayPath = relative(projectRoot, file);

    if (/<img\b/i.test(source)) {
      errors.push(`${displayPath}: use next/image instead of a raw <img> element.`);
    }

    for (const match of source.matchAll(/<Image\b[\s\S]*?\/>/g)) {
      const image = match[0];
      const line = source.slice(0, match.index).split("\n").length;

      if (!/\balt\s*=/.test(image)) {
        errors.push(`${displayPath}:${line}: Image is missing alt text.`);
      }

      const literalAlt = image.match(/\balt\s*=\s*["']([^"']*)["']/)?.[1];
      if (literalAlt !== undefined && /^(?:image|photo|picture|logo)$/i.test(literalAlt.trim())) {
        errors.push(`${displayPath}:${line}: replace generic alt text with a useful description.`);
      }

      if (/\bfill\b/.test(image) && !/\bsizes\s*=/.test(image)) {
        errors.push(`${displayPath}:${line}: fill Image is missing a responsive sizes value.`);
      }

      if (!/\bfill\b/.test(image)) {
        const hasDimensions = /\bwidth\s*=/.test(image) && /\bheight\s*=/.test(image);
        if (!hasDimensions) {
          errors.push(`${displayPath}:${line}: Image needs width and height to prevent layout shift.`);
        }
      }
    }
  }
}

for (const file of walk(join(projectRoot, "public"))) {
  const displayPath = relative(projectRoot, file);
  const extension = extname(file).toLowerCase();

  if (extension === ".svg") {
    const source = readFileSync(file, "utf8");
    if (/data:image\/(?:png|jpe?g|webp);base64/i.test(source)) {
      errors.push(`${displayPath}: embedded raster photo should be served as an optimized raster asset.`);
    }
  }

  if ([".jpg", ".jpeg", ".png"].includes(extension) && statSync(file).size > 1024 * 1024) {
    errors.push(`${displayPath}: raster source exceeds 1 MB and should be compressed.`);
  }
}

if (errors.length > 0) {
  console.error("Image optimization audit failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Image optimization audit passed.");
