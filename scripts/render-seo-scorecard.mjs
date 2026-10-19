import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import assert from "node:assert/strict";

const directory = "docs/seo";
const source = process.argv[2] ?? `${directory}/snapshots/${readdirSync(`${directory}/snapshots`).filter(f=>f.endsWith('.json')).sort().at(-1)}`;
const data = JSON.parse(readFileSync(source, "utf8"));
const contract = JSON.parse(readFileSync(`${directory}/contract.json`, "utf8"));
assert.equal(data.schemaVersion, 1);
assert.equal(data.filters.property, contract.property);
assert.equal(data.period.days, 28);
assert.ok(data.comparison.end < data.period.start, "comparison must not overlap current period");
assert.equal(new Set(data.indexing.map(r=>r.path)).size, data.indexing.length, "inspection paths must be unique");
assert.equal(new Set(Object.values(contract.cohorts).flat()).size, Object.values(contract.cohorts).flat().length, "fixed queries must be unique");
const value = x => x == null ? "Not reported" : String(x);
const delta = (a,b) => a == null || b == null ? "Unavailable" : `${a-b>0?'+':''}${a-b}${b ? ` (${((a-b)/b*100).toFixed(1)}%)` : ''}`;
const metricRow = (label,key,suffix='') => `| ${label} | ${value(data.totals[key])}${suffix} | ${value(data.comparison.totals[key])}${suffix} | ${key==='ctrPercent' ? `${(data.totals[key]-data.comparison.totals[key]).toFixed(1)} percentage points` : key==='position' ? `${(data.totals[key]-data.comparison.totals[key]).toFixed(1)} positions` : delta(data.totals[key],data.comparison.totals[key])} |`;
let output = `# Southern Pallet Recycling SEO scorecard

Updated ${data.extractedAt}. Source snapshot: [${source.split('/').at(-1)}](snapshots/${source.split('/').at(-1)}). Reporting contract: [weekly workflow](README.md). Private ChatGPT copy: see [cloud artifact](cloud-artifact.json).

## Traffic and lead baseline

Google Search Console, Web, all countries and devices. Current ${data.period.start}–${data.period.end}; preceding ${data.comparison.start}–${data.comparison.end}, inclusive. ${data.period.end < data.postReleaseUptake.releaseDate ? 'This window predates the content release; it cannot measure the new content’s uptake.' : 'Interpret new-content uptake alongside release dates and confirmed indexing dates.'}

| Metric | Current 28 days | Prior 28 days | Change |
| --- | ---: | ---: | ---: |
${metricRow('Google clicks','clicks')}
${metricRow('Google impressions','impressions')}
${metricRow('CTR','ctrPercent','%')}
${metricRow('Average position','position')}

GA4 property ${data.ga4.propertyId}, ${data.ga4.period.start}–${data.ga4.period.end}, session channel exactly Organic Search: **${value(data.ga4.sessions)} sessions, ${value(data.ga4.engagedSessions)} engaged sessions, ${value(data.ga4.generateLeadKeyEvents)} recorded generate_lead key events**. Qualified leads are unavailable. Prior GA4 comparison is not yet captured. Recorded events are not confirmed sales or exact-query attribution.

${data.ga4.landingPages ? `| Organic landing page | Sessions | Recorded lead events |\n| --- | ---: | ---: |\n${data.ga4.landingPages.map(r=>`| ${r.path} | ${r.sessions} | ${r.generateLeadKeyEvents} |`).join('\n')}` : 'Organic landing-page breakdown unavailable.'}

Seven-day search ${data.sevenDayGsc?.start ?? 'unavailable'}–${data.sevenDayGsc?.end ?? 'unavailable'}: ${value(data.sevenDayGsc?.clicks)} clicks, ${value(data.sevenDayGsc?.impressions)} impressions. GA4 ${data.ga4.sevenDay?.start ?? 'unavailable'}–${data.ga4.sevenDay?.end ?? 'unavailable'}: ${value(data.ga4.sevenDay?.sessions)} organic sessions; retain each source’s exact dates.

## Fixed keyword cohort version ${contract.version}

Exact queries; ${data.coverage.queryRows} visible query rows captured (limit ${data.coverage.rowLimit}). Not reported means no visible row, not proven zero. Positions describe this property's observed search mix, not a local rank tracker. No monthly market-volume estimate is available.

| Cohort and query | Clicks | Impressions | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
`;
for(const [cohort,queries] of Object.entries(contract.cohorts)) for(const query of queries) {
  const row=data.queries.find(r=>r.key===query);
  output+=`| ${cohort}: ${query} | ${value(row?.clicks)} | ${value(row?.impressions)} | ${row?row.ctrPercent+'%':'Not reported'} | ${value(row?.position)} |\n`;
}
output+=`
## Canonical page uptake

${data.indexing.filter(r=>r.status==='indexed').length} confirmed indexed out of ${data.indexing.length} inspected canonical pages. Index status is from individual inspection recorded in this snapshot; historical impressions do not prove current index status. Requests below are queue submissions, not indexing guarantees.

| Canonical path | Google status | Index request | Baseline clicks / impressions |
| --- | --- | --- | --- |
`;
for(const row of data.indexing) {
  const observed=data.pages.find(p=>p.key===`https://southernpallet.co${row.path}`);
  output+=`| ${row.path} | ${row.status} | ${row.request ?? 'Not submitted'} | ${observed?`${observed.clicks} / ${observed.impressions}`:'Not reported'} |\n`;
}
output+=`
Keep historical www and fragment rows in the JSON snapshot; do not add them into property totals. See [release log](release-log.md) for deployment and new-page submission updates after this snapshot.

## Next actions in priority order

1. Recheck priority URL indexing, live fetch, and selected canonicals at the next weekly review. Goal: all eligible public canonical pages indexed; preserve intentional noindex pages. Do not repeatedly resubmit accepted requests.
2. Measure whether recycling queries move from the homepage to /recycle-pallets and gain clicks. Follow the fixed exact-query cohort and the canonical page rows above.
3. Track the new supply, Poplarville, grade guide, and heat-treated page for first observed crawl/index, impressions, clicks, and organic leads. First 28-day publication window: October 20–November 16; review after GSC data is complete (November 19 or later), then compare once two comparable post-release windows exist.
4. Treat heat-treated supply as a limited product test. See the private snapshot's productValidation evidence; observed exposure is not evidence of high regional volume. Validate geographic monthly demand before expanding city pages. Confirm city-specific service facts before publishing market pages.
5. Review recorded lead quality and unknown landing-page attribution. GA4 timezone and preceding-period lead actuals still need capture. The GA4 home screen recommends linking Search Console; integration remains a follow-up, not a blocker to separate source reports.

No traffic target or causal lift claim has been invented. Weekly review thresholds and measurement definitions are in README.md.
`;
writeFileSync(`${directory}/scorecard.md`,output);
console.log(`Rendered scorecard from ${source}: ${Object.values(contract.cohorts).flat().length} fixed queries, ${data.indexing.length} inspected pages.`);
