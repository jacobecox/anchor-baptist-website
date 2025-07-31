export const metadata = {
  title: 'Visit Us - Calvary Baptist Church Simi Valley',
  description: 'Plan your visit to Calvary Baptist Church in Simi Valley, CA. Find service times, directions, and what to expect when you visit our Bible-believing Baptist church.',
  keywords: 'visit church, Simi Valley church location, service times, church directions, Baptist church California, Sunday service times, church address, Simi Valley California',
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://calvarybaptistsv.org/visit',
    siteName: 'Calvary Baptist Church Simi Valley',
    title: 'Visit Us - Calvary Baptist Church Simi Valley',
    description: 'Plan your visit to Calvary Baptist Church in Simi Valley, CA. Find service times, directions, and what to expect when you visit our Bible-believing Baptist church.',
    images: [
      {
        url: 'https://calvarybaptistsv.org/synagogue.jpg',
        width: 1200,
        height: 630,
        alt: 'Calvary Baptist Church building exterior - located at 9 West Bonita Drive in Simi Valley, California',
      },
    ],
  },
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Visit Us - Calvary Baptist Church Simi Valley',
    description: 'Plan your visit to Calvary Baptist Church in Simi Valley, CA. Find service times, directions, and what to expect when you visit our Bible-believing Baptist church.',
    images: ['https://calvarybaptistsv.org/synagogue.jpg'],
    creator: '@calvarybaptistsv',
  },
  // Canonical URL
  alternates: {
    canonical: 'https://calvarybaptistsv.org/visit',
  },
};

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://calvarybaptistsv.org/visit/#localbusiness",
      "name": "Calvary Baptist Church",
      "description": "Independent, Bible-believing Baptist church in Simi Valley, CA using the King James Version (KJV) Bible",
      "url": "https://calvarybaptistsv.org",
      "telephone": "+1-805-000-0000",
      "email": "pastor@calvarybcsv.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "9 West Bonita Drive",
        "addressLocality": "Simi Valley",
        "addressRegion": "CA",
        "postalCode": "93065",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 34.268070,
        "longitude": -118.802750
      },
      "openingHours": [
        "Su 12:00-13:00",
        "Su 18:00-19:00", 
        "We 18:30-19:30"
      ],
      "priceRange": "Free",
      "paymentAccepted": "Donation",
      "currenciesAccepted": "USD",
      "image": "https://calvarybaptistsv.org/calvary-baptist-logo.png",
      "logo": "https://calvarybaptistsv.org/calvary-baptist-logo.png",
      "sameAs": [
        "https://www.facebook.com/profile.php?id=100081858694086",
        "https://www.youtube.com/@calvarybaptistchurchofsimi2174"
      ],
      "areaServed": {
        "@type": "City",
        "name": "Simi Valley"
      },
      "serviceArea": {
        "@type": "City",
        "name": "Simi Valley"
      },
      "hasMap": "https://www.google.com/maps?cid=1234567890",
      "photo": "https://calvarybaptistsv.org/synagogue.jpg"
    },
    {
      "@type": "WebPage",
      "@id": "https://calvarybaptistsv.org/visit/#webpage",
      "name": "Visit Us",
      "description": "Plan your visit to Calvary Baptist Church in Simi Valley, CA. Find service times, directions, and what to expect when you visit our Bible-believing Baptist church.",
      "url": "https://calvarybaptistsv.org/visit",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://calvarybaptistsv.org/#website",
        "name": "Calvary Baptist Church Simi Valley",
        "url": "https://calvarybaptistsv.org"
      },
      "about": {
        "@type": "Thing",
        "name": "Visiting Calvary Baptist Church"
      }
    }
  ]
};

export default function VisitLayout({ children }) {
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