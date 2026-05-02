import { useState, useEffect, useRef } from 'react'

const TEXT = `Siddhant, we may have our ups and downs,\n\nbut always know that I love you more\nthan anyone and anything in this world —\n\nbecause you are my world 🌍`

function Globe() {
  return (
    <div className="globe-container">
      <div className="globe-glow-outer" />
      <div className="globe">
        <div className="globe-shine" />
        <div className="land land1" />
        <div className="land land2" />
        <div className="land land3" />
      </div>
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

export default function Message3() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.42 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const [text, done] = useTyper(TEXT, 44, inView)

  return (
    <div ref={ref} className="message-section msg3-bg">
      <div className="msg-orb msg3-orb1" />

      <div className="msg3-layout">
        <div className="msg3-text">
          <div className="msg-quote">"</div>
          <p className="msg-text">
            {text}
            {!done && <span className="typing-cursor" />}
          </p>
        </div>
        <div className="msg3-globe">
          {inView && <Globe />}
        </div>
      </div>
    </div>
  )
}