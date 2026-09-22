const baseUrl = process.env.SITE_URL || "http://127.0.0.1:3000";
const productionOrigin = "https://southernpallet.co";
const keyDestinations = ["/#products", "/#about", "/contact"];
const genericAnchorText = /^(?:click here|here|learn more|read more|more|details)$/i;

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&nbsp;", " ");
}

function stripMarkup(value) {
  return decodeHtml(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function getAttribute(attributes, name) {
  const match = attributes.match(
    new RegExp(`(?:^|\\s)${name}=(?:"([^"]*)"|'([^']*)')`, "i"),
  );
  return decodeHtml(match?.[1] ?? match?.[2] ?? "");
}

function normalizeInternalHref(href, currentPath) {
  if (!href || /^(?:mailto:|tel:|javascript:)/i.test(href)) return null;

  const currentUrl = new URL(currentPath, baseUrl);
  const url = new URL(href, currentUrl);
  if (![baseUrl, productionOrigin].includes(url.origin)) return null;

  return {
    path: url.pathname.replace(/\/$/, "") || "/",
    hash: url.hash,
    destination: `${url.pathname.replace(/\/$/, "") || "/"}${url.hash}`,
  };
}

function extractLinks(html, currentPath) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)]
    .map(([, attributes, content]) => {
      const href = getAttribute(attributes, "href");
      const normalized = normalizeInternalHref(href, currentPath);
      return normalized ? { ...normalized, href, text: stripMarkup(content) } : null;
    })
    .filter(Boolean);
}

const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
if (!sitemapResponse.ok) {
  throw new Error(`Could not load sitemap.xml (${sitemapResponse.status}).`);
}

const sitemap = await sitemapResponse.text();
const routes = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map(
  ([, path]) => path.replace(/\/$/, "") || "/",
);
const routeSet = new Set(routes);
const pages = new Map();
const failures = [];

for (const route of routes) {
  const response = await fetch(`${baseUrl}${route}`);
  if (!response.ok) {
    failures.push(`${route}: returned ${response.status}.`);
    continue;
  }

  const html = await response.text();
  const mainHtml = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
  pages.set(route, {
    html,
    allLinks: extractLinks(html, route),
    mainLinks: extractLinks(mainHtml, route),
  });
}

for (const [route, page] of pages) {
  for (const link of page.allLinks) {
    if (!routeSet.has(link.path)) {
      failures.push(`${route}: internal link points to a non-indexable or missing route (${link.href}).`);
      continue;
    }

    if (link.hash) {
      const targetHtml = pages.get(link.path)?.html ?? "";
      const id = link.hash.slice(1).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (!new RegExp(`\\sid=["']${id}["']`, "i").test(targetHtml)) {
        failures.push(`${route}: link target ${link.destination} does not exist.`);
      }
    }

    if (genericAnchorText.test(link.text)) {
      failures.push(`${route}: replace generic anchor text “${link.text}” for ${link.destination}.`);
    }
  }
}

const graph = new Map(
  [...pages].map(([route, page]) => [
    route,
    new Set(page.allLinks.map((link) => link.path).filter((path) => routeSet.has(path))),
  ]),
);
const depth = new Map([["/", 0]]);
const queue = ["/"];
while (queue.length > 0) {
  const route = queue.shift();
  for (const destination of graph.get(route) ?? []) {
    if (!depth.has(destination)) {
      depth.set(destination, depth.get(route) + 1);
      queue.push(destination);
    }
  }
}

for (const route of routes) {
  if (!depth.has(route)) failures.push(`${route}: orphaned from the homepage crawl.`);
  else if (depth.get(route) > 2) {
    failures.push(`${route}: requires ${depth.get(route)} clicks from the homepage; maximum is 2.`);
  }

  if (route !== "/") {
    const inbound = [...graph].filter(
      ([source, destinations]) => source !== route && destinations.has(route),
    );
    if (inbound.length === 0) failures.push(`${route}: has no inbound link from another indexable page.`);
  }
}

for (const destination of keyDestinations) {
  const homepageLink = pages.get("/")?.allLinks.some((link) => link.destination === destination);
  if (!homepageLink) failures.push(`Homepage does not link directly to ${destination}.`);
}

const contextualKeyLinks = new Map(keyDestinations.map((destination) => [destination, []]));
for (const [route, page] of pages) {
  const routeKeyLinks = page.mainLinks.filter(
    (link) => keyDestinations.includes(link.destination) && link.path !== route,
  );

  if (route !== "/" && routeKeyLinks.length === 0) {
    failures.push(`${route}: main content has no contextual link to Products, About, or Contact.`);
  }

  for (const link of routeKeyLinks) {
    contextualKeyLinks.get(link.destination).push({ route, text: link.text });
    if (link.text.length < 12 || genericAnchorText.test(link.text)) {
      failures.push(`${route}: use more descriptive anchor text for ${link.destination}.`);
    }
  }
}

for (const [destination, links] of contextualKeyLinks) {
  if (links.length < 3) {
    failures.push(`${destination}: has only ${links.length} contextual inbound links; expected at least 3.`);
  }
}

if (failures.length > 0) {
  console.error("Internal linking audit failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Internal linking audit passed.\n");
for (const route of routes) {
  const inboundCount = [...graph].filter(
    ([source, destinations]) => source !== route && destinations.has(route),
  ).length;
  console.log(
    `${route}: depth ${depth.get(route)}, ${inboundCount} inbound route${inboundCount === 1 ? "" : "s"}`,
  );
}
console.log("\nContextual links to key destinations:");
for (const [destination, links] of contextualKeyLinks) {
  console.log(`${destination}: ${links.length}`);
}
