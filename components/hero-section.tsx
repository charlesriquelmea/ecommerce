'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Globe, TrendingDown, Zap } from 'lucide-react'

const phrases = [
  'Tu tienda vende mientras duermes.',
  'Tu cliente pregunta. Tu AI responde. Tu caja sube.',
  'El mejor vendedor trabaja 24/7 y nunca se cansa.',
]

function TypewriterEyebrow() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => setBlink((b) => !b), 530)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const current = phrases[phraseIndex]
    let timeout: ReturnType<typeof setTimeout>
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 42)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2400)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 22)
    } else {
      setDeleting(false)
      setPhraseIndex((i) => (i + 1) % phrases.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, phraseIndex])

  return (
    <div className="flex items-center gap-1.5 mb-6">
      <span className="font-mono text-xs tracking-[0.18em] uppercase text-[#00e5cc]">
        {displayed}
      </span>
      <span
        className="inline-block w-[2px] h-3.5 bg-[#00e5cc] rounded-sm"
        style={{ opacity: blink ? 1 : 0, transition: 'opacity 0.1s' }}
      />
    </div>
  )
}

function FloatingAICard() {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="relative"
    >
      <div className="absolute -inset-8 rounded-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, #00e5cc 0%, transparent 70%)' }} />

      <div className="glass rounded-2xl p-5 w-80 relative z-10 shadow-2xl border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, #00e5cc, #00bfa5)' }}>
            <span className="text-[#0a0f1e] font-display font-black text-xs">AI</span>
          </div>
          <span className="font-display font-bold text-white text-sm">eCommy AI</span>
          <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white/8 rounded-xl rounded-tr-sm px-3 py-2 mb-3 ml-8 text-sm text-slate-300"
        >
          Busco un regalo deportivo bajo $50 💪
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <p className="text-xs text-slate-400 mb-2">Encontré 2 opciones perfectas para ti:</p>
          <div className="flex gap-2">
            {[
              { name: 'Running Pro X2', price: '$42', img: '🏃' },
              { name: 'Sport Band Elite', price: '$38', img: '⌚' },
            ].map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 + i * 0.2, duration: 0.4 }}
                className="flex-1 bg-white/5 rounded-xl p-2.5 border border-white/8 hover:border-[#00e5cc]/30 transition-colors cursor-pointer"
              >
                <div className="text-2xl mb-1 text-center">{product.img}</div>
                <p className="text-xs text-white font-medium leading-tight">{product.name}</p>
                <p className="font-mono text-xs text-[#00e5cc] font-bold mt-0.5">{product.price}</p>
              </motion.div>
            ))}
          </div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.4 }}
            className="w-full mt-3 py-1.5 rounded-lg text-xs font-bold text-[#0a0f1e]"
            style={{ background: 'linear-gradient(135deg, #00e5cc, #00bfa5)' }}
          >
            Agregar al carrito →
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

const trustBadges = [
  { icon: ShieldCheck, label: 'Stack idéntico a Top Agencies USA' },
  { icon: Globe, label: 'Comunicación en Español' },
  { icon: TrendingDown, label: 'Ahorro hasta 90%' },
  { icon: Zap, label: '0% comisiones con MedusaJS' },
]

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden noise-overlay"
      style={{ background: '#0a0f1e' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #00e5cc 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-8 blur-3xl"
          style={{ background: 'radial-gradient(circle, #00bfa5 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] opacity-5 blur-3xl"
          style={{
            background:
              'conic-gradient(from 180deg at 50% 50%, #00e5cc 0%, transparent 30%, #00bfa5 60%, transparent 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TypewriterEyebrow />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-bold text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.08] tracking-tight text-balance mb-6"
            >
              Sistema de ventas con AI que no solo muestra productos, sino que los{' '}
              <span className="text-gradient-cyan">&ldquo;vende&rdquo; mediante conversación.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl"
            >
              Shopify o MedusaJS Headless integrado a un agente IA que cierra ventas 24/7.
              Además ahorras hasta 90% frente a agencias en USA.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <a
                href="#contacto"
                className="btn-amber px-7 py-3.5 rounded-full text-base font-bold inline-flex items-center gap-2 shadow-lg"
              >
                Solicita tu Auditoría de IA Gratuita →
              </a>
              <a
                href="#servicios"
                className="text-slate-400 hover:text-slate-200 transition-colors text-sm font-medium"
              >
                Ver cómo funciona ↓
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-2"
            >
              {trustBadges.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.65 + i * 0.08 }}
                  className="glass flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700 text-xs text-slate-300"
                >
                  <Icon size={12} className="text-[#00e5cc] shrink-0" />
                  <span>{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: AI Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex justify-center items-center"
          >
            <FloatingAICard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
