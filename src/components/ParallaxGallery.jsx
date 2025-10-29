import React, { useEffect, useRef, useState } from 'react'

function useScrollY() {
  const [y, setY] = useState(0)
  const raf = useRef(0)
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => setY(window.scrollY))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return y
}

const Starfield = () => {
  const canvasRef = useRef(null)
  const starsRef = useRef([])
  const rafRef = useRef(0)
  const parallax = useScrollY()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const makeStars = () => {
      const count = Math.min(400, Math.floor((width * height) / 6000))
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 1 + 0.2,
        s: Math.random() * 1.5 + 0.2,
      }))
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#0B0E14'
      ctx.fillRect(0, 0, width, height)
      for (const st of starsRef.current) {
        const offsetY = parallax * st.z * 0.06
        const x = st.x
        const y = (st.y + offsetY) % height
        const alpha = 0.5 + 0.5 * st.z
        ctx.beginPath()
        ctx.arc(x, y, st.s, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,220,255,${alpha})`
        ctx.fill()
      }
      rafRef.current = requestAnimationFrame(render)
    }

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
      makeStars()
    }

    makeStars()
    render()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [parallax])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

const Layer = ({ speed = 0.1, children }) => {
  const y = useScrollY()
  const translate = Math.round(y * speed)
  return (
    <div style={{ transform: `translate3d(0, ${translate}px, 0)` }} className="will-change-transform">
      {children}
    </div>
  )
}

const ParallaxGallery = () => {
  return (
    <section id="parallax" className="relative w-full text-white overflow-hidden">
      <div className="relative h-[160vh] bg-gradient-to-b from-black via-[#0A0D14] to-black">
        <div className="absolute inset-0">
          <Starfield />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,rgba(0,90,255,0.25),transparent_70%)] mix-blend-screen" />

        <div className="relative mx-auto max-w-6xl px-6 pt-24">
          <Layer speed={0.05}>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Parallax Flight Path</h2>
            <p className="mt-4 max-w-2xl text-white/70">
              Scroll to navigate between launch, max-Q, stage separation, and orbital insertion with smooth depth cues.
            </p>
          </Layer>

          <div className="mt-16 space-y-24">
            <Layer speed={0.12}>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <h3 className="text-xl font-semibold">Launch — T+0</h3>
                <p className="mt-2 text-white/70">Thrust vectoring and engine startup transient captured with microsecond precision.</p>
                <div className="mt-4 h-40 bg-gradient-to-r from-orange-500/20 via-rose-500/10 to-transparent rounded-xl" />
              </div>
            </Layer>

            <Layer speed={0.2}>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <h3 className="text-xl font-semibold">Max-Q — T+70s</h3>
                <p className="mt-2 text-white/70">Dynamic pressure peaks; guidance holds attitude while throttling minimizes aero loads.</p>
                <div className="mt-4 h-40 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-transparent rounded-xl" />
              </div>
            </Layer>

            <Layer speed={0.28}>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <h3 className="text-xl font-semibold">Stage Sep — T+150s</h3>
                <p className="mt-2 text-white/70">Pneumatic pushers and hot-staging skirt sequence co-optimized for impulse continuity.</p>
                <div className="mt-4 h-40 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/10 to-transparent rounded-xl" />
              </div>
            </Layer>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ParallaxGallery
