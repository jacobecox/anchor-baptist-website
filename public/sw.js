const CACHE_NAME = 'calvary-baptist-v1.0.1'
const STATIC_CACHE = 'static-v1.1'
const DYNAMIC_CACHE = 'dynamic-v1.1'

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/beliefs',
  '/how-to-be-saved',
  '/visit',
  '/watch',
  '/events',
  '/more',
  '/calvary-baptist-logo.jpg',
  '/CBSV-logo.jpg',
  '/CBSV1.jpg',
  '/CBSV2.jpg',
  '/CBSV3.jpg',
  '/CBSV4.jpg',
  '/CBSV5.jpg',
  '/CBSV6.jpg',
  '/CBSV7.jpg',
  '/CBSV8.jpg',
  '/CBSV9.jpg',
  '/CBSV10.jpg',
  '/CBSV11.jpg',
  '/aaron-burden-cmIqkMPfpMQ-unsplash.jpg',
  '/beach-1868772.jpg',
  '/synagogue.jpg',
  '/CBC square logo no background.jpg',
  '/calvary-baptist-logo.png',
  '/CBC square logo no background.png'
]

// Install event - cache static files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static files')
        // Cache files individually to handle missing files gracefully
        return Promise.allSettled(
          STATIC_FILES.map(url => 
            cache.add(url).catch(error => {
              console.warn(`Failed to cache ${url}:`, error)
              return null
            })
          )
        )
      })
      .catch((error) => {
        console.error('Error caching static files:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Handle API requests (Supabase)
  if (url.pathname.includes('/rest/v1/') || url.pathname.includes('/auth/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful API responses
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseClone)
              })
          }
          return response
        })
        .catch(() => {
          // Fallback to cached API response if available
          return caches.match(request)
        })
    )
    return
  }

  // Handle static assets (images, CSS, JS)
  if (request.destination === 'image' || 
      request.destination === 'style' || 
      request.destination === 'script') {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response
          }
          return fetch(request)
            .then((response) => {
              if (response.status === 200) {
                const responseClone = response.clone()
                caches.open(DYNAMIC_CACHE)
                  .then((cache) => {
                    cache.put(request, responseClone)
                  })
              }
              return response
            })
        })
    )
    return
  }

        // Skip caching for admin routes to prevent stale data
      if (url.pathname.startsWith('/admin/')) {
        event.respondWith(fetch(request))
        return
      }

      // Skip caching for Google Analytics to prevent CSP issues
      if (url.hostname === 'www.googletagmanager.com' || url.hostname === 'www.google-analytics.com') {
        event.respondWith(fetch(request))
        return
      }

  // Handle navigation requests (pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful page responses
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseClone)
              })
          }
          return response
        })
        .catch(() => {
          // Fallback to cached page if available
          return caches.match(request)
            .then((response) => {
              if (response) {
                return response
              }
              // Return cached homepage as fallback
              return caches.match('/')
            })
        })
    )
    return
  }

  // Default strategy - cache first, then network
  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          return response
        }
        return fetch(request)
          .then((response) => {
            if (response.status === 200) {
              const responseClone = response.clone()
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseClone)
                })
            }
            return response
          })
      })
  )
})

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync tasks
      console.log('Background sync triggered')
    )
  }
})

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New message from Calvary Baptist Church',
    icon: '/calvary-baptist-logo.jpg',
    badge: '/calvary-baptist-logo.jpg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Visit Website',
        icon: '/globe.svg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/window.svg'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Calvary Baptist Church', options)
  )
}) 