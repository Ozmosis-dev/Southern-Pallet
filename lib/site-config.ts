export const SITE_NAME = "Southern Pallet";
export const LEGAL_NAME = "Southern Pallet Company";
export const SITE_URL = "https://southernpallet.co";
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const DEFAULT_DESCRIPTION =
  "Southern Pallet supplies new, recycled, and custom wood pallets with regional delivery, repair, recycling, and buyback service across the Southeast.";

export const DEFAULT_OG_IMAGE = {
  url: "/southern_pallet_og_image.png",
  width: 1200,
  height: 850,
  alt: "Southern Pallet wood pallet manufacturing and recycling services",
} as const;

export const CONTACT = {
  phoneDisplay: "(601) 746-5012",
  phone: "+16017465012",
  email: "info@southernpallet.co",
} as const;

export const CORPORATE_OFFICE = {
  streetAddress: "5695 Rabbit Creek Dr Ste 101",
  addressLocality: "Theodore",
  addressRegion: "AL",
  postalCode: "36582",
  addressCountry: "US",
} as const;

export const MANUFACTURING_FACILITY = {
  streetAddress: "119 Industrial Park Dr",
  addressLocality: "Poplarville",
  addressRegion: "MS",
  postalCode: "39470",
  addressCountry: "US",
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
