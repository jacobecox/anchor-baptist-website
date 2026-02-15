/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable image optimization
    unoptimized: false,
    // Allow external domains if needed
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'calvarybaptistsv.org',
      },
    ],
    // Configure image sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Set quality for optimized images
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizeCss: true,
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // HTTPS and security headers
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          // Content Security Policy
                           {
                   key: 'Content-Security-Policy',
                   value: [
                     "default-src 'self'",
                     "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
                     "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                     "font-src 'self' https://fonts.gstatic.com",
                     "img-src 'self' data: https: blob:",
                     "media-src 'self' https:",
                     "connect-src 'self' https://xkjyerpzcmqtylecnhrk.supabase.co https://www.google-analytics.com https://www.googletagmanager.com",
                     "frame-src 'self' https://www.google.com",
                     "object-src 'none'",
                     "base-uri 'self'",
                     "form-action 'self'",
                     "frame-ancestors 'none'",
                     "upgrade-insecure-requests"
                   ].join('; ')
                 }
        ]
      },
      // Additional security for admin routes
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow'
          },
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate'
          }
        ]
      }
    ]
  },

  async redirects() {
    return []
  },

  // Bundle analyzer (uncomment for debugging)
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    // Fix development issues
    if (dev) {
      // Clear module cache to prevent stale imports
      config.cache = false;
      
      // Improve module resolution
      config.resolve.alias = {
        ...config.resolve.alias,
      };
      
      // Fix module ID issues
      config.optimization = {
        ...config.optimization,
        moduleIds: 'named',
        // Prevent module concatenation in dev for better debugging
        concatenateModules: false,
      };
      
      // Better error handling
      config.stats = {
        errorDetails: true,
        children: true,
      };
    }
    
    return config;
  },
};

export default nextConfig;
