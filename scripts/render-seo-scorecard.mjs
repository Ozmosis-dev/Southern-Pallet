import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import assert from "node:assert/strict";

const directory = "docs/seo";
const readJson = path => JSON.parse(readFileSync(path, "utf8"));
const source = process.argv[2] ?? readdirSync(`${directory}/snapshots`)
  .filter(file => file.endsWith(".json"))
  .map(file => ({ path: `${directory}/snapshots/${file}`, time: Date.parse(readJson(`${directory}/snapshots/${file}`).extractedAt) }))
  .sort((a, b) => b.time - a.time)[0]?.path;
assert.ok(source, "A private SEO snapshot is required.");
const data = readJson(source);
const contract = readJson(`${directory}/contract.json`);
const actions = readJson(`${directory}/actions.json`).actions;
assert.equal(data.filters.property, contract.property);
assert.equal(data.reportingWindows?.length, 3, "Refresh the snapshot with previous month, month to date, and trailing 90-day actuals.");
assert.equal(new Set(data.indexing.map(row => row.path)).size, data.indexing.length);
const windows = data.reportingWindows;
const [previous, current, trailing] = windows;
assert.deepEqual(windows.map(row => row.id), ["previous_month", "month_to_date", "trailing_90_days"]);
assert.equal(current.end, trailing.end, "MTD and trailing 90 days must share the same cutoff.");
const value = number => number == null ? "Unavailable" : String(number);
const metric = (label, group, key, suffix = "") => `| ${label} | ${windows.map(window => window[group]?.[key] == null ? "Unavailable" : `${window[group][key]}${suffix}`).join(" | ")} |`;
const heading = `| Metric | Previous month (${previous.start}–${previous.end}) | Current month to date (${current.start}–${current.end}) | Trailing 90 days (${trailing.start}–${trailing.end}) |\n| --- | ---: | ---: | ---: |`;
let output = `# Southern Pallet Recycling SEO scorecard

Updated ${data.extractedAt}. Private snapshot: [${source.split("/").at(-1)}](snapshots/${source.split("/").at(-1)}). [Reporting contract](README.md). [Private ChatGPT reference](cloud-artifact.json).

## Traffic and lead baseline

GSC: Web, all countries and devices, no query/page filters for totals. GA4: session primary channel group exactly Organic Search. Month to date ends on the latest complete common reporting day, not today. These windows overlap and have different lengths; they are not equal-period growth comparisons. New tracking has no historical backfill.

${heading}
${metric("Google clicks", "gsc", "clicks")}
${metric("Google impressions", "gsc", "impressions")}
${metric("Google CTR", "gsc", "ctrPercent", "%")}
${metric("Google average position", "gsc", "position")}
${metric("Organic sessions", "ga4", "sessions")}
${metric("Organic engaged sessions", "ga4", "engagedSessions")}
${metric("Recorded sales form leads", "ga4", "generateLeadKeyEvents")}
${metric("All successful form submissions", "ga4", "formSubmissions")}
${metric("Career applications", "ga4", "jobApplications")}
${metric("Phone number clicks", "ga4", "phoneClicks")}

Sales leads use generate_lead for quote and recycling forms. form_submission counts successful completions across all three public forms; job_application_submit keeps careers separate. phone_click measures intent to call, not a connected call. New events begin at the tracking release; unavailable history is not zero. Recorded events are not CRM-qualified sales. Source extracts and exact filters are saved in the snapshot.

## Fixed keyword cohort version ${contract.version}

Keyword performance below uses ${current.start}–${current.end}. Every keyword includes US average monthly search volume and separate local demand, with provider, geography, source period and retrieval date when available. Search Console impressions measure this website's exposure and are never substituted for market search volume. ${data.keywordVolumes?.status ?? "Volume source unavailable."}

| Query | US monthly searches | Local monthly searches | MTD clicks | MTD impressions | MTD position |
| --- | ---: | ---: | ---: | ---: | ---: |
`;
for (const queries of Object.values(contract.cohorts)) for (const query of queries) {
  const row = current.queryRows.find(row => row[0] === query);
  const volume = data.keywordVolumes?.rows?.find(row => row.query === query);
  output += `| ${query} | ${value(volume?.usMonthlySearches)} | ${value(volume?.localMonthlySearches)} | ${row ? row[1] : "Not reported"} | ${row ? row[2] : "Not reported"} | ${row ? row[4] : "Not reported"} |\n`;
}
output += `
## Canonical page uptake

${data.indexing.filter(row => row.status === "indexed").length} confirmed indexed out of ${data.indexing.length} inspected pages, as of ${data.indexingObservedAt ?? data.extractedAt}. These statuses are dated observations, not a fresh inspection at every rendering. Accepted requests do not guarantee indexing.

| Canonical path | Last observed Google status | Index request |
| --- | --- | --- |
${data.indexing.map(row => `| ${row.path} | ${row.status} | ${row.request ?? "Not submitted"} |`).join("\n")}

See [page ledger](pages.json) for first-observed uptake, and [release log](release-log.md) for publication and verification evidence.

## Next actions in priority order

Each weekly run must reconcile this ledger, preserve incomplete work, validate completion evidence, update priorities and prepare up to three runnable approval prompts. Human approval of a prompt requesting a new chat authorizes that chat; do not duplicate a chat already attached to the action. Browser use is available within approved scope.
`;
for (const action of [...actions].filter(row => row.status !== "done").sort((a, b) => a.priority - b.priority)) {
  output += `\n### ${action.id} ${action.title}\n\nStatus: ${action.status}. ${action.scope}\n\nCompletion evidence required: ${action.acceptance}\n`;
  if (action.priority <= 3) output += `\n\`\`\`codex-prompt\n${action.prompt}\n\`\`\`\n`;
}
writeFileSync(`${directory}/scorecard.md`, output);
console.log(`Rendered three-window scorecard with ${Object.values(contract.cohorts).flat().length} keyword volume slots and ${actions.filter(row => row.status !== "done").length} carried actions.`);
