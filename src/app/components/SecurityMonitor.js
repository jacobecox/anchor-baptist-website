'use client'
import { useEffect } from 'react'

export default function SecurityMonitor() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Monitor Content Security Policy violations
      const reportCSPViolation = (event) => {
        const violation = {
          documentURI: event.documentURI,
          blockedURI: event.blockedURI,
          violatedDirective: event.violatedDirective,
          originalPolicy: event.originalPolicy,
          timestamp: new Date().toISOString()
        }

        console.warn('CSP Violation:', violation)

        // Send to analytics if available
        if (window.gtag) {
          window.gtag('event', 'csp_violation', {
            violated_directive: event.violatedDirective,
            blocked_uri: event.blockedURI,
            document_uri: event.documentURI
          })
        }
      }

      // Monitor for security-related events
      const monitorSecurityEvents = () => {
        // Check if site is served over HTTPS
        const isHTTPS = window.location.protocol === 'https:'
        if (!isHTTPS && window.location.hostname !== 'localhost') {
          console.warn('Site should be served over HTTPS for security')
          if (window.gtag) {
            window.gtag('event', 'security_warning', {
              warning_type: 'non_https',
              protocol: window.location.protocol
            })
          }
        }

        // Check for security headers
        const checkSecurityHeaders = async () => {
          try {
            const response = await fetch(window.location.href, { method: 'HEAD' })
            const headers = response.headers

            const securityHeaders = {
              'Strict-Transport-Security': headers.get('Strict-Transport-Security'),
              'X-Content-Type-Options': headers.get('X-Content-Type-Options'),
              'X-Frame-Options': headers.get('X-Frame-Options'),
              'X-XSS-Protection': headers.get('X-XSS-Protection'),
              'Content-Security-Policy': headers.get('Content-Security-Policy'),
              'Referrer-Policy': headers.get('Referrer-Policy'),
              'Permissions-Policy': headers.get('Permissions-Policy')
            }

            const missingHeaders = Object.entries(securityHeaders)
              .filter(([key, value]) => !value)
              .map(([key]) => key)

            if (missingHeaders.length > 0) {
              console.warn('Missing security headers:', missingHeaders)
              if (window.gtag) {
                window.gtag('event', 'security_warning', {
                  warning_type: 'missing_security_headers',
                  missing_headers: missingHeaders.join(',')
                })
              }
            } else {
              console.log('All security headers present')
              if (window.gtag) {
                window.gtag('event', 'security_check', {
                  status: 'all_headers_present'
                })
              }
            }
          } catch (error) {
            console.error('Error checking security headers:', error)
          }
        }

        // Monitor for potential XSS attempts
        const monitorXSS = () => {
          const urlParams = new URLSearchParams(window.location.search)
          const suspiciousParams = []

          for (const [key, value] of urlParams) {
            // Check for common XSS patterns
            const xssPatterns = [
              /<script/i,
              /javascript:/i,
              /on\w+\s*=/i,
              /data:text\/html/i,
              /vbscript:/i
            ]

            if (xssPatterns.some(pattern => pattern.test(value))) {
              suspiciousParams.push({ key, value })
            }
          }

          if (suspiciousParams.length > 0) {
            console.warn('Potential XSS attempt detected:', suspiciousParams)
            if (window.gtag) {
              window.gtag('event', 'security_alert', {
                alert_type: 'potential_xss',
                suspicious_params: suspiciousParams.length
              })
            }
          }
        }

        // Monitor for clickjacking attempts
        const monitorClickjacking = () => {
          // Check if page is being loaded in an iframe
          if (window.top !== window.self) {
            console.warn('Page loaded in iframe - potential clickjacking attempt')
            if (window.gtag) {
              window.gtag('event', 'security_alert', {
                alert_type: 'potential_clickjacking'
              })
            }
          }
        }

        // Run security checks
        checkSecurityHeaders()
        monitorXSS()
        monitorClickjacking()
      }

      // Set up CSP violation reporting
      if ('addEventListener' in window) {
        window.addEventListener('securitypolicyviolation', reportCSPViolation)
      }

      // Run initial security check
      setTimeout(monitorSecurityEvents, 1000)

      // Monitor for security events periodically
      const securityCheckInterval = setInterval(monitorSecurityEvents, 300000) // Every 5 minutes

      // Cleanup
      return () => {
        if ('removeEventListener' in window) {
          window.removeEventListener('securitypolicyviolation', reportCSPViolation)
        }
        clearInterval(securityCheckInterval)
      }
    }
  }, [])

  return null
} 