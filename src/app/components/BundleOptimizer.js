'use client'
import { useEffect } from 'react'

export default function BundleOptimizer() {
  useEffect(() => {
    // Monitor bundle size and performance
    if (typeof window !== 'undefined') {
      // Track JavaScript bundle size
      const trackBundleSize = () => {
        const scripts = document.querySelectorAll('script[src]')
        let totalSize = 0
        
        scripts.forEach(script => {
          const src = script.src
          if (src.includes('_next') || src.includes('chunk')) {
            // Estimate size based on URL patterns
            totalSize += 50 // KB estimate
          }
        })
        
        // Send to analytics
        if (window.gtag) {
          window.gtag('event', 'bundle_size', {
            value: totalSize,
            custom_parameter: 'javascript_bundle_kb'
          })
        }
      }

      // Track resource loading performance
      const trackResourcePerformance = () => {
        if ('performance' in window) {
          const resources = performance.getEntriesByType('resource')
          const jsResources = resources.filter(r => r.name.includes('.js'))
          const cssResources = resources.filter(r => r.name.includes('.css'))
          const imageResources = resources.filter(r => r.name.includes('.jpg') || r.name.includes('.png') || r.name.includes('.webp'))
          
          const avgJsLoadTime = jsResources.reduce((sum, r) => sum + r.duration, 0) / jsResources.length || 0
          const avgCssLoadTime = cssResources.reduce((sum, r) => sum + r.duration, 0) / cssResources.length || 0
          const avgImageLoadTime = imageResources.reduce((sum, r) => sum + r.duration, 0) / imageResources.length || 0
          
          if (window.gtag) {
            window.gtag('event', 'resource_performance', {
              js_load_time: avgJsLoadTime,
              css_load_time: avgCssLoadTime,
              image_load_time: avgImageLoadTime,
              total_resources: resources.length
            })
          }
        }
      }

      // Track memory usage
      const trackMemoryUsage = () => {
        if ('memory' in performance) {
          const memory = performance.memory
          if (window.gtag) {
            window.gtag('event', 'memory_usage', {
              used_js_heap_size: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
              total_js_heap_size: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
              js_heap_size_limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) // MB
            })
          }
        }
      }

      // Run performance tracking
      setTimeout(() => {
        trackBundleSize()
        trackResourcePerformance()
        trackMemoryUsage()
      }, 2000)

      // Monitor for memory leaks
      let memoryCheckInterval
      if ('memory' in performance) {
        memoryCheckInterval = setInterval(() => {
          const memory = performance.memory
          const usedMB = memory.usedJSHeapSize / 1024 / 1024
          
          // Alert if memory usage is high
          if (usedMB > 100) { // 100MB threshold
            console.warn('High memory usage detected:', usedMB, 'MB')
            if (window.gtag) {
              window.gtag('event', 'high_memory_usage', {
                memory_mb: Math.round(usedMB)
              })
            }
          }
        }, 30000) // Check every 30 seconds
      }

      // Cleanup
      return () => {
        if (memoryCheckInterval) {
          clearInterval(memoryCheckInterval)
        }
      }
    }
  }, [])

  return null
} 