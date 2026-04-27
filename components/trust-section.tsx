'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, MessageSquare, TrendingDown, Unlock, Globe } from 'lucide-react'

const pillars = [
  {
    icon: Code2,
    title: 'Stack de Clase Mundial',
    description: 'El mismo stack técnico que usan Allbirds, Gymshark y marcas del S&P 500 — adaptado a tu presupuesto.',
  },
  {
    icon: MessageSquare,
    title: 'Comunicación Directa en Español',
    description: 'Sin intermediarios. Sin traducciones mal hechas. Tu project manager habla tu idioma desde día uno.',
  },
  {
    icon: TrendingDown,
    title: 'Precios hasta 90% más bajos',
    description: 'LatAm como ventaja competitiva real. Mismo talento, estructuras de costos radicalmente distintas.',
  },
  {
    icon: Unlock,
    title: 'Sin Contratos Forzados',
    description: 'Trabajamos mes a mes. Si no estás satisfecho, te vas sin penalidades. La confianza se gana, no se impone.',
  },
  {
    icon: Globe,
    title: 'LatAm: el Nuevo Hub Tech',
    description: 'Buenos Aires, Medellín, Ciudad de México y São Paulo compiten directamente con Silicon Valley en talento.',
  },
]

export function TrustSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      ref={ref}
      className="relative py-28 dot-grid"
      style={{ background: '#0d1525' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-4xl md:text-5xl text-white mb-4 text-center text-balance"
        >
          No somos un proveedor externo.
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="font-display font-black text-4xl md:text-5xl text-center mb-14 text-balance"
        >
          <span className="text-gradient-cyan">Somos tu brazo tecnológico.</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
          {pillars.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="glass rounded-2xl p-6 text-center border border-white/8 glass-hover"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(0,229,204,0.1)', border: '1px solid rgba(0,229,204,0.2)' }}
              >
                <Icon size={22} className="text-[#00e5cc]" />
              </div>
              <h3 className="font-display font-bold text-white text-sm mb-2 leading-snug">{title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
