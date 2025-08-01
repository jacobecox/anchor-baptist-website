'use client'
import { useState, useEffect } from 'react'

export default function PWAInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true)
      return
    }

    // Check if mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent) ||
                            window.innerWidth <= 768
      setIsMobile(isMobileDevice)
      return isMobileDevice
    }

    const isMobileDevice = checkMobile()

    // Only proceed if mobile
    if (!isMobileDevice) {
      return
    }

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(isIOSDevice)

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Show manual prompt after 5 seconds if no automatic prompt
    const timer = setTimeout(() => {
      if (!isStandalone && isMobileDevice) {
        setShowPrompt(true)
      }
    }, 5000)

    // Listen for window resize to update mobile detection
    const handleResize = () => {
      checkMobile()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [isStandalone])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setShowPrompt(false)
      }
      setDeferredPrompt(null)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
  }

  // Don't show on desktop or if already installed
  if (!isMobile || isStandalone || !showPrompt) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-custom-blue rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900">
            Install Calvary Baptist App
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {isIOS 
              ? "Tap the share button and select 'Add to Home Screen'"
              : "Get quick access to our church website"
            }
          </p>
          
          {!isIOS && deferredPrompt && (
            <button
              onClick={handleInstall}
              className="mt-2 bg-custom-blue text-white px-3 py-1 rounded text-sm font-medium hover:bg-slate-700 transition-colors"
            >
              Install Now
            </button>
          )}
          
          {isIOS && (
            <div className="mt-2 text-xs text-gray-500">
              <p>1. Tap the share button (📤)</p>
              <p>2. Scroll down and tap "Add to Home Screen"</p>
              <p>3. Tap "Add" to install</p>
            </div>
          )}
        </div>
        
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
} 