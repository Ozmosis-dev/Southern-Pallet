import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import JsonLd from "@/components/seo/json-ld";
import {
  BUSINESS_ID,
  CONTACT,
  CORPORATE_OFFICE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  LEGAL_NAME,
  MANUFACTURING_FACILITY,
  SERVICE_STATES,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
  absoluteUrl,
} from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const publicBody = Manrope({
  variable: "--font-public-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Wood Pallet Supplier in Alabama & Mississippi | Southern Pallet",
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Pallet manufacturing and recycling",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Wood Pallet Supplier in Alabama & Mississippi",
    description: DEFAULT_DESCRIPTION,
    siteName: SITE_NAME,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wood Pallet Supplier in Alabama & Mississippi",
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/southern_pallet_favicon.png", type: "image/png", sizes: "32x32" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#1e4a2b",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": BUSINESS_ID,
      name: SITE_NAME,
      legalName: LEGAL_NAME,
      alternateName: "Southern Pallet Recycling",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/southern-pallet-logo.png"),
        width: 1076,
        height: 309,
      },
      image: absoluteUrl(DEFAULT_OG_IMAGE.url),
      description: DEFAULT_DESCRIPTION,
      telephone: CONTACT.phone,
      email: CONTACT.email,
      address: {
        "@type": "PostalAddress",
        ...CORPORATE_OFFICE,
      },
      location: [
        {
          "@type": "Place",
          name: "Southern Pallet Corporate Office",
          address: {
            "@type": "PostalAddress",
            ...CORPORATE_OFFICE,
          },
        },
        {
          "@type": "Place",
          name: "Southern Pallet Manufacturing and Recycling Facility",
          address: {
            "@type": "PostalAddress",
            ...MANUFACTURING_FACILITY,
          },
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: CONTACT.phone,
        email: CONTACT.email,
        contactType: "sales and customer service",
        areaServed: "US",
        availableLanguage: "English",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "07:00",
        closes: "16:00",
      },
      areaServed: SERVICE_STATES.map((name) => ({
        "@type": "State",
        name,
      })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Pallet products and services",
        itemListElement: [
          "New and custom wood pallets",
          "Recycled wood pallets",
          "Heat-treated pallets",
          "Pallet repair",
          "Pallet recycling and buyback",
          "Regional pallet delivery",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: {
        "@id": BUSINESS_ID,
      },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <html lang="en">
      <head>
        <JsonLd data={organizationSchema} />

        {/* Google Tag Manager — set NEXT_PUBLIC_GTM_ID to enable, see README.md */}
        {gtmId && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        )}
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${publicBody.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
      {googleAnalyticsId && <GoogleAnalytics gaId={googleAnalyticsId} />}
    </html>
  );
}
