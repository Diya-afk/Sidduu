import { useState, useRef, useEffect } from 'react'
import Intro from './components/Intro'
import Message1 from './components/Message1'
import FloatingGallery from './components/FloatingGallery'
import Message2 from './components/Message2'
import Message3 from './components/Message3'
import HeartParticles from './components/HeartParticles'
import GlowCursor from './components/GlowCursor'
import Timer from './components/Timer'
import './App.css'

const SECTIONS = ['intro', 'message1', 'gallery', 'message2', 'message3']

export default function App() {
  const audioRef = useRef(null)
  const scrollRef = useRef(null)
  const [activeSection, setActiveSection] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const idx = Math.round(el.scrollTop / window.innerHeight)
      setActiveSection(idx)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (i) =>
    scrollRef.current?.scrollTo({ top: i * window.innerHeight, behavior: 'smooth' })

  const handleStart = () => {
    setStarted(true)
    if (audioRef.current) {
      audioRef.current.volume = 0.22
      audioRef.current.play().catch(() => {})
    }
    scrollTo(1)
  }

  return (
    <div className="app">
      <audio ref={audioRef} loop>
        <source src="/music/bg.mp3" type="audio/mpeg" />
      </audio>

      <GlowCursor />
      <HeartParticles />
      {started && <Timer />}

      <div className="nav-dots">
        {SECTIONS.map((_, i) => (
          <div
            key={i}
            className={`nav-dot${activeSection === i ? ' active' : ''}`}
            onClick={() => scrollTo(i)}
          />
        ))}
      </div>

      <div className="scroll-container" ref={scrollRef}>
        <section className="section"><Intro onStart={handleStart} /></section>
        <section className="section"><Message1 /></section>
        <section className="section"><FloatingGallery /></section>
        <section className="section"><Message2 /></section>
        <section className="section"><Message3 /></section>
      </div>
    </div>
  )
}