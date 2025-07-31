'use client'
import { useEffect } from 'react'

export default function AdvancedAnalytics() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
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

              if (window.gtag) {
                window.gtag('event', 'button_click', {
                  button_text: buttonText,
                  button_class: buttonClass,
                  page_path: pagePath,
                  event_category: 'engagement'
                })
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

              if (window.gtag) {
                window.gtag('event', 'form_submit', {
                  form_id: formId,
                  form_action: formAction,
                  page_path: window.location.pathname,
                  event_category: 'conversion'
                })
              }
            })

            // Track form field interactions
            const inputs = form.querySelectorAll('input, textarea, select')
            inputs.forEach(input => {
              input.addEventListener('focus', () => {
                if (window.gtag) {
                  window.gtag('event', 'form_field_focus', {
                    field_name: input.name || 'unknown',
                    field_type: input.type || 'text',
                    form_id: form.id || 'unknown_form',
                    event_category: 'engagement'
                  })
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

              if (window.gtag) {
                window.gtag('event', 'link_click', {
                  link_text: linkText,
                  link_href: linkHref,
                  is_internal: isInternal,
                  is_external: isExternal,
                  page_path: window.location.pathname,
                  event_category: 'navigation'
                })
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
                
                if (window.gtag) {
                  window.gtag('event', 'scroll_depth', {
                    scroll_percent: milestone,
                    page_path: window.location.pathname,
                    event_category: 'engagement'
                  })
                }
              }
            })

            maxScroll = Math.max(maxScroll, scrollPercent)
          })
        }

        // Track time on page
        const trackTimeOnPage = () => {
          const startTime = Date.now()
          const timeIntervals = [30, 60, 120, 300] // 30s, 1min, 2min, 5min
          const timeEventsSent = new Set()

          const checkTimeOnPage = () => {
            const timeOnPage = Math.round((Date.now() - startTime) / 1000)
            
            timeIntervals.forEach(interval => {
              if (timeOnPage >= interval && !timeEventsSent.has(interval)) {
                timeEventsSent.add(interval)
                
                if (window.gtag) {
                  window.gtag('event', 'time_on_page', {
                    time_seconds: interval,
                    page_path: window.location.pathname,
                    event_category: 'engagement'
                  })
                }
              }
            })
          }

          // Check every 10 seconds
          setInterval(checkTimeOnPage, 10000)
        }

        // Track user engagement
        const trackUserEngagement = () => {
          let isUserActive = true
          let lastActivity = Date.now()

          const resetActivity = () => {
            isUserActive = true
            lastActivity = Date.now()
          }

          // Track user activity
          ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, resetActivity, true)
          })

          // Check for user inactivity
          setInterval(() => {
            const timeSinceActivity = Date.now() - lastActivity
            
            if (timeSinceActivity > 30000 && isUserActive) { // 30 seconds
              isUserActive = false
              
              if (window.gtag) {
                window.gtag('event', 'user_inactive', {
                  inactive_time_seconds: Math.round(timeSinceActivity / 1000),
                  page_path: window.location.pathname,
                  event_category: 'engagement'
                })
              }
            }
          }, 10000)
        }

        // Initialize all tracking
        setTimeout(() => {
          trackButtonClicks()
          trackFormInteractions()
          trackNavigation()
          trackScrollDepth()
          trackTimeOnPage()
          trackUserEngagement()
        }, 1000)
      }

      // Advanced performance monitoring
      const trackAdvancedPerformance = () => {
        // Track Core Web Vitals
        if ('PerformanceObserver' in window) {
          // Largest Contentful Paint (LCP)
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1]
            
            if (window.gtag) {
              window.gtag('event', 'core_web_vital', {
                metric_name: 'LCP',
                metric_value: Math.round(lastEntry.startTime),
                metric_rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs_improvement' : 'poor',
                page_path: window.location.pathname
              })
            }
          })
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

          // First Input Delay (FID)
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach(entry => {
              if (window.gtag) {
                window.gtag('event', 'core_web_vital', {
                  metric_name: 'FID',
                  metric_value: Math.round(entry.processingStart - entry.startTime),
                  metric_rating: entry.processingStart - entry.startTime < 100 ? 'good' : entry.processingStart - entry.startTime < 300 ? 'needs_improvement' : 'poor',
                  page_path: window.location.pathname
                })
              }
            })
          })
          fidObserver.observe({ entryTypes: ['first-input'] })

          // Cumulative Layout Shift (CLS)
          let clsValue = 0
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach(entry => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value
              }
            })
          })
          clsObserver.observe({ entryTypes: ['layout-shift'] })

          // Report CLS on page unload
          window.addEventListener('beforeunload', () => {
            if (window.gtag) {
              window.gtag('event', 'core_web_vital', {
                metric_name: 'CLS',
                metric_value: Math.round(clsValue * 1000) / 1000,
                metric_rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs_improvement' : 'poor',
                page_path: window.location.pathname
              })
            }
          })
        }

        // Track resource loading performance
        const trackResourcePerformance = () => {
          if ('PerformanceObserver' in window) {
            const resourceObserver = new PerformanceObserver((list) => {
              const entries = list.getEntries()
              entries.forEach(entry => {
                if (entry.initiatorType === 'img' || entry.initiatorType === 'script' || entry.initiatorType === 'css') {
                  if (window.gtag) {
                    window.gtag('event', 'resource_performance', {
                      resource_type: entry.initiatorType,
                      resource_name: entry.name,
                      load_time: Math.round(entry.duration),
                      resource_size: entry.transferSize || 0,
                      page_path: window.location.pathname
                    })
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
              if (window.gtag) {
                window.gtag('event', 'memory_usage', {
                  used_heap_mb: Math.round(memory.usedJSHeapSize / 1024 / 1024),
                  total_heap_mb: Math.round(memory.totalJSHeapSize / 1024 / 1024),
                  heap_limit_mb: Math.round(memory.jsHeapSizeLimit / 1024 / 1024),
                  page_path: window.location.pathname
                })
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
        if (window.gtag) {
          window.gtag('event', 'session_start', {
            session_id: Date.now().toString(),
            page_path: window.location.pathname,
            user_agent: navigator.userAgent,
            screen_resolution: `${screen.width}x${screen.height}`,
            viewport_size: `${window.innerWidth}x${window.innerHeight}`
          })
        }

        // Track page views with enhanced data
        if (window.gtag) {
          window.gtag('event', 'page_view', {
            page_title: document.title,
            page_path: window.location.pathname,
            page_url: window.location.href,
            referrer: document.referrer,
            session_id: Date.now().toString()
          })
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