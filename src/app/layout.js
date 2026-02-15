import { Montserrat } from 'next/font/google';
import Navbar from './components/NavBar';
import GoogleAnalytics from './components/GoogleAnalytics';
import ErrorBoundary from './components/ErrorBoundary';
import ServerSchema from './components/ServerSchema';
import './globals.css';

const GA_MEASUREMENT_ID = 'G-J7VNDHWKRF'

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: 'Anchor Baptist Church Simi Valley - KJV Bible-Believing Baptist Church',
  description: 'Join us at Anchor Baptist Church in Simi Valley, CA. Independent, Bible-believing Baptist church using the King James Version (KJV) Bible. Sunday and Wednesday services.',
  keywords: 'Anchor Baptist Church, Simi Valley church, Baptist church California, KJV Bible, King James Version, Sunday service, Bible-believing church, Simi Valley California',
  icons: {
    icon: '/ABC square logo no background.png',
    shortcut: '/ABC square logo no background.png',
    apple: '/ABC square logo no background.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://calvarybaptistsv.org',
    siteName: 'Anchor Baptist Church Simi Valley',
    title: 'Anchor Baptist Church Simi Valley - KJV Bible-Believing Baptist Church',
    description: 'Join us at Anchor Baptist Church in Simi Valley, CA. Independent, Bible-believing Baptist church using the King James Version (KJV) Bible. Sunday and Wednesday services.',
    images: [
      {
        url: 'https://calvarybaptistsv.org/anchor-baptist-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Anchor Baptist Church Simi Valley Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anchor Baptist Church Simi Valley - KJV Bible-Believing Baptist Church',
    description: 'Join us at Anchor Baptist Church in Simi Valley, CA. Independent, Bible-believing Baptist church using the King James Version (KJV) Bible.',
    images: ['https://calvarybaptistsv.org/anchor-baptist-logo.jpg'],
    creator: '@calvarybaptistsv',
  },
  other: {
    'theme-color': '#00b3e6',
    'msapplication-TileColor': '#00b3e6',
  },
  alternates: {
    canonical: 'https://calvarybaptistsv.org',
  },
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
          {process.env.NODE_ENV === 'production' && (
            <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
          )}
        </ErrorBoundary>
      </body>
    </html>
  );
}
