'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

type Tab = 'about' | 'team' | 'contact'

export function SidebarTabs() {
  const [active, setActive] = useState<Tab>('about')
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' })
  const [captcha, setCaptcha] = useState({ a: 4, b: 5 })
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaError, setCaptchaError] = useState(false)
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dlaRef = useRef<{ stop: () => void } | null>(null)

  const runDLA = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (dlaRef.current) dlaRef.current.stop()

    const ctx = canvas.getContext('2d')!
    const W = canvas.width
    const H = canvas.height
    const radius = 100
    const cx = W - 55
    const cy = H / 2

    ctx.clearRect(0, 0, W, H)

    const tree = new Set<string>()
    let maxRadius = 0
    let particleCount = 0
    const maxParticles = 1250
    let running = true
    let animId = 0

    const key = (x: number, y: number) => `${Math.floor(x)},${Math.floor(y)}`

    const addPoint = (x: number, y: number) => {
      tree.add(key(x, y))
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
      maxRadius = Math.max(maxRadius, dist)
      particleCount++
      const p = particleCount / maxParticles
      ctx.fillStyle = p < 0.33 ? '#F5C842' : p < 0.67 ? '#f8d86a' : '#fbe998'
      ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1)
    }

    const isAdjacentToTree = (x: number, y: number) => {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue
          if (tree.has(key(x + dx, y + dy))) return true
        }
      }
      return false
    }

    const iterate = () => {
      const spawnR = Math.min(maxRadius + 20, radius - 2)
      const angle = Math.random() * Math.PI * 2
      let x = cx + spawnR * Math.cos(angle)
      let y = cy + spawnR * Math.sin(angle)
      for (let step = 0; step < 10000; step++) {
        if (isAdjacentToTree(x, y)) { addPoint(x, y); return true }
        x += Math.floor(Math.random() * 3) - 1
        y += Math.floor(Math.random() * 3) - 1
        if (Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) > radius - 2) return false
      }
      return false
    }

    addPoint(cx, cy)

    const animate = () => {
      if (!running) return
      for (let i = 0; i < 5; i++) {
        iterate()
        if (maxRadius >= radius - 2) { running = false; return }
      }
      animId = requestAnimationFrame(animate)
    }

    animate()

    dlaRef.current = {
      stop: () => {
        running = false
        cancelAnimationFrame(animId)
      },
    }
  }, [])

  useEffect(() => {
    if (active === 'about') runDLA()
    return () => { if (dlaRef.current) dlaRef.current.stop() }
  }, [active, runDLA])

  useEffect(() => {
    setCaptcha({
      a: Math.floor(Math.random() * 9) + 1,
      b: Math.floor(Math.random() * 9) + 1,
    })
  }, [])

  const tabStyle = (id: Tab): React.CSSProperties => ({
    color: 'var(--navy)',
    textDecoration: 'none',
    fontSize: '12px',
    cursor: 'pointer',
    opacity: active === id ? 1 : 0.3,
    transition: 'opacity 0.25s ease, border-bottom-color 0.25s ease',
    fontFamily: 'var(--font-mono)',
    letterSpacing: '0.5px',
    textTransform: 'uppercase' as const,
    paddingBottom: '3px',
    borderBottom: active === id ? '1px solid var(--navy)' : '1px solid transparent',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (parseInt(captchaInput) !== captcha.a + captcha.b) {
      setCaptchaError(true)
      return
    }
    setCaptchaError(false)
    setSubmitting(true)
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      })
      if (res.ok) {
        setSent(true)
        setForm({ name: '', company: '', email: '', phone: '', message: '' })
        setCaptchaInput('')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 10px',
    fontSize: '12px',
    fontFamily: 'var(--font-mono)',
    color: 'var(--navy)',
    background: 'transparent',
    border: '1px solid var(--navy)',
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <>
      {/* Nav tabs */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '22px' }}>
        {(['about', 'team', 'contact'] as Tab[]).map((id) => (
          <a
            key={id}
            href="#"
            onClick={(e) => { e.preventDefault(); setActive(id) }}
            style={tabStyle(id)}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </div>

      {/* About */}
      {active === 'about' && (
        <div style={{ lineHeight: 1.85, color: 'var(--muted)' }}>
          <p style={{ marginBottom: '0', fontSize: '19px', fontFamily: 'var(--font-serif)', color: 'var(--navy)', lineHeight: 1.75 }}>
            Ribeon brings alternative data to institutional investors and researchers. We build actionable signals from primary sources and map them to tradeable instruments. <br /><br /> We are a team of quants, engineers, and scientists developing new ways to extract alpha from real-world data.
          </p>
          <div style={{ marginTop: '0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0' }}>
            <canvas
              ref={canvasRef}
              width={280}
              height={220}
              style={{ display: 'block', width: '280px', height: '220px' }}
            />
            <button
              onClick={runDLA}
              style={{
                alignSelf: 'flex-end',
                background: 'none',
                border: 'none',
                color: 'var(--muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                textDecoration: 'underline',
                cursor: 'pointer',
                padding: 0,
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Generate Brownian tree
            </button>
          </div>
        </div>
      )}

      {/* Team */}
      {active === 'team' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Kimon */}
          <div>
            <a href="https://www.linkedin.com/in/kimon-dafnas-0b8656202/" target="_blank" rel="noopener" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#c4a84f', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid var(--border)' }}>
              Kimon Dafnas ↗
            </a>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.5px', marginTop: '5px', marginBottom: '7px' }}>
              Co-Founder &amp; CEO · MSc Quantitative Finance
            </div>
            <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
              Leads company strategy and client relationships drawing on deep expertise in quantitative finance. His background in financial modeling shapes the methodology behind Ribeon's datasets, ensuring products meet the standards of professional allocators.
            </p>
          </div>
          {/* Thomas */}
          <div>
            <a href="https://thomasrribeiro.com/" target="_blank" rel="noopener" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#c4a84f', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid var(--border)' }}>
              Thomas Ribeiro ↗
            </a>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.5px', marginTop: '5px', marginBottom: '7px' }}>
              Co-Founder &amp; CTO · MSc Biomedical Engineering
            </div>
            <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>
              Leads the technical architecture at Ribeon with a background spanning signal processing, systems design and applied machine learning. He oversees the engineering infrastructure and drives the full technical stack from data acquisition and ingestion to signal delivery.
            </p>
          </div>
        </div>
      )}

      {/* Contact */}
      {active === 'contact' && (
        <div style={{ fontSize: '13px', color: 'var(--muted)' }}>
          {sent ? (
            <p style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
              Message sent — we&apos;ll be in touch shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                placeholder="Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                style={inputStyle}
              />
              <input
                type="email"
                placeholder="Email *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                style={inputStyle}
              />
              <input
                type="tel"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                style={inputStyle}
              />
              <textarea
                placeholder="Message *"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                style={{ ...inputStyle, resize: 'vertical' }}
              />
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                  What is {captcha.a} + {captcha.b}? *
                </div>
                <input
                  type="number"
                  placeholder="Answer"
                  value={captchaInput}
                  onChange={(e) => { setCaptchaInput(e.target.value); setCaptchaError(false) }}
                  required
                  style={inputStyle}
                />
                {captchaError && (
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--negative)', marginTop: '4px' }}>
                    Incorrect — try again.
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: '9px 0',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--bg)',
                  background: 'var(--navy)',
                  border: 'none',
                  cursor: submitting ? 'wait' : 'pointer',
                  opacity: submitting ? 0.6 : 1,
                }}
              >
                {submitting ? 'Sending...' : 'Submit'}
              </button>
            </form>
          )}
        </div>
      )}
    </>
  )
}
