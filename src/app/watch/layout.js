export const metadata = {
  title: 'Watch Live Services - Anchor Baptist Church Simi Valley',
  description: 'Watch live and recorded services from Anchor Baptist Church in Simi Valley, CA. Join us online through our YouTube channel for Bible-believing Baptist services.',
  keywords: 'watch church online, live church service, Simi Valley church live stream, Baptist church online, church YouTube, online worship, live sermon, Simi Valley California',
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://calvarybaptistsv.org/watch',
    siteName: 'Anchor Baptist Church Simi Valley',
    title: 'Watch Live Services - Anchor Baptist Church Simi Valley',
    description: 'Watch live and recorded services from Anchor Baptist Church in Simi Valley, CA. Join us online through our YouTube channel for Bible-believing Baptist services.',
    images: [
      {
        url: 'https://calvarybaptistsv.org/anchor-baptist-logo.png',
        width: 1200,
        height: 630,
        alt: 'Anchor Baptist Church Simi Valley - Watch Live Services',
      },
    ],
  },
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Watch Live Services - Anchor Baptist Church Simi Valley',
    description: 'Watch live and recorded services from Anchor Baptist Church in Simi Valley, CA. Join us online through our YouTube channel for Bible-believing Baptist services.',
    images: ['https://calvarybaptistsv.org/anchor-baptist-logo.png'],
    creator: '@calvarybaptistsv',
  },
  // Canonical URL
  alternates: {
    canonical: 'https://calvarybaptistsv.org/watch',
  },
};

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://calvarybaptistsv.org/watch/#webpage",
      "name": "Watch Live Services",
      "description": "Watch live and recorded services from Anchor Baptist Church in Simi Valley, CA. Join us online through our YouTube channel for Bible-believing Baptist services.",
      "url": "https://calvarybaptistsv.org/watch",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://calvarybaptistsv.org/#website",
        "name": "Anchor Baptist Church Simi Valley",
        "url": "https://calvarybaptistsv.org"
      },
      "about": {
        "@type": "Thing",
        "name": "Online Church Services and Live Streaming"
      },
      "mainEntity": {
        "@type": "VideoObject",
        "name": "Anchor Baptist Church Live Services",
        "description": "Live and recorded worship services from Anchor Baptist Church in Simi Valley, CA",
        "uploadDate": "2024-01-01T00:00:00Z",
        "duration": "PT1H",
        "contentUrl": "https://www.youtube.com/@calvarybaptistchurchofsimi2174",
        "embedUrl": "https://www.youtube.com/@calvarybaptistchurchofsimi2174",
        "publisher": {
          "@type": "Organization",
          "name": "Anchor Baptist Church",
          "url": "https://calvarybaptistsv.org"
        },
        "creator": {
          "@type": "Organization",
          "name": "Anchor Baptist Church"
        }
      }
    }
  ]
};

export default function WatchLayout({ children }) {
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