import { Montserrat } from 'next/font/google';
import Navbar from './components/NavBar';
import './globals.css';

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} min-h-screen`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}