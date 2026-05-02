import { useState, useEffect, useRef, useMemo } from 'react'

const TEXT = `I love you to the moon and back.\n\nMy love for you will never end —\nit's just inevitable.\n\nI love you so, so much.\n\nYou are the brightest star\nin my night sky ✨`

function MoonScene() {
  const stars = useMemo(() =>
    Array.from({ length: 55 }, (_, i) => ({
      id: i,
      x:   Math.random() * 100,
      y:   Math.random() * 75,
      size: Math.random() * 2.4 + 0.5,
      delay: Math.random() * 5,
      dur:   Math.random() * 2.2 + 1.4,
    })), [])

  return (
    <div className="moon-scene">
      {stars.map(s => (
        <div key={s.id} className="star-dot" style={{
          left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size,
          animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s`
        }} />
      ))}
      <div className="moon-halo" />
      <div className="moon" />
      <div className="shooting-star" style={{ top: '18%', animationDelay: '0s' }} />
      <div className="shooting-star" style={{ top: '33%', animationDelay: '3.5s' }} />
      <div className="shooting-star" style={{ top: '52%', animationDelay: '6.5s' }} />
    </div>
  )
}

function useTyper(text, speed, active) {
  const [out, setOut] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!active) return
    let i = 0; setOut(''); setDone(false)
    const iv = setInterval(() => {
      i++; setOut(text.slice(0, i))
      if (i >= text.length) { clearInterval(iv); setDone(true) }
    }, speed)
    return () => clearInterval(iv)
  }, [active, text])
  return [out, done]
}

export default function Message2() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.42 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const [text, done] = useTyper(TEXT, 44, inView)

  return (
    <div ref={ref} className="message-section msg2-bg">
      <MoonScene />
      <div className="msg2-layout">
        <div className="message-content">
          <div className="msg-quote">"</div>
          <p className="msg-text">
            {text}
            {!done && <span className="typing-cursor" />}
          </p>
        </div>
      </div>
    </div>
  )
}