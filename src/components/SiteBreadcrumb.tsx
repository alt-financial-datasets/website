'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const ROUTE_LABELS: Record<string, string> = {
  '/datasets/gov-spending': 'gov-spending',
  '/datasets/weather': 'weather',
  '/datasets/gov-housing': 'gov-housing',
}

export function SiteBreadcrumb() {
  const pathname = usePathname()
  const sub = ROUTE_LABELS[pathname.replace(/\/$/, '')]
  const [ribeonHovered, setRibeonHovered] = useState(false)
  const [subHovered, setSubHovered] = useState(false)

  return (
    <div
      style={{
        padding: '36px 40px 0',
        display: 'flex',
        alignItems: 'baseline',
        gap: '0',
        userSelect: 'none',
      }}
    >
      {/* ~/  prefix */}
      <span
        style={{
          fontSize: '16px',
          color: 'var(--muted)',
          fontFamily: 'var(--font-mono)',
          marginRight: '2px',
        }}
      >
        ~/
      </span>

      {/* ribeon — keeps serif bold font; thin underline when in a sub-page */}
      <Link
        href="/"
        onClick={(e) => {
          if (pathname === '/') {
            e.preventDefault()
            window.location.reload()
          }
        }}
        onMouseEnter={() => setRibeonHovered(true)}
        onMouseLeave={() => setRibeonHovered(false)}
        style={{
          fontSize: '24px',
          fontFamily: 'var(--font-serif)',
          fontWeight: 800,
          color: 'var(--navy)',
          textDecorationLine: sub ? 'underline' : 'none',
          textDecorationThickness: '1px',
          lineHeight: 1,
          padding: '2px 4px',
          borderRadius: '3px',
          background: ribeonHovered ? '#e8e8e8' : 'transparent',
          transition: 'background 0.15s ease',
        }}
      >
        ribeon
      </Link>

      {/* / dataset-segment — only on sub-pages */}
      {sub && (
        <>
          <span
            style={{
              fontSize: '16px',
              color: 'var(--muted)',
              margin: '0 5px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            /
          </span>
          <span
            onClick={() => window.location.reload()}
            onMouseEnter={() => setSubHovered(true)}
            onMouseLeave={() => setSubHovered(false)}
            style={{
              fontSize: '16px',
              color: 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.3px',
              cursor: 'pointer',
              padding: '2px 4px',
              borderRadius: '3px',
              background: subHovered ? '#e8e8e8' : 'transparent',
              transition: 'background 0.15s ease',
            }}
          >
            {sub}
          </span>
        </>
      )}
    </div>
  )
}
