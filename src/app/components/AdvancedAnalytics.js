'use client'
import { useEffect } from 'react'

export default function AdvancedAnalytics() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Store analytics data locally for dashboard access
      const storeAnalyticsData = (eventType, data) => {
        try {
          const existingData = JSON.parse(localStorage.getItem('analyticsData') || '{}')
          const timestamp = Date.now()
          
          if (!existingData[eventType]) {
            existingData[eventType] = []
          }
          
          existingData[eventType].push({
            ...data,
            timestamp
          })
          
          // Keep only last 1000 events per type to prevent storage bloat
          if (existingData[eventType].length > 1000) {
            existingData[eventType] = existingData[eventType].slice(-1000)
          }
          
          localStorage.setItem('analyticsData', JSON.stringify(existingData))
        } catch (error) {
          console.warn('Failed to store analytics data:', error)
        }
      }

      // Enhanced conversion tracking
      const trackConversions = () => {
        // Track button clicks
        const trackButtonClicks = () => {
          const buttons = document.querySelectorAll('button, a[role="button"]')
          buttons.forEach(button => {
            button.addEventListener('click', (e) => {
              const buttonText = e.target.textContent?.trim() || 'Unknown'
              const buttonClass = e.target.className || ''
              const pagePath = window.location.pathname

              const eventData = {
                button_text: buttonText,
                button_class: buttonClass,
                page_path: pagePath,
                event_category: 'engagement'
              }

              // Store locally for dashboard
              storeAnalyticsData('buttonClicks', eventData)

              if (window.gtag) {
                window.gtag('event', 'button_click', eventData)
              }
            })
          })
        }

        // Track form interactions
        const trackFormInteractions = () => {
          const forms = document.querySelectorAll('form')
          forms.forEach(form => {
            // Track form starts
            form.addEventListener('submit', (e) => {
              const formId = form.id || 'unknown_form'
              const formAction = form.action || 'unknown_action'

              const eventData = {
                form_id: formId,
                form_action: formAction,
                page_path: window.location.pathname,
                event_category: 'conversion'
              }

              // Store locally for dashboard
              storeAnalyticsData('formSubmissions', eventData)

              if (window.gtag) {
                window.gtag('event', 'form_submit', eventData)
              }
            })

            // Track form field interactions
            const inputs = form.querySelectorAll('input, textarea, select')
            inputs.forEach(input => {
              input.addEventListener('focus', () => {
                const eventData = {
                  field_name: input.name || 'unknown',
                  field_type: input.type || 'text',
                  form_id: form.id || 'unknown_form',
                  event_category: 'engagement'
                }

                if (window.gtag) {
                  window.gtag('event', 'form_field_focus', eventData)
                }
              })
            })
          })
        }

        // Track navigation events
        const trackNavigation = () => {
          const links = document.querySelectorAll('a[href]')
          links.forEach(link => {
            link.addEventListener('click', (e) => {
              const linkText = e.target.textContent?.trim() || 'Unknown'
              const linkHref = e.target.href || ''
              const isInternal = linkHref.includes(window.location.hostname)
              const isExternal = !isInternal && linkHref.startsWith('http')

              const eventData = {
                link_text: linkText,
                link_href: linkHref,
                is_internal: isInternal,
                is_external: isExternal,
                page_path: window.location.pathname,
                event_category: 'navigation'
              }

              if (window.gtag) {
                window.gtag('event', 'link_click', eventData)
              }
            })
          })
        }

        // Track scroll depth
        const trackScrollDepth = () => {
          let maxScroll = 0
          let scrollEventsSent = new Set()

          window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
              (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            )

            // Track scroll milestones (25%, 50%, 75%, 100%)
            const milestones = [25, 50, 75, 100]
            milestones.forEach(milestone => {
              if (scrollPercent >= milestone && !scrollEventsSent.has(milestone)) {
                scrollEventsSent.add(milestone)
                
                const eventData = {
                  scroll_percent: milestone,
                  page_path: window.location.pathname,
                  event_category: 'engagement'
                }

                // Store locally for dashboard
                storeAnalyticsData('scrollDepth', eventData)

                if (window.gtag) {
                  window.gtag('event', 'scroll_depth', eventData)
                }
              }
            })

            maxScroll = Math.max(maxScroll, scrollPercent)
          })
        }

        // Track time on page
        const trackTimeOnPage = () => {
          const startTime = Date.now()
          const timeMilestones = [30, 60, 120, 300] // 30s, 1min, 2min, 5min
          const timeEventsSent = new Set()

          const checkTimeOnPage = () => {
            const timeOnPage = Math.round((Date.now() - startTime) / 1000)
            
            timeMilestones.forEach(milestone => {
              if (timeOnPage >= milestone && !timeEventsSent.has(milestone)) {
                timeEventsSent.add(milestone)
                
                const eventData = {
                  time_on_page: milestone,
                  page_path: window.location.pathname,
                  event_category: 'engagement'
                }

                // Store locally for dashboard
                storeAnalyticsData('timeOnPage', eventData)

                if (window.gtag) {
                  window.gtag('event', 'time_on_page', eventData)
                }
              }
            })
          }

          // Check every 10 seconds
          setInterval(checkTimeOnPage, 10000)
        }

        // Track user engagement
        const trackUserEngagement = () => {
          // Track mouse movements (heatmap-like data)
          let mouseMovements = 0
          window.addEventListener('mousemove', () => {
            mouseMovements++
            if (mouseMovements % 100 === 0) { // Every 100 movements
              const eventData = {
                mouse_movements: mouseMovements,
                page_path: window.location.pathname,
                event_category: 'engagement'
              }

              if (window.gtag) {
                window.gtag('event', 'mouse_movement', eventData)
              }
            }
          })

          // Track keyboard interactions
          let keyPresses = 0
          window.addEventListener('keydown', () => {
            keyPresses++
            if (keyPresses % 10 === 0) { // Every 10 key presses
              const eventData = {
                key_presses: keyPresses,
                page_path: window.location.pathname,
                event_category: 'engagement'
              }

              if (window.gtag) {
                window.gtag('event', 'keyboard_interaction', eventData)
              }
            }
          })
        }

        // Initialize conversion tracking
        trackButtonClicks()
        trackFormInteractions()
        trackNavigation()
        trackScrollDepth()
        trackTimeOnPage()
        trackUserEngagement()
      }

      // Track advanced performance metrics
      const trackAdvancedPerformance = () => {
        // Track Core Web Vitals
        if ('PerformanceObserver' in window) {
          // LCP (Largest Contentful Paint)
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1]
            const lcpValue = Math.round(lastEntry.startTime)
            
            const eventData = {
              lcp: lcpValue,
              page_path: window.location.pathname,
              event_category: 'performance'
            }

            // Store locally for dashboard
            storeAnalyticsData('coreWebVitals', eventData)

            if (window.gtag) {
              window.gtag('event', 'LCP', {
                value: lcpValue,
                event_category: 'Web Vitals',
                event_label: window.location.pathname,
              })
            }
          })
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

          // FID (First Input Delay)
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach(entry => {
              const fidValue = Math.round(entry.processingStart - entry.startTime)
              
              const eventData = {
                fid: fidValue,
                page_path: window.location.pathname,
                event_category: 'performance'
              }

              // Store locally for dashboard
              storeAnalyticsData('coreWebVitals', eventData)

              if (window.gtag) {
                window.gtag('event', 'FID', {
                  value: fidValue,
                  event_category: 'Web Vitals',
                  event_label: window.location.pathname,
                })
              }
            })
          })
          fidObserver.observe({ entryTypes: ['first-input'] })

          // CLS (Cumulative Layout Shift)
          let clsValue = 0
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach(entry => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value
                const roundedCls = Math.round(clsValue * 1000) / 1000
                
                const eventData = {
                  cls: roundedCls,
                  page_path: window.location.pathname,
                  event_category: 'performance'
                }

                // Store locally for dashboard
                storeAnalyticsData('coreWebVitals', eventData)

                if (window.gtag) {
                  window.gtag('event', 'CLS', {
                    value: roundedCls,
                    event_category: 'Web Vitals',
                    event_label: window.location.pathname,
                  })
                }
              }
            })
          })
          clsObserver.observe({ entryTypes: ['layout-shift'] })
        }

        // Track resource loading performance
        const trackResourcePerformance = () => {
          if ('PerformanceObserver' in window) {
            const resourceObserver = new PerformanceObserver((list) => {
              const entries = list.getEntries()
              entries.forEach(entry => {
                if (entry.initiatorType === 'img' || entry.initiatorType === 'script' || entry.initiatorType === 'css') {
                  const eventData = {
                    resource_type: entry.initiatorType,
                    resource_name: entry.name,
                    load_time: Math.round(entry.duration),
                    resource_size: entry.transferSize || 0,
                    page_path: window.location.pathname
                  }

                  // Store locally for dashboard
                  storeAnalyticsData('resourcePerformance', eventData)

                  if (window.gtag) {
                    window.gtag('event', 'resource_performance', eventData)
                  }
                }
              })
            })
            resourceObserver.observe({ entryTypes: ['resource'] })
          }
        }

        // Track memory usage
        const trackMemoryUsage = () => {
          if ('memory' in performance) {
            setInterval(() => {
              const memory = performance.memory
              const eventData = {
                used_heap_mb: Math.round(memory.usedJSHeapSize / 1024 / 1024),
                total_heap_mb: Math.round(memory.totalJSHeapSize / 1024 / 1024),
                heap_limit_mb: Math.round(memory.jsHeapSizeLimit / 1024 / 1024),
                page_path: window.location.pathname
              }

              // Store locally for dashboard
              storeAnalyticsData('memoryUsage', eventData)

              if (window.gtag) {
                window.gtag('event', 'memory_usage', eventData)
              }
            }, 30000) // Every 30 seconds
          }
        }

        // Initialize performance tracking
        trackResourcePerformance()
        trackMemoryUsage()
      }

      // Track user journey and session
      const trackUserJourney = () => {
        // Track session start
        const sessionData = {
          session_id: Date.now().toString(),
          page_path: window.location.pathname,
          user_agent: navigator.userAgent,
          screen_resolution: `${screen.width}x${screen.height}`,
          viewport_size: `${window.innerWidth}x${window.innerHeight}`
        }

        // Store locally for dashboard
        storeAnalyticsData('userSessions', sessionData)

        if (window.gtag) {
          window.gtag('event', 'session_start', sessionData)
        }

        // Track page views with enhanced data
        const pageViewData = {
          page_title: document.title,
          page_path: window.location.pathname,
          page_url: window.location.href,
          referrer: document.referrer,
          session_id: Date.now().toString()
        }

        // Store locally for dashboard
        storeAnalyticsData('userJourney', pageViewData)

        if (window.gtag) {
          window.gtag('event', 'page_view', pageViewData)
        }

        // Track user preferences
        const trackUserPreferences = () => {
          const preferences = {
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            do_not_track: navigator.doNotTrack,
            cookie_enabled: navigator.cookieEnabled,
            online: navigator.onLine
          }

          // Store locally for dashboard
          storeAnalyticsData('deviceAnalytics', preferences)

          if (window.gtag) {
            window.gtag('event', 'user_preferences', preferences)
          }
        }

        trackUserPreferences()
      }

      // Initialize all analytics
      trackConversions()
      trackAdvancedPerformance()
      trackUserJourney()
    }
  }, [])

  return null
} 