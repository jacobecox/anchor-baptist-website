export const metadata = {
  title: 'More Resources - Anchor Baptist Church Simi Valley',
  description: 'Additional resources and information from Anchor Baptist Church in Simi Valley, CA. Find events, contact information, and more about our Bible-believing Baptist church.',
  keywords: 'church resources, Simi Valley church information, Baptist church resources, church contact, church events, church activities, Simi Valley California',
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://calvarybaptistsv.org/more',
    siteName: 'Anchor Baptist Church Simi Valley',
    title: 'More Resources - Anchor Baptist Church Simi Valley',
    description: 'Additional resources and information from Anchor Baptist Church in Simi Valley, CA. Find events, contact information, and more about our Bible-believing Baptist church.',
    images: [
      {
        url: 'https://calvarybaptistsv.org/anchor-baptist.png',
        width: 1200,
        height: 630,
        alt: 'Anchor Baptist Church Resources',
      },
    ],
  },
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'More Resources - Anchor Baptist Church Simi Valley',
    description: 'Additional resources and information from Anchor Baptist Church in Simi Valley, CA. Find events, contact information, and more about our Bible-believing Baptist church.',
    images: ['https://calvarybaptistsv.org/anchor-baptist.png'],
    creator: '@calvarybaptistsv',
  },
  // Canonical URL
  alternates: {
    canonical: 'https://calvarybaptistsv.org/more',
  },
};

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://calvarybaptistsv.org/more/#webpage",
      "name": "More Resources",
      "description": "Additional resources and information from Anchor Baptist Church in Simi Valley, CA. Find events, contact information, and more about our Bible-believing Baptist church.",
      "url": "https://calvarybaptistsv.org/more",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://calvarybaptistsv.org/#website",
        "name": "Anchor Baptist Church Simi Valley",
        "url": "https://calvarybaptistsv.org"
      },
      "about": {
        "@type": "Thing",
        "name": "Church Resources and Information"
      },
      "mainEntity": {
        "@type": "ItemList",
        "name": "Church Resources",
        "description": "Additional resources and information about Anchor Baptist Church",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "WebPage",
              "name": "Church Events",
              "url": "https://calvarybaptistsv.org/events"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "WebPage",
              "name": "Contact Information",
              "url": "https://calvarybaptistsv.org"
            }
          }
        ]
      }
    }
  ]
};

export default function MoreLayout({ children }) {
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