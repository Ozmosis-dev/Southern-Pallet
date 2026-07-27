import type { Metadata, Viewport } from "next";
import {
  Barlow_Condensed,
  Geist,
  Geist_Mono,
  Manrope,
} from "next/font/google";
import "./globals.css";
import Script from "next/script";

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

const publicDisplay = Barlow_Condensed({
  variable: "--font-public-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.southernpalletcompany.com'),
  // Canonical URLs are now set in each page file
  // This ensures each page has its own specific canonical URL
  // The root layout no longer sets a default canonical URL
  title: {
    default: "New & Used Wooden Pallets | Southern Pallet",
    template: "%s | Southern Pallet"
  },
  description:
    "Southern Pallet is your trusted supplier for durable and affordable new and recycled wooden pallets. We offer fast delivery and pallet management solutions across Alabama, Mississippi, and the Southeast.",
  keywords: [
    "wooden pallets",
    "new pallets", 
    "used pallets",
    "recycled pallets",
    "pallet supplier",
    "Alabama pallets",
    "Mississippi pallets",
    "Southeast pallets",
    "pallet delivery",
    "pallet recycling"
  ],
  authors: [{ name: "Southern Pallet" }],
  creator: "Southern Pallet",
  publisher: "Southern Pallet",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://www.southernpalletcompany.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.southernpalletcompany.com',
    title: 'New & Used Wooden Pallets | Southern Pallet',
    description: 'Southern Pallet is your trusted supplier for durable and affordable new and recycled wooden pallets. We offer fast delivery and pallet management solutions.',
    siteName: 'Southern Pallet',
    images: [
      {
        url: '/southern_pallet_og_image.png',
        width: 1200,
        height: 630,
        alt: 'Southern Pallet - Wooden Pallet Supplier',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New & Used Wooden Pallets | Southern Pallet',
    description: 'Southern Pallet is your trusted supplier for durable and affordable new and recycled wooden pallets. We offer fast delivery and pallet management solutions.',
    images: ['/southern_pallet_og_image.png'],
    creator: '@southernpallet',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'US-AL',
    'geo.placename': 'Theodore, Alabama',
    'geo.position': '30.5433;-88.1838',
    'ICBM': '30.5433, -88.1838',
    'business:contact_data:locality': 'Theodore',
    'business:contact_data:region': 'Alabama',
    'business:contact_data:postal_code': '36582',
    'business:contact_data:country_name': 'United States',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/southern_pallet_favicon.png" />
        <link rel="canonical" href="https://www.southernpalletcompany.com" />
        
        {/* Schema.org JSON-LD */}
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Southern Pallet",
              "alternateName": "Southern Pallet Company",
              "url": "https://www.southernpalletcompany.com",
              "logo": "https://www.southernpalletcompany.com/southern-pallet-logo.png",
              "description": "Southern Pallet is your trusted supplier for durable and affordable new and recycled wooden pallets.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "5695 Rabbit Creek Dr Ste 101",
                "addressLocality": "Theodore",
                "addressRegion": "AL",
                "postalCode": "36582",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-601-746-5012",
                "contactType": "customer service",
                "email": "info@southernpallet.co",
                "areaServed": ["US-AL", "US-MS", "US-TN", "US-GA", "US-FL"],
                "availableLanguage": "English"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "30.5433",
                "longitude": "-88.1838"
              },
              "sameAs": [
                "https://www.southernpalletcompany.com"
              ],
              "foundingDate": "2020",
              "numberOfEmployees": "10-50",
              "industry": "Pallet Manufacturing and Recycling",
              "services": ["New Pallet Manufacturing", "Pallet Recycling", "Pallet Delivery", "Pallet Management Solutions"]
            })
          }}
        />

        {/* Local Business Schema */}
        <Script
          id="schema-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://www.southernpalletcompany.com/#business",
              "name": "Southern Pallet",
              "image": "https://www.southernpalletcompany.com/southern-pallet-logo.png",
              "telephone": "+1-601-746-5012",
              "email": "info@southernpallet.co",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "5695 Rabbit Creek Dr Ste 101",
                "addressLocality": "Theodore",
                "addressRegion": "AL",
                "postalCode": "36582",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "30.5433",
                "longitude": "-88.1838"
              },
              "url": "https://www.southernpalletcompany.com",
              "sameAs": [
                "https://www.southernpalletcompany.com"
              ],
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "07:00",
                "closes": "16:00"
              },
              "priceRange": "$$",
              "description": "Southern Pallet is your trusted supplier for durable and affordable new and recycled wooden pallets.",
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "30.5433",
                  "longitude": "-88.1838"
                },
                "geoRadius": "500000"
              }
            })
          }}
        />

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
        className={`${geistSans.variable} ${geistMono.variable} ${publicBody.variable} ${publicDisplay.variable} antialiased`}
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
    </html>
  );
}
