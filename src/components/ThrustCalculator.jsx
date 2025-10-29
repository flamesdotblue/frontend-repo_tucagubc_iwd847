import React, { useMemo, useState } from 'react'
import { Gauge, Thermometer, Zap } from 'lucide-react'

const Slider = ({ label, min, max, step = 1, value, setValue, unit }) => (
  <div>
    <div className="flex items-center justify-between">
      <label className="text-sm text-white/70">{label}</label>
      <span className="text-sm text-white/90 font-medium">{value.toLocaleString()} {unit}</span>
    </div>
    <input
      type="range"
      className="mt-2 w-full accent-cyan-400"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
    />
  </div>
)

const ThrustCalculator = () => {
  const [mdot, setMdot] = useState(250) // kg/s
  const [ve, setVe] = useState(3300) // m/s
  const [pa, setPa] = useState(101325) // Pa
  const [ae, setAe] = useState(0.6) // m^2
  const [pe, setPe] = useState(90000) // Pa

  const thrust = useMemo(() => {
    // T = mdot*Ve + (Pe - Pa) * Ae
    return mdot * ve + (pe - pa) * ae
  }, [mdot, ve, pe, pa, ae])

  const isp = useMemo(() => thrust / (mdot * 9.80665), [thrust, mdot])

  return (
    <section className="relative w-full bg-gradient-to-b from-black via-[#0B0E14] to-black text-white py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,rgba(255,115,0,0.10),transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs tracking-[0.3em] uppercase text-white/60">Performance Lab</span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Thrust & Isp Calculator
          </h2>
          <p className="mt-4 max-w-3xl text-white/70">
            Adjust mass flow, exhaust velocity, and pressure terms to see real-time thrust and specific impulse in SI units.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md space-y-6">
            <Slider label="Mass flow" min={50} max={800} step={1} value={mdot} setValue={setMdot} unit="kg/s" />
            <Slider label="Exhaust velocity" min={1500} max={4500} step={10} value={ve} setValue={setVe} unit="m/s" />
            <Slider label="Ambient pressure" min={0} max={101325} step={500} value={pa} setValue={setPa} unit="Pa" />
            <Slider label="Exit pressure" min={0} max={101325} step={500} value={pe} setValue={setPe} unit="Pa" />
            <Slider label="Exit area" min={0.2} max={2.0} step={0.01} value={ae} setValue={setAe} unit="m²" />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="rounded-2xl bg-black/40 border border-white/10 p-4">
                <div className="text-white/60 text-xs uppercase tracking-widest">Thrust</div>
                <div className="mt-2 flex items-end gap-2">
                  <Zap className="h-5 w-5 text-orange-400" />
                  <div className="text-3xl font-extrabold">{thrust.toFixed(0)}</div>
                  <div className="mb-1 text-white/60">N</div>
                </div>
              </div>
              <div className="rounded-2xl bg-black/40 border border-white/10 p-4">
                <div className="text-white/60 text-xs uppercase tracking-widest">Specific Impulse</div>
                <div className="mt-2 flex items-end gap-2">
                  <Gauge className="h-5 w-5 text-cyan-400" />
                  <div className="text-3xl font-extrabold">{isp.toFixed(1)}</div>
                  <div className="mb-1 text-white/60">s</div>
                </div>
              </div>
              <div className="rounded-2xl bg-black/40 border border-white/10 p-4">
                <div className="text-white/60 text-xs uppercase tracking-widest">Chamber Temp (est.)</div>
                <div className="mt-2 flex items-end gap-2">
                  <Thermometer className="h-5 w-5 text-rose-400" />
                  <div className="text-3xl font-extrabold">{(3500 + (ve - 2500) * 0.2).toFixed(0)}</div>
                  <div className="mb-1 text-white/60">K</div>
                </div>
              </div>
            </div>

            <div className="mt-8 h-40 w-full rounded-xl bg-gradient-to-r from-orange-400/20 via-cyan-400/20 to-violet-400/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0,transparent_95%,rgba(255,255,255,0.3)_100%)] animate-[pulse_2s_ease-in-out_infinite]" />
              <div className="absolute bottom-2 left-2 text-xs text-white/60">Impulse trend (normalized)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ThrustCalculator
