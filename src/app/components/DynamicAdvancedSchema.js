'use client'
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function DynamicAdvancedSchema({ pageType = 'default' }) {
  const [serviceTimes, setServiceTimes] = useState({
    sundayMorning: '12:00 PM',
    sundayEvening: '6:00 PM',
    wednesdayEvening: '6:30 PM'
  });

  // Fetch service times from Supabase
  useEffect(() => {
    async function fetchServiceTimes() {
      try {
        const { data, error } = await supabase
          .from('service_times')
          .select('*')
          .limit(1)
          .single();

        if (error) {
          console.error('Error fetching service times:', error);
          return;
        }

        if (data) {
          setServiceTimes({
            sundayMorning: data.sunday_morning || '12:00 PM',
            sundayEvening: data.sunday_evening || '6:00 PM',
            wednesdayEvening: data.wednesday_evening || '6:30 PM'
          });
        } else {
          console.log('No service times data found, using defaults');
        }
      } catch (error) {
        console.error('Error fetching service times:', error);
      }
    }

    fetchServiceTimes();
  }, []);

  // Convert service times to openingHours format
  const formatOpeningHours = () => {
    const formatTime = (time) => {
      // Convert "12:00 PM" to "12:00" format
      const timeStr = time.replace(/\s*(AM|PM)/i, '');
      const isPM = time.toLowerCase().includes('pm');
      const [hours, minutes] = timeStr.split(':');
      let hour = parseInt(hours);
      
      if (isPM && hour !== 12) hour += 12;
      if (!isPM && hour === 12) hour = 0;
      
      return `${hour.toString().padStart(2, '0')}:${minutes}`;
    };

    return [
      `Su ${formatTime(serviceTimes.sundayMorning)}-${formatTime(serviceTimes.sundayEvening)}`,
      `We ${formatTime(serviceTimes.wednesdayEvening)}-${formatTime(serviceTimes.wednesdayEvening).replace(/^\d{2}:/, (parseInt(formatTime(serviceTimes.wednesdayEvening).split(':')[0]) + 1).toString().padStart(2, '0') + ':')}`
    ];
  };

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
        "areaServed": {
          "@type": "City",
          "name": "Simi Valley"
        },
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
        "description": "Independent, Bible-believing Baptist church serving Simi Valley, California",
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
        "openingHours": formatOpeningHours(),
        "priceRange": "Free",
        "paymentAccepted": "Donation",
        "currenciesAccepted": "USD",
        "image": "https://calvarybaptistsv.org/calvary-baptist-logo.jpg",
        "logo": "https://calvarybaptistsv.org/calvary-baptist-logo.jpg",
        "sameAs": [
          "https://www.facebook.com/profile.php?id=100081858694086",
          "https://www.youtube.com/@calvarybaptistchurchofsimi2174"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Church Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Sunday Morning Service",
                "description": "Traditional Baptist worship service",
                "startTime": serviceTimes.sundayMorning
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
                "startTime": serviceTimes.sundayEvening
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
                "startTime": serviceTimes.wednesdayEvening
              },
              "price": "0",
              "priceCurrency": "USD"
            }
          ]
        }
      }
    ]
  };

  // Page-specific schema additions (same as before)
  const pageSchemas = {
    'beliefs': {
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
    },
    'how-to-be-saved': {
      "@type": "WebPage",
      "@id": "https://calvarybaptistsv.org/how-to-be-saved/#webpage",
      "name": "How to Be Saved",
      "description": "Learn how to be saved through faith in Jesus Christ. Calvary Baptist Church in Simi Valley, CA helps you understand God's plan for salvation and eternal life.",
      "url": "https://calvarybaptistsv.org/how-to-be-saved",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://calvarybaptistsv.org/#website",
        "name": "Calvary Baptist Church Simi Valley",
        "url": "https://calvarybaptistsv.org"
      },
      "about": {
        "@type": "Thing",
        "name": "Christian Salvation and Eternal Life"
      },
      "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How can I be saved?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Salvation comes through personal faith in Jesus Christ and repentance of sins. You must confess with your mouth that Jesus is Lord and believe in your heart that God raised Him from the dead."
            }
          },
          {
            "@type": "Question",
            "name": "What is the Gospel?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Gospel is the good news that Jesus Christ died for our sins, was buried, and rose again on the third day according to the Scriptures."
            }
          },
          {
            "@type": "Question",
            "name": "Is salvation by works?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, salvation is by grace through faith, not by works. It is the gift of God, not of works, lest any man should boast."
            }
          }
        ]
      }
    },
    'visit': {
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
        "name": "Church Visit and Service Information"
      }
    },
    'events': {
      "@type": "WebPage",
      "@id": "https://calvarybaptistsv.org/events/#webpage",
      "name": "Events",
      "description": "Stay updated with upcoming events, special services, and activities at Calvary Baptist Church in Simi Valley, CA.",
      "url": "https://calvarybaptistsv.org/events",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://calvarybaptistsv.org/#website",
        "name": "Calvary Baptist Church Simi Valley",
        "url": "https://calvarybaptistsv.org"
      },
      "about": {
        "@type": "Thing",
        "name": "Church Events and Activities"
      }
    },
    'watch': {
      "@type": "WebPage",
      "@id": "https://calvarybaptistsv.org/watch/#webpage",
      "name": "Watch Live",
      "description": "Watch live and recorded services from Calvary Baptist Church in Simi Valley, CA. Join us online through our YouTube channel.",
      "url": "https://calvarybaptistsv.org/watch",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://calvarybaptistsv.org/#website",
        "name": "Calvary Baptist Church Simi Valley",
        "url": "https://calvarybaptistsv.org"
      },
      "about": {
        "@type": "Thing",
        "name": "Online Church Services"
      },
      "mainEntity": {
        "@type": "VideoObject",
        "name": "Calvary Baptist Church Services",
        "description": "Live and recorded worship services from Calvary Baptist Church",
        "thumbnailUrl": "https://calvarybaptistsv.org/calvary-baptist-logo.jpg",
        "uploadDate": "2024-01-01",
        "duration": "PT1H",
        "contentUrl": "https://www.youtube.com/@calvarybaptistchurchofsimi2174",
        "embedUrl": "https://www.youtube.com/@calvarybaptistchurchofsimi2174"
      }
    }
  };

  // Combine base schema with page-specific schema
  const fullSchema = {
    ...baseSchema,
    "@graph": [
      ...baseSchema["@graph"],
      pageSchemas[pageType] || {
        "@type": "WebPage",
        "@id": `https://calvarybaptistsv.org/${pageType === 'default' ? '' : pageType}/#webpage`,
        "name": "Calvary Baptist Church Simi Valley",
        "description": "Independent, Bible-believing Baptist church in Simi Valley, California using the King James Version (KJV) Bible",
        "url": `https://calvarybaptistsv.org/${pageType === 'default' ? '' : pageType}`,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://calvarybaptistsv.org/#website",
          "name": "Calvary Baptist Church Simi Valley",
          "url": "https://calvarybaptistsv.org"
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