'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ShoppingCart, Search, DollarSign, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const painPoints = [
  {
    icon: ShoppingCart,
    title: 'Carritos abandonados sin recuperar',
    description:
      'El 70% de tus compradores abandona el carrito. Sin IA conversacional, ese dinero se va para siempre.',
  },
  {
    icon: Search,
    title: 'Búsqueda interna que no convierte',
    description:
      'Si tu búsqueda no entiende intención, el cliente no encuentra lo que busca y rebota a la competencia.',
  },
  {
    icon: DollarSign,
    title: 'Agencias en USA cobran $50k+',
    description:
      'El mismo stack tecnológico que usan las top brands en New York está fuera de presupuesto para LatAm.',
  },
  {
    icon: TrendingUp,
    title: 'Comisiones que crecen con tu éxito',
    description:
      'Cuanto más vendes en Shopify sin optimización, más comisiones pagas. El "impuesto al éxito" te frena.',
  },
]

const comparisonData = [
  {
    platform: 'Setup Shopify',
    usa: '$12,000–$30,000 USD',
  },
  {
    platform: 'Setup MedusaJS Headless',
    usa: '$25,000–$50,000 USD',
  },
]

export function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const tableRef = useRef(null)
  const tableInView = useInView(tableRef, { once: true, amount: 0.3 })

  return (
    <section
      id="servicios"
      ref={ref}
      className="relative py-28"
      style={{ background: '#0f1629' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-[#00e5cc] mb-4"
        >
          El Problema
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-4xl md:text-5xl text-white mb-14 max-w-2xl text-balance"
        >
          Tu tienda tiene tráfico. Pero el dinero se escapa por las grietas.
        </motion.h2>

        {/* Pain points grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-20">
          {painPoints.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="glass rounded-2xl p-6 border-l-4 border-red-500 glass-hover"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={18} className="text-red-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-base mb-1.5">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          ref={tableRef}
          initial={{ opacity: 0, y: 40 }}
          animate={tableInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl overflow-hidden border border-white/8"
        >
          {/* Table header */}
          <div className="px-6 py-4 border-b border-white/8 flex items-center justify-between flex-wrap gap-2">
            <h3 className="font-display font-bold text-white text-lg">
              ¿Cuánto cobra una agencia en USA?
            </h3>
            <Badge
              className="font-mono text-xs px-3 py-1 rounded-full"
              style={{ background: 'linear-gradient(135deg, #00e5cc20, #00bfa520)', color: '#00e5cc', border: '1px solid #00e5cc40' }}
            >
              Referencia de mercado
            </Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/3">
                  <th className="text-left px-6 py-3.5 text-slate-400 font-medium">Plataforma</th>
                  <th className="text-left px-6 py-3.5 text-slate-400 font-medium">Costo en Agencia USA</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-t border-white/5 ${i % 2 === 0 ? 'bg-white/1' : ''}`}
                  >
                    <td className="px-6 py-4 font-medium text-white">{row.platform}</td>
                    <td className="px-6 py-4 text-red-400 font-mono">{row.usa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
