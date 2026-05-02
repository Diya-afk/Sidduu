import { useState, useEffect, useRef } from 'react'

const PART1 = `Hi baby, I know we fight a lot, but trust me, I love you so much.\n\nFrom the day I met you, my love for you has been growing`
const PART2 = ` exponentially — just like this 💕`

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

function Graph({ show }) {
  const pathRef = useRef(null)
  const [ready, setReady] = useState(false)

  const W = 270, H = 155
  const pts = []
  for (let x = 0; x <= W; x += 3) {
    const t = x / W
    const y = H - ((Math.exp(3.6 * t) - 1) / (Math.exp(3.6) - 1)) * (H - 8)
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  const d = `M ${pts.join(' L ')}`

  useEffect(() => {
    if (pathRef.current) setReady(true)
  }, [])

  const endX = W
  const endY = 8

  return (
    <div className={`graph-wrapper${show ? ' graph-show' : ''}`}>
      <svg width={W} height={H + 32} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="gGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#ff6b9d" />
            <stop offset="100%" stopColor="#ffeaa7" />
          </linearGradient>
          <filter id="gGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Axes */}
        <line x1="0" y1={H} x2={W} y2={H} stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
        <line x1="0" y1="0" x2="0"  y2={H} stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>

        {/* Axis labels */}
        <text x={W/2} y={H+22} fill="rgba(255,255,255,0.32)" fontSize="11"
          textAnchor="middle" fontFamily="Lato,sans-serif">time →</text>
        <text x="-8" y={H/2+4} fill="rgba(255,255,255,0.32)" fontSize="11"
          textAnchor="end" fontFamily="Lato,sans-serif">love ↑</text>

        {/* Curve */}
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="url(#gGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#gGlow)"
          pathLength="1000"
          strokeDasharray="1000"
          strokeDashoffset={ready && show ? 0 : 1000}
          style={{ transition: ready && show ? 'stroke-dashoffset 2.6s cubic-bezier(0.22,1,0.36,1)' : 'none' }}
        />

        {/* End dot */}
        {show && ready && (
          <circle cx={endX} cy={endY} fill="#ffeaa7" filter="url(#gGlow)">
            <animate attributeName="r" values="4;7;4" dur="1.6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0.55;1" dur="1.6s" repeatCount="indefinite"/>
          </circle>
        )}
      </svg>
      <p className="graph-label">my love for you 💕</p>
    </div>
  )
}

export default function Message1() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [showGraph, setShowGraph] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.45 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const [text1, done1] = useTyper(PART1, 36, inView)
  const [text2, done2] = useTyper(PART2, 52, done1)

  useEffect(() => {
    if (done1) { const t = setTimeout(() => setShowGraph(true), 300); return () => clearTimeout(t) }
  }, [done1])

  return (
    <div ref={ref} className="message-section msg1-bg">
      <div className="msg-orb msg-orb1" />
      <div className="msg-orb msg-orb2" />

      <div className="msg1-layout">
        <div className="msg1-text">
          <div className="msg-quote">"</div>
          <p className="msg-text">
            {text1}
            <span className="highlight-text">{text2}</span>
            {!done2 && <span className="typing-cursor" />}
          </p>
        </div>
        <div className="msg1-graph">
          <Graph show={showGraph} />
        </div>
      </div>
    </div>
  )
}