export default function ServerSchema({ pageType = 'default' }) {
  // Static schema data - no client-side state
  const baseSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://calvarybaptistsv.org/#organization",
        "name": "Calvary Baptist Church",
        "alternateName": "CBC Simi Valley",
        "description": "Independent, Bible-believing Baptist church in Simi Valley, California using the King James Version (KJV) Bible",
        "url": "https://calvarybaptistsv.org",
        "logo": {
          "@type": "ImageObject",
          "url": "https://calvarybaptistsv.org/calvary-baptist-logo.jpg",
          "width": 600,
          "height": 200
        },
        "image": "https://calvarybaptistsv.org/calvary-baptist-logo.jpg",
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
        "telephone": "+1-805-000-0000",
        "email": "pastor@calvarybcsv.com",
        "sameAs": [
          "https://www.facebook.com/profile.php?id=100081858694086",
          "https://www.youtube.com/@calvarybaptistchurchofsimi2174"
        ],
        "foundingDate": "2020",
        "numberOfEmployees": "1-10",
        "areaServed": "Simi Valley, CA",
        "serviceArea": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 34.268070,
            "longitude": -118.802750
          },
          "geoRadius": "50000"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://calvarybaptistsv.org/#localbusiness",
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
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Sunday Morning Service",
                "description": "Traditional Baptist worship service",
                "startTime": "12:00 PM"
              },
              "price": "0",
              "priceCurrency": "USD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Sunday Evening Service",
                "description": "Evening worship service",
                "startTime": "6:00 PM"
              },
              "price": "0",
              "priceCurrency": "USD"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Wednesday Evening Service",
                "description": "Midweek Bible study and prayer",
                "startTime": "6:30 PM"
              },
              "price": "0",
              "priceCurrency": "USD"
            }
          ]
        }
      }
    ]
  };

  // Page-specific schemas
  const pageSchemas = {
    'how-to-be-saved': {
      "@type": "WebPage",
      "@id": "https://calvarybaptistsv.org/how-to-be-saved/#webpage",
      "name": "How to Be Saved - Calvary Baptist Church",
      "description": "Learn how to be saved and receive eternal life through Jesus Christ. Step-by-step guide to salvation.",
      "url": "https://calvarybaptistsv.org/how-to-be-saved",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://calvarybaptistsv.org/#website"
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
              "text": "You can be saved by believing in Jesus Christ as your Lord and Savior, confessing your sins, and accepting His free gift of salvation."
            }
          },
          {
            "@type": "Question",
            "name": "What is salvation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Salvation is the free gift of eternal life through Jesus Christ, received by grace through faith."
            }
          }
        ]
      }
    },
    'beliefs': {
      "@type": "WebPage",
      "@id": "https://calvarybaptistsv.org/beliefs/#webpage",
      "name": "What We Believe - Calvary Baptist Church",
      "description": "Learn about our core beliefs as an independent, Bible-believing Baptist church using the King James Version.",
      "url": "https://calvarybaptistsv.org/beliefs",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://calvarybaptistsv.org/#website"
      },
      "about": {
        "@type": "Thing",
        "name": "Baptist beliefs and doctrine"
      }
    },
    'visit': {
      "@type": "WebPage",
      "@id": "https://calvarybaptistsv.org/visit/#webpage",
      "name": "Visit Us - Calvary Baptist Church",
      "description": "Plan your visit to Calvary Baptist Church in Simi Valley. Service times, directions, and what to expect.",
      "url": "https://calvarybaptistsv.org/visit",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://calvarybaptistsv.org/#website"
      },
      "about": {
        "@type": "Place",
        "name": "Calvary Baptist Church"
      }
    },
    'watch': {
      "@type": "WebPage",
      "@id": "https://calvarybaptistsv.org/watch/#webpage",
      "name": "Watch Live - Calvary Baptist Church",
      "description": "Watch live services and sermons from Calvary Baptist Church in Simi Valley.",
      "url": "https://calvarybaptistsv.org/watch",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://calvarybaptistsv.org/#website"
      },
      "about": {
        "@type": "Thing",
        "name": "Live church services"
      }
    },
    'events': {
      "@type": "WebPage",
      "@id": "https://calvarybaptistsv.org/events/#webpage",
      "name": "Events - Calvary Baptist Church",
      "description": "Upcoming events and activities at Calvary Baptist Church in Simi Valley.",
      "url": "https://calvarybaptistsv.org/events",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://calvarybaptistsv.org/#website"
      },
      "about": {
        "@type": "Thing",
        "name": "Church events and activities"
      }
    },
    'more': {
      "@type": "WebPage",
      "@id": "https://calvarybaptistsv.org/more/#webpage",
      "name": "More Information - Calvary Baptist Church",
      "description": "Additional resources and information about Calvary Baptist Church in Simi Valley.",
      "url": "https://calvarybaptistsv.org/more",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://calvarybaptistsv.org/#website"
      }
    }
  };

  // Combine schemas
  const fullSchema = {
    ...baseSchema,
    "@graph": [
      ...baseSchema["@graph"],
      {
        "@type": "WebSite",
        "@id": "https://calvarybaptistsv.org/#website",
        "name": "Calvary Baptist Church Simi Valley",
        "url": "https://calvarybaptistsv.org",
        "description": "Independent, Bible-believing Baptist church in Simi Valley, CA using the King James Version (KJV) Bible",
        "publisher": {
          "@type": "Organization",
          "name": "Calvary Baptist Church"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://calvarybaptistsv.org/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      pageSchemas[pageType] || {
        "@type": "WebPage",
        "@id": "https://calvarybaptistsv.org/#webpage",
        "name": "Calvary Baptist Church Simi Valley - Home",
        "description": "Welcome to Calvary Baptist Church in Simi Valley, CA. Independent, Bible-believing Baptist church using the King James Version (KJV) Bible.",
        "url": "https://calvarybaptistsv.org",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://calvarybaptistsv.org/#website"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(fullSchema),
      }}
    />
  );
} 