'use client'
import Script from 'next/script'

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }) {
  if (!GA_MEASUREMENT_ID) {
    return null
  }

  const scriptContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
        async
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {scriptContent}
      </Script>
    </>
  )
} 