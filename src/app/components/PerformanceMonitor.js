'use client'
import { useEffect } from 'react'

export default function PerformanceMonitor() {
  useEffect(() => {
    // Track Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        console.log('LCP:', lastEntry.startTime)
        
        // Send to analytics if available
        if (window.gtag) {
          window.gtag('event', 'LCP', {
            value: Math.round(lastEntry.startTime),
            event_category: 'Web Vitals',
            event_label: window.location.pathname,
          })
        }
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          console.log('FID:', entry.processingStart - entry.startTime)
          
          if (window.gtag) {
            window.gtag('event', 'FID', {
              value: Math.round(entry.processingStart - entry.startTime),
              event_category: 'Web Vitals',
              event_label: window.location.pathname,
            })
          }
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Cumulative Layout Shift (CLS)
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            console.log('CLS:', clsValue)
            
            if (window.gtag) {
              window.gtag('event', 'CLS', {
                value: Math.round(clsValue * 1000) / 1000,
                event_category: 'Web Vitals',
                event_label: window.location.pathname,
              })
            }
          }
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    }

    // Track page load performance
    if ('performance' in window) {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0]
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.loadEventStart
          console.log('Page Load Time:', loadTime)
          
          if (window.gtag) {
            window.gtag('event', 'page_load_time', {
              value: Math.round(loadTime),
              event_category: 'Performance',
              event_label: window.location.pathname,
            })
          }
        }
      })
    }
  }, [])

  return null
} 