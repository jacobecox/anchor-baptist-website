'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  style,
  priority = false,
  fallback = false // Set to true to force regular img tag
}) {
  const [imageError, setImageError] = useState(false)
  const [useFallback, setUseFallback] = useState(fallback)

  // If fallback is forced or image failed to load, use regular img
  if (useFallback || imageError) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ width: width, height: height, ...style }}
        onError={() => setImageError(true)}
      />
    )
  }

  // Use Next.js Image for optimization
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      priority={priority}
      onError={() => setUseFallback(true)}
      quality={90}
    />
  )
} 