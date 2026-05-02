import { useMemo } from 'react'

const SYMBOLS = ['💕','💗','💓','💝','🌸','✨','💖']

export default function HeartParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      symbol: SYMBOLS[i % SYMBOLS.length],
      left:  `${Math.random() * 98}%`,
      dur:   `${13 + Math.random() * 10}s`,
      delay: `-${Math.random() * 20}s`,
      size:  `${0.65 + Math.random() * 0.75}rem`,
    })), [])

  return (
    <div className="hearts-container">
      {particles.map(p => (
        <div
          key={p.id}
          className="heart-particle"
          style={{ left: p.left, animationDuration: p.dur, animationDelay: p.delay, fontSize: p.size }}
        >
          {p.symbol}
        </div>
      ))}
    </div>
  )
}