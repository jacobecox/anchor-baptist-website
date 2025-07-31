export const metadata = {
  title: 'What We Believe - Calvary Baptist Church Simi Valley',
  description: 'Discover the core beliefs and doctrines of Calvary Baptist Church in Simi Valley, CA. Independent, Bible-believing Baptist church using the King James Version.',
  keywords: 'Baptist beliefs, church doctrine, Simi Valley church, KJV Bible, independent Baptist, Bible-believing church, Christian beliefs, Baptist church California',
  // Open Graph
  openGraph: {
    type: 'article',
    locale: 'en_US',
    url: 'https://calvarybaptistsv.org/beliefs',
    siteName: 'Calvary Baptist Church Simi Valley',
    title: 'What We Believe - Calvary Baptist Church Simi Valley',
    description: 'Discover the core beliefs and doctrines of Calvary Baptist Church in Simi Valley, CA. Independent, Bible-believing Baptist church using the King James Version.',
    images: [
      {
        url: 'https://calvarybaptistsv.org/aaron-burden-cmIqkMPfpMQ-unsplash.jpg',
        width: 1200,
        height: 630,
        alt: 'Open Bible with golden edges - representing our commitment to God\'s Word',
      },
    ],
  },
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'What We Believe - Calvary Baptist Church Simi Valley',
    description: 'Discover the core beliefs and doctrines of Calvary Baptist Church in Simi Valley, CA. Independent, Bible-believing Baptist church using the King James Version.',
    images: ['https://calvarybaptistsv.org/aaron-burden-cmIqkMPfpMQ-unsplash.jpg'],
    creator: '@calvarybaptistsv',
  },
  // Canonical URL
  alternates: {
    canonical: 'https://calvarybaptistsv.org/beliefs',
  },
};

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://calvarybaptistsv.org/beliefs/#webpage",
      "name": "What We Believe",
      "description": "Discover the core beliefs and doctrines of Calvary Baptist Church in Simi Valley, CA. Independent, Bible-believing Baptist church using the King James Version.",
      "url": "https://calvarybaptistsv.org/beliefs",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://calvarybaptistsv.org/#website",
        "name": "Calvary Baptist Church Simi Valley",
        "url": "https://calvarybaptistsv.org"
      },
      "about": {
        "@type": "Thing",
        "name": "Baptist Church Beliefs and Doctrine"
      },
      "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What Bible translation do you use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We use the King James Version (KJV) Bible exclusively. We believe it is the only faithful English translation of the preserved Greek and Hebrew texts."
            }
          },
          {
            "@type": "Question",
            "name": "What do you believe about salvation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We believe that salvation comes through personal faith in the Lord Jesus Christ and repentance of sins. Salvation is by grace through faith, not by works."
            }
          },
          {
            "@type": "Question",
            "name": "What do you believe about baptism?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We believe that every born-again believer should declare their faith by baptism (immersion in water), setting forth the Lord's death, burial and resurrection."
            }
          }
        ]
      }
    }
  ]
};

import ServerSchema from '../components/ServerSchema';

export default function BeliefsLayout({ children }) {
  return (
    <>
      <ServerSchema pageType="beliefs" />
      {children}
    </>
  );
} 