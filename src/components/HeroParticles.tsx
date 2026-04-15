'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  bvx: number
  bvy: number
  r: number
  rgb: string
}

// Radius within which the cursor attracts particles
const ATTRACT_R = 170
// Max connection distance between two attracted particles
const CONNECT_D = 85
// Top speed cap
const MAX_SPD = 1.8

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999, on: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let particles: Particle[] = []

    const fit = () => {
      const { width, height } = canvas.parentElement!.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
    }

    const init = () => {
      const n = Math.min(190, Math.floor((canvas.width * canvas.height) / 5200))
      particles = Array.from({ length: n }, () => {
        const bvx = (Math.random() - 0.5) * 0.28
        const bvy = (Math.random() - 0.5) * 0.28
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: bvx, vy: bvy, bvx, bvy,
          r: Math.random() * 1.7 + 0.3,
          rgb: Math.random() > 0.5 ? '0,212,170' : '59,125,255',
        }
      })
    }

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: mx, y: my, on } = mouse.current

      // ── Scanner field ──────────────────────────────────────────────────────
      if (on) {
        const grd = ctx.createRadialGradient(mx, my, 0, mx, my, ATTRACT_R)
        grd.addColorStop(0,    'rgba(0,212,170,0.08)')
        grd.addColorStop(0.45, 'rgba(59,125,255,0.04)')
        grd.addColorStop(1,    'rgba(0,0,0,0)')
        ctx.beginPath()
        ctx.arc(mx, my, ATTRACT_R, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Outer ring
        ctx.beginPath()
        ctx.arc(mx, my, ATTRACT_R, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(0,212,170,0.12)'
        ctx.lineWidth = 1
        ctx.stroke()

        // Inner ring
        ctx.beginPath()
        ctx.arc(mx, my, 12, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(0,212,170,0.35)'
        ctx.lineWidth = 1
        ctx.stroke()

        // Centre dot
        ctx.beginPath()
        ctx.arc(mx, my, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0,212,170,0.9)'
        ctx.fill()
      }

      // ── Update + draw particles ────────────────────────────────────────────
      const lit: Particle[] = []

      for (const p of particles) {
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.hypot(dx, dy)
        let alpha: number

        if (on && dist < ATTRACT_R) {
          const t = 1 - dist / ATTRACT_R
          p.vx += dx * t * 0.036
          p.vy += dy * t * 0.036
          alpha = 0.45 + t * 0.55
          lit.push(p)
        } else {
          // Drift back toward base velocity
          p.vx += (p.bvx - p.vx) * 0.04
          p.vy += (p.bvy - p.vy) * 0.04
          alpha = 0.22
        }

        const spd = Math.hypot(p.vx, p.vy)
        if (spd > MAX_SPD) { p.vx = (p.vx / spd) * MAX_SPD; p.vy = (p.vy / spd) * MAX_SPD }

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.rgb},${alpha})`
        ctx.fill()
      }

      // ── Signal connections between lit particles ───────────────────────────
      for (let i = 0; i < lit.length; i++) {
        for (let j = i + 1; j < lit.length; j++) {
          const dd = Math.hypot(lit[i].x - lit[j].x, lit[i].y - lit[j].y)
          if (dd < CONNECT_D) {
            ctx.beginPath()
            ctx.moveTo(lit[i].x, lit[i].y)
            ctx.lineTo(lit[j].x, lit[j].y)
            ctx.strokeStyle = `rgba(0,212,170,${(1 - dd / CONNECT_D) * 0.6})`
            ctx.lineWidth = 0.9
            ctx.stroke()
          }
        }
        // Spoke to cursor
        if (on) {
          const dd = Math.hypot(mx - lit[i].x, my - lit[i].y)
          ctx.beginPath()
          ctx.moveTo(lit[i].x, lit[i].y)
          ctx.lineTo(mx, my)
          ctx.strokeStyle = `rgba(59,125,255,${(1 - dd / ATTRACT_R) * 0.14})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }

      raf = requestAnimationFrame(frame)
    }

    fit()
    init()
    frame()

    const hero = canvas.parentElement!

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top, on: true }
    }
    const onLeave = () => { mouse.current.on = false }
    const onTouch = (e: TouchEvent) => {
      const r = canvas.getBoundingClientRect()
      const t = e.touches[0]
      mouse.current = { x: t.clientX - r.left, y: t.clientY - r.top, on: true }
    }
    const onResize = () => { fit(); init() }

    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    hero.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
      hero.removeEventListener('touchmove', onTouch)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
