export const SITE_NAME = "Southern Pallet Recycling";
export const LEGAL_NAME = SITE_NAME;
export const SITE_URL = "https://southernpallet.co";
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const DEFAULT_DESCRIPTION =
  "Southern Pallet Recycling supplies new, recycled, and custom wood pallets with regional delivery, repair, recycling, and buyback service across the Southeast.";

export const DEFAULT_OG_IMAGE = {
  url: "/social-card/v1/home",
  width: 1200,
  height: 630,
  alt: "Southern Pallet Recycling Southeast wood pallet supply and delivery",
} as const;

export const CONTACT = {
  phoneDisplay: "(601) 746-5012",
  phone: "+16017465012",
  email: "info@southernpallet.co",
} as const;

export const PRIMARY_FACILITY = {
  streetAddress: "119 Industrial Park Dr",
  addressLocality: "Poplarville",
  addressRegion: "MS",
  postalCode: "39470",
  addressCountry: "US",
} as const;

export const PRIMARY_FACILITY_GEO = {
  latitude: 30.827312000955,
  longitude: -89.524405075319,
} as const;

export const SATELLITE_OFFICE = {
  streetAddress: "5695 Rabbit Creek Dr Ste 101",
  addressLocality: "Theodore",
  addressRegion: "AL",
  postalCode: "36582",
  addressCountry: "US",
} as const;

export const SATELLITE_OFFICE_GEO = {
  latitude: 30.572143316657,
  longitude: -88.130261943997,
} as const;

export const SERVICE_STATES = [
  "Alabama",
  "Mississippi",
  "Florida",
  "Georgia",
  "Louisiana",
  "Tennessee",
  "North Carolina",
  "South Carolina",
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
