export const metadata = {
  title: 'Church Events - Anchor Baptist Church Simi Valley',
  description: 'Stay updated with upcoming events, special services, and activities at Anchor Baptist Church in Simi Valley, CA. Join us for fellowship and worship.',
  keywords: 'church events, Simi Valley church events, Baptist church activities, church calendar, Sunday school, Bible study, church fellowship, Simi Valley California',
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://calvarybaptistsv.org/events',
    siteName: 'Anchor Baptist Church Simi Valley',
    title: 'Church Events - Anchor Baptist Church Simi Valley',
    description: 'Stay updated with upcoming events, special services, and activities at Anchor Baptist Church in Simi Valley, CA. Join us for fellowship and worship.',
    images: [
      {
        url: 'https://calvarybaptistsv.org/anchor-baptist-logo.png',
        width: 1200,
        height: 630,
        alt: 'Anchor Baptist Church Events Calendar',
      },
    ],
  },
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Church Events - Anchor Baptist Church Simi Valley',
    description: 'Stay updated with upcoming events, special services, and activities at Anchor Baptist Church in Simi Valley, CA. Join us for fellowship and worship.',
    images: ['https://calvarybaptistsv.org/anchor-baptist-logo.png'],
    creator: '@calvarybaptistsv',
  },
  // Canonical URL
  alternates: {
    canonical: 'https://calvarybaptistsv.org/events',
  },
};

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://calvarybaptistsv.org/events/#webpage",
      "name": "Church Events",
      "description": "Stay updated with upcoming events, special services, and activities at Anchor Baptist Church in Simi Valley, CA. Join us for fellowship and worship.",
      "url": "https://calvarybaptistsv.org/events",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://calvarybaptistsv.org/#website",
        "name": "Anchor Baptist Church Simi Valley",
        "url": "https://calvarybaptistsv.org"
      },
      "about": {
        "@type": "Thing",
        "name": "Church Events and Activities"
      },
      "mainEntity": {
        "@type": "ItemList",
        "name": "Upcoming Church Events",
        "description": "Calendar of upcoming events and activities at Anchor Baptist Church",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "Event",
              "name": "Sunday Morning Service",
              "description": "Weekly Sunday morning worship service",
              "startDate": "2024-01-01T12:00:00",
              "endDate": "2024-01-01T13:00:00",
              "location": {
                "@type": "Place",
                "name": "Anchor Baptist Church",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "9 West Bonita Drive",
                  "addressLocality": "Simi Valley",
                  "addressRegion": "CA",
                  "postalCode": "93065"
                }
              }
            }
          }
        ]
      }
    }
  ]
};

export default function EventsLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      {children}
    </>
  );
} 