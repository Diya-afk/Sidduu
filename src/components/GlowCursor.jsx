import { useEffect, useRef } from 'react'

export default function GlowCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    let rx = 0, ry = 0, dx = 0, dy = 0, raf

    const onMove = (e) => { dx = e.clientX; dy = e.clientY }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      rx += (dx - rx) * 0.11
      ry += (dy - ry) * 0.11
      if (dotRef.current) {
        dotRef.current.style.left = `${dx}px`
        dotRef.current.style.top  = `${dy}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`
        ringRef.current.style.top  = `${ry}px`
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}