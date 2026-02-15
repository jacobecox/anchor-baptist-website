export const metadata = {
  title: 'How to Be Saved - Anchor Baptist Church Simi Valley',
  description: 'Learn how to be saved through faith in Jesus Christ. Anchor Baptist Church in Simi Valley, CA helps you understand God\'s plan for salvation and eternal life.',
  keywords: 'how to be saved, salvation, Jesus Christ, Simi Valley church, eternal life, Baptist church California, born again, faith in Christ',
  // Open Graph
  openGraph: {
    type: 'article',
    locale: 'en_US',
    url: 'https://calvarybaptistsv.org/how-to-be-saved',
    siteName: 'Anchor Baptist Church Simi Valley',
    title: 'How to Be Saved - Anchor Baptist Church Simi Valley',
    description: 'Learn how to be saved through faith in Jesus Christ. Anchor Baptist Church in Simi Valley, CA helps you understand God\'s plan for salvation and eternal life.',
    images: [
      {
        url: 'https://calvarybaptistsv.org/beach-1868772.jpg',
        width: 1200,
        height: 630,
        alt: 'Person praying with Bible on beach - representing salvation and faith',
      },
    ],
  },
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'How to Be Saved - Anchor Baptist Church Simi Valley',
    description: 'Learn how to be saved through faith in Jesus Christ. Anchor Baptist Church in Simi Valley, CA helps you understand God\'s plan for salvation and eternal life.',
    images: ['https://calvarybaptistsv.org/beach-1868772.jpg'],
    creator: '@calvarybaptistsv',
  },
  // Canonical URL
  alternates: {
    canonical: 'https://calvarybaptistsv.org/how-to-be-saved',
  },
};

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://calvarybaptistsv.org/how-to-be-saved/#webpage",
      "name": "How to Be Saved",
      "description": "Learn how to be saved through faith in Jesus Christ. Anchor Baptist Church in Simi Valley, CA helps you understand God's plan for salvation and eternal life.",
      "url": "https://calvarybaptistsv.org/how-to-be-saved",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://calvarybaptistsv.org/#website",
        "name": "Anchor Baptist Church Simi Valley",
        "url": "https://calvarybaptistsv.org"
      },
      "about": {
        "@type": "Thing",
        "name": "Salvation through Jesus Christ"
      },
      "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How can I be saved?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can be saved by confessing with your mouth that Jesus is Lord and believing in your heart that God raised Him from the dead. Salvation comes through faith in Jesus Christ alone."
            }
          },
          {
            "@type": "Question", 
            "name": "What does it mean to be saved?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Being saved means receiving eternal life through faith in Jesus Christ. It involves repentance of sin and trusting in Christ's death and resurrection for forgiveness."
            }
          }
        ]
      }
    }
  ]
};

export default function HowToBeSavedLayout({ children }) {
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