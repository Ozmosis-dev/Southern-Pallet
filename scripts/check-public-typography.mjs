import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const hero = await readFile(new URL("../components/hero-section.tsx", import.meta.url), "utf8");
const environmental = await readFile(
  new URL("../components/environmental-section.tsx", import.meta.url),
  "utf8",
);

assert.doesNotMatch(
  layout,
  /Barlow_Condensed/,
  "public pages should not load the compressed Barlow Condensed display face",
);
assert.doesNotMatch(
  layout,
  /\bGeist(?:_Mono)?\b/,
  "the global layout should not preload unused Geist fonts",
);
assert.match(
  styles,
  /\.public-site \.sp-display[\s\S]*?font-weight:\s*600;/,
  "display typography should use a readable semibold weight",
);
assert.match(
  styles,
  /\.public-site \.sp-display[\s\S]*?line-height:\s*1\.08;/,
  "display typography should use a more open line height",
);
assert.doesNotMatch(
  hero,
  /lg:text-(?:7xl|8xl|9xl)|lg:text-\[[^\]]+rem\]/,
  "the homepage hero should cap its desktop headline at 6xl",
);
assert.doesNotMatch(
  environmental,
  /sm:text-(?:7xl|8xl|9xl)|sm:text-\[[^\]]+rem\]/,
  "the environmental stat should cap its display size at 6xl",
);

console.log("Public typography uses the simplified, readable scale.");
