import { useEffect, useState } from 'react'

export default function Intro({ onStart }) {
  const [show, setShow] = useState(false)
  useEffect(() => { const t = setTimeout(() => setShow(true), 80); return () => clearTimeout(t) }, [])

  return (
    <div className={`intro-screen${show ? ' visible' : ''}`}>
      <div className="intro-orb orb1" />
      <div className="intro-orb orb2" />
      <div className="intro-orb orb3" />

      <div className="intro-content">
        <p className="intro-pre">✨ a little something for you ✨</p>
        <h1 className="intro-title">Hi, <span className="name-glow">Siddhant</span></h1>
        <div className="intro-heart">💕</div>
        <p className="intro-sub">press play to begin this little journey...</p>
        <button className="intro-btn" onClick={onStart}>
          <span>begin</span>
        </button>
      </div>
    </div>
  )
}