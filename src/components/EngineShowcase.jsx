import React, { useRef } from 'react'
import { Flame, Gauge, Zap, Activity } from 'lucide-react'

// Utility: 3D tilt on hover using pointer position
function useCardTilt() {
  const ref = useRef(null)
  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = (x / rect.width) * 2 - 1
    const py = (y / rect.height) * 2 - 1
    el.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg)`
  }
  const onLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
  }
  return { ref, onMouseMove, onLeave }
}

const PartCard = ({ icon: Icon, title, stat, unit, desc, accent }) => {
  const { ref, onMouseMove, onLeave } = useCardTilt()
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 backdrop-blur-md transition will-change-transform"
    >
      <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${accent} opacity-0 transition-opacity duration-500 group-hover:opacity-40 blur-2xl`} />
      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white/10 p-2.5">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        </div>
        <div className="mt-4 flex items-end gap-2">
          <span className="text-4xl font-extrabold">{stat}</span>
          <span className="mb-1 text-white/60">{unit}</span>
        </div>
        <p className="mt-3 text-sm text-white/70 leading-relaxed">{desc}</p>
        <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="mt-4 flex items-center justify-between text-xs text-white/60">
          <span className="uppercase tracking-widest">Live Telemetry</span>
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Stable
          </span>
        </div>
      </div>
    </div>
  )
}

const EngineShowcase = () => {
  return (
    <section id="engine" className="relative w-full bg-gradient-to-b from-black via-[#05060A] to-black text-white py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(0,119,255,0.15),transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-transparent to-transparent" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs tracking-[0.3em] uppercase text-white/60">Propulsion Architecture</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Open-Cycle Methalox Engine
          </h2>
          <p className="mt-4 max-w-3xl text-white/70">
            A precision system of turbopumps, preburners, and regeneratively cooled nozzles. Explore key subsystems with live, interactive cards.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <PartCard
            icon={Flame}
            title="Combustion Chamber"
            stat="21.2"
            unit="MPa"
            desc="High-pressure, oxygen-rich combustion stabilized with coaxial injectors and film cooling."
            accent="from-orange-500/40 via-rose-500/30 to-purple-500/10"
          />
          <PartCard
            icon={Gauge}
            title="Turbopump"
            stat="87k"
            unit="rpm"
            desc="Dual-stage axial inducer feeding a high-efficiency centrifugal pump impeller."
            accent="from-cyan-400/40 via-blue-500/30 to-violet-500/10"
          />
          <PartCard
            icon={Zap}
            title="Nozzle"
            stat="340"
            unit="s Isp"
            desc="Expansion ratio tuned for sea-level and vacuum performance using adaptive skirt."
            accent="from-violet-400/40 via-fuchsia-500/30 to-pink-500/10"
          />
          <PartCard
            icon={Activity}
            title="Gimbal"
            stat="7.5"
            unit="deg"
            desc="Electrohydraulic vectoring with high-bandwidth control loops and fault tolerance."
            accent="from-emerald-400/40 via-teal-500/30 to-cyan-500/10"
          />
        </div>

        {/* Wireframe diagram */}
        <div className="mt-20 relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 overflow-hidden">
          <div className="pointer-events-none absolute -inset-24 opacity-40 bg-[radial-gradient(closest-side,rgba(255,255,255,0.08),transparent_70%)]" />
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="col-span-1">
              <h3 className="text-2xl font-bold">Exploded Flow Diagram</h3>
              <p className="mt-3 text-white/70">
                Trace propellant pathways from cryogenic tanks to the exhaust plume. Hover to reveal heat-exchanger loops and pressure deltas.
              </p>
            </div>
            <div className="col-span-2">
              <svg viewBox="0 0 900 360" className="w-full h-[260px] md:h-[320px]">
                <defs>
                  <linearGradient id="g1" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="900" height="360" fill="transparent" />
                {/* Tanks */}
                <circle cx="90" cy="80" r="40" fill="none" stroke="url(#g1)" strokeWidth="2" className="[filter:drop-shadow(0_0_6px_rgba(96,165,250,0.4))]" />
                <text x="90" y="85" textAnchor="middle" className="fill-white/80 text-[12px]">LOX</text>
                <circle cx="90" cy="280" r="40" fill="none" stroke="url(#g1)" strokeWidth="2" className="[filter:drop-shadow(0_0_6px_rgba(96,165,250,0.4))]" />
                <text x="90" y="285" textAnchor="middle" className="fill-white/80 text-[12px]">LCH4</text>
                {/* Lines to pump */}
                <path d="M130,80 C200,80 260,90 320,120" stroke="url(#g1)" strokeWidth="2" fill="none" className="opacity-80" />
                <path d="M130,280 C200,280 260,270 320,240" stroke="url(#g1)" strokeWidth="2" fill="none" className="opacity-80" />
                {/* Pump */}
                <rect x="320" y="140" width="120" height="80" rx="12" fill="rgba(255,255,255,0.06)" stroke="url(#g1)" />
                <text x="380" y="185" textAnchor="middle" className="fill-white/80 text-[12px]">Turbopump</text>
                {/* To chamber */}
                <path d="M440,180 C520,180 560,160 620,160" stroke="url(#g1)" strokeWidth="2" fill="none" />
                {/* Chamber */}
                <ellipse cx="660" cy="170" rx="26" ry="36" fill="rgba(255,255,255,0.06)" stroke="url(#g1)" />
                <text x="660" y="175" textAnchor="middle" className="fill-white/80 text-[12px]">Chamber</text>
                {/* Nozzle */}
                <path d="M690,170 C740,190 790,230 840,280" stroke="url(#g1)" strokeWidth="2" fill="none" />
                <path d="M690,170 C740,150 790,110 840,60" stroke="url(#g1)" strokeWidth="2" fill="none" />
                <text x="820" y="185" textAnchor="middle" className="fill-white/70 text-[12px]">Nozzle</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EngineShowcase
