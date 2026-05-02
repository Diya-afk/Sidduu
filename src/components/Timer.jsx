import { useState, useEffect } from 'react'

const START = new Date('2025-04-28T00:00:00')

export default function Timer() {
  const [t, setT] = useState({})

  useEffect(() => {
    const calc = () => {
      const ms = Date.now() - START
      const s  = Math.floor(ms / 1000)
      setT({ d: Math.floor(s/86400), h: Math.floor((s%86400)/3600), m: Math.floor((s%3600)/60), s: s%60 })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="timer-badge">
      💕 together for{' '}
      <span>{t.d}d {t.h}h {t.m}m {t.s}s</span>
    </div>
  )
}