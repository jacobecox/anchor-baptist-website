import { Montserrat } from 'next/font/google';
import Navbar from './components/NavBar';
import GoogleAnalytics from './components/GoogleAnalytics';
import PerformanceMonitor from './components/PerformanceMonitor';
import ErrorBoundary from './components/ErrorBoundary';
import ServerSchema from './components/ServerSchema';
import ServiceWorker from './components/ServiceWorker';
import BundleOptimizer from './components/BundleOptimizer';
import SecurityMonitor from './components/SecurityMonitor';
import AdvancedAnalytics from './components/AdvancedAnalytics';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import './globals.css';

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-J7VNDHWKRF'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: 'Calvary Baptist Church Simi Valley - KJV Bible-Believing Baptist Church',
  description: 'Join us at Calvary Baptist Church in Simi Valley, CA. Independent, Bible-believing Baptist church using the King James Version (KJV) Bible. Sunday and Wednesday services.',
  keywords: 'Calvary Baptist Church, Simi Valley church, Baptist church California, KJV Bible, King James Version, Sunday service, Bible-believing church, Simi Valley California',
  icons: {
    icon: '/CBC square logo no background.png',
    shortcut: '/CBC square logo no background.png',
    apple: '/CBC square logo no background.png',
  },
  manifest: '/manifest.json',
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://calvarybaptistsv.org',
    siteName: 'Calvary Baptist Church Simi Valley',
    title: 'Calvary Baptist Church Simi Valley - KJV Bible-Believing Baptist Church',
    description: 'Join us at Calvary Baptist Church in Simi Valley, CA. Independent, Bible-believing Baptist church using the King James Version (KJV) Bible. Sunday and Wednesday services.',
    images: [
      {
        url: 'https://calvarybaptistsv.org/calvary-baptist-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Calvary Baptist Church Simi Valley Logo',
      },
    ],
  },
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Calvary Baptist Church Simi Valley - KJV Bible-Believing Baptist Church',
    description: 'Join us at Calvary Baptist Church in Simi Valley, CA. Independent, Bible-believing Baptist church using the King James Version (KJV) Bible.',
    images: ['https://calvarybaptistsv.org/calvary-baptist-logo.jpg'],
    creator: '@calvarybaptistsv',
  },
  // Additional meta tags
  other: {
    'theme-color': '#00b3e6',
    'msapplication-TileColor': '#00b3e6',
  },
  // Canonical URL
  alternates: {
    canonical: 'https://calvarybaptistsv.org',
  },
};

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
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
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://calvarybaptistsv.org/#organization",
      "name": "Calvary Baptist Church",
      "description": "Independent, Bible-believing Baptist church serving Simi Valley, California",
      "url": "https://calvarybaptistsv.org",
      "logo": "https://calvarybaptistsv.org/calvary-baptist-logo.png",
      "image": "https://calvarybaptistsv.org/calvary-baptist-logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "9 West Bonita Drive",
        "addressLocality": "Simi Valley",
        "addressRegion": "CA",
        "postalCode": "93065",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-805-000-0000",
        "contactType": "customer service",
        "email": "pastor@calvarybcsv.com"
      },
      "sameAs": [
        "https://www.facebook.com/profile.php?id=100081858694086",
        "https://www.youtube.com/@calvarybaptistchurchofsimi2174"
      ]
    },
    {
      "@type": "Event",
      "@id": "https://calvarybaptistsv.org/#sunday-morning-service",
      "name": "Sunday Morning Service",
      "description": "Sunday morning worship service at Calvary Baptist Church",
      "startDate": "2024-01-01T12:00:00",
      "endDate": "2024-01-01T13:00:00",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "Calvary Baptist Church",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "9 West Bonita Drive",
          "addressLocality": "Simi Valley",
          "addressRegion": "CA",
          "postalCode": "93065",
          "addressCountry": "US"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "Calvary Baptist Church"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Event",
      "@id": "https://calvarybaptistsv.org/#sunday-evening-service",
      "name": "Sunday Evening Service",
      "description": "Sunday evening worship service at Calvary Baptist Church",
      "startDate": "2024-01-01T18:00:00",
      "endDate": "2024-01-01T19:00:00",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "Calvary Baptist Church",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "9 West Bonita Drive",
          "addressLocality": "Simi Valley",
          "addressRegion": "CA",
          "postalCode": "93065",
          "addressCountry": "US"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "Calvary Baptist Church"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Event",
      "@id": "https://calvarybaptistsv.org/#wednesday-evening-service",
      "name": "Wednesday Evening Service",
      "description": "Wednesday evening worship service at Calvary Baptist Church",
      "startDate": "2024-01-01T18:30:00",
      "endDate": "2024-01-01T19:30:00",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "Calvary Baptist Church",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "9 West Bonita Drive",
          "addressLocality": "Simi Valley",
          "addressRegion": "CA",
          "postalCode": "93065",
          "addressCountry": "US"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "Calvary Baptist Church"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ServerSchema pageType="default" />
      </head>
      <body className={`${montserrat.className} min-h-screen`}>
        <ErrorBoundary>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
              {children}
            </div>
          </div>
          <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
          <PerformanceMonitor />
          <ServiceWorker />
          <BundleOptimizer />
          <SecurityMonitor />
          <AdvancedAnalytics />
          <PWAInstallPrompt />
        </ErrorBoundary>
      </body>
    </html>
  );
}