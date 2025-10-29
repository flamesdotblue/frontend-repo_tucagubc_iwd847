import React from 'react'
import HeroCover from './components/HeroCover'
import EngineShowcase from './components/EngineShowcase'
import ParallaxGallery from './components/ParallaxGallery'
import ThrustCalculator from './components/ThrustCalculator'

function App() {
  return (
    <div className="min-h-screen bg-black text-white font-['Manrope',_Inter,_system-ui]">
      <HeroCover />
      <EngineShowcase />
      <ParallaxGallery />
      <ThrustCalculator />
      <footer className="relative border-t border-white/10 bg-black/60">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,rgba(99,102,241,0.08),transparent_70%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-10 flex items-center justify-between">
          <div className="text-sm text-white/60">Crafted for cinematic aerospace presentations</div>
          <a href="#" className="text-sm text-white/70 hover:text-white">Back to top ↑</a>
        </div>
      </footer>
    </div>
  )
}

export default App
