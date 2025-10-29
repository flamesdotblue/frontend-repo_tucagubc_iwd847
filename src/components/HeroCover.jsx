import React from 'react'
import Spline from '@splinetool/react-spline'
import { Rocket, Activity } from 'lucide-react'

const HeroCover = () => {
  return (
    <section className="relative h-screen w-full bg-black text-white overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/er66D6jbuo0hIjmn/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Atmospheric glow overlays (do not block interaction) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        <div className="absolute -inset-20 bg-[radial-gradient(closest-side,rgba(105,76,255,0.25),transparent_70%)] mix-blend-screen" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center select-none">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
          <Activity className="h-4 w-4 text-plasma" />
          <span className="text-xs uppercase tracking-[0.2em] text-white/80">Aerospace-grade showcase</span>
        </div>
        <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight">
          Rockets & Engines
          <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">in Cinematic Detail</span>
        </h1>
        <p className="mt-6 max-w-2xl text-white/80">
          Explore ultra-realistic engine mechanisms, precision specs, and interactive systems with parallax motion crafted for performance.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <a
            href="#engine"
            className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 font-semibold shadow-xl shadow-cyan-500/10 transition hover:shadow-cyan-400/30"
          >
            <Rocket className="h-5 w-5" />
            Enter Engine Bay
            <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
          </a>
          <a
            href="#parallax"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white/90 hover:bg-white/10"
          >
            Experience Parallax
          </a>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
          <div className="flex flex-col items-center text-xs tracking-widest uppercase">
            <span>Scroll</span>
            <div className="mt-2 h-8 w-[1px] bg-gradient-to-b from-white/60 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroCover
