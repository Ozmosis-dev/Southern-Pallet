# Google Search Console reconciled baseline

Audit date: 2026-09-22

## Decision

The reporting source of truth is the verified domain property `sc-domain:southernpallet.co`.

The previously supplied `6 clicks / 78 impressions / 30.4 average position` summary is rejected as a site-wide baseline. It does not match the live domain property for the stated 2026-07-18 through 2026-08-14 window, and its originating property, filters, aggregation type, and extraction timestamp are not present in this repository.

The `trendingPages` values are page-aggregated diagnostics. They must not be summed or compared directly with a property-aggregated site total. Google Search Console can count a search once in the property chart while attributing impressions to multiple URLs in the Pages table.

## Property audit

- Verified property used: `sc-domain:southernpallet.co`
- Property type: Domain property
- Search type: Web
- Filters: none
- Date ranges: inclusive
- URL-prefix properties for either `https://www.southernpallet.co/` or `https://southernpallet.co/` were not present in the signed-in property selector.
- No new property needs to be added; the required domain property already exists.

The domain property is preferred for site-wide reporting because it combines both `www` and non-`www` URLs. Page-level rows remain useful for diagnosing hostname duplication but are not site totals.

## Reconciliation of the disputed window

Window: 2026-07-18 through 2026-08-14 (28 days)

| Reporting grain | Clicks | Impressions | CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| Domain-property chart | 41 | 900 | 4.6% | 23.3 |
| Sum of all 13 visible Pages rows | 42 | 1,606 | Not applicable | Not applicable |
| `https://www.southernpallet.co/` page row | 39 | 779 | Not used | Not used |

The property total and the Pages-row sum are not expected to match. The live property result also proves that the earlier `6 / 78 / 30.4` object came from a different property, date range, filter set, aggregation mode, or stale extraction.

The original window includes 10 days before the approximately 2026-07-28 launch. It should be retained only as a historical bridge window, not used as the clean post-launch baseline.

## Period-over-period delta check

Comparison: 2026-07-18 through 2026-08-14 versus the preceding 28 days, 2026-06-20 through 2026-07-17.

| Metric | Current | Previous | Change |
| --- | ---: | ---: | ---: |
| Domain-property clicks | 41 | 21 | +20 |
| Domain-property impressions | 900 | 832 | +68 |
| Domain-property average position | 23.3 | 22.8 | +0.5 |
| `www` homepage clicks | 39 | 20 | +19 (+95%) |
| `www` homepage impressions | 779 | 734 | +45 |

The homepage `+19` and `+95%` fields are arithmetically correct: `(39 - 20) / 20 = 95%`. They compare the homepage row with the preceding homepage row. They are not calculated from the invalid 6-click summary.

## Client-reportable post-launch baseline

Window: 2026-07-28 through 2026-08-24 (28 days)

| Reporting grain | Clicks | Impressions | CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| Domain-property chart — client-reportable site total | 43 | 686 | 6.3% | 21.5 |
| Sum of all 13 visible Pages rows — diagnostic only | 44 | 1,178 | Not applicable | Not applicable |
| `https://www.southernpallet.co/` page row | 41 | 585 | Not used | Not used |

Use the first row as the reconciled post-launch baseline. Do not publish the Pages-row sum as a site-wide figure.

## Query continuity check

`southern pallet solutions` did not genuinely disappear from Search Console. It appears under the same domain property and Web search type in each checked period:

| Window | Clicks | Impressions |
| --- | ---: | ---: |
| 2026-07-18 through 2026-08-14 | 0 | 34 |
| 2026-07-28 through 2026-08-24 | 0 | 19 |
| 2026-08-25 through 2026-09-21 | 1 | 17 |

Its absence from the supplied `topQueries` payload was therefore a window, property, filter, row-limit, or extraction artifact—not evidence that the query left Search Console.

## Reporting contract

Every future GSC payload should save these fields beside the metrics:

- `siteUrl` / property identifier
- property type (`sc-domain` or URL-prefix)
- inclusive current start and end dates
- inclusive comparison start and end dates
- search type
- all query, page, country, device, and search-appearance filters
- aggregation type (`byProperty` or `byPage`)
- data state (`final` or fresh/incomplete)
- row limit, sort order, and extraction timestamp
- separate fields for property-chart totals and page-table rows

Rules:

1. Report site-wide clicks, impressions, CTR, and average position only from the same property-aggregated response with no page dimension.
2. Never calculate site-wide average position by averaging page-row positions.
3. Label page-table figures as URL diagnostics and do not sum them into a site total.
4. Compare periods only when property, search type, filters, aggregation, and duration are identical.
5. Keep the 2026-07-28 launch boundary visible in any historical report.

## Repository lineage

No Search Console client, API request, `trendingPages` object, `topQueries` object, date-range builder, or delta calculation exists in this repository or its Git history. The contradictory payload was generated by an external reporting connector or dashboard and must be corrected at that source using the reporting contract above.

Repository chronology also supports treating 2026-07-28 as a boundary: the initial repository commit is dated 2026-07-26, and the SEO foundation work was committed on 2026-08-03. The earlier portion of the disputed window can include legacy-site data.

## Method references

- [Google Search Console Performance report: About the data](https://support.google.com/webmasters/answer/17011364?hl=en)
- [Google Search Console Performance report overview](https://support.google.com/webmasters/answer/7576553?hl=en)
- [Google Search Console discrepancy troubleshooting](https://support.google.com/webmasters/answer/17010575?hl=en)
- [Search Analytics API query reference](https://developers.google.com/webmaster-tools/v1/searchanalytics/query)
