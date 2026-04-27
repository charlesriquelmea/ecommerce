'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Layers, Bot, CheckCircle, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const plans = [
  {
    id: 'shopify',
    icon: Zap,
    label: 'SHOPIFY STARTER',
    price: '$970',
    retainer: '$290/mes',
    delivery: '10–14 días',
    featured: false,
    badgeText: null,
    accentColor: '#10b981',
    accentBorder: 'border-t-emerald-500',
    cta: 'Empezar con Shopify →',
    ctaClass: 'btn-amber',
    features: [
      'Storefront Shopify personalizado',
      'Integración MercadoPago + pasarelas locales',
      'Apps esenciales (reviews, upsell, email)',
      'SEO técnico + sitemap + redirects',
      'Core Web Vitals optimizados',
      'Analytics dashboard integrado',
      'Soporte post-lanzamiento 30 días',
      'Capacitación equipo admin',
    ],
  },
  {
    id: 'medusa',
    icon: Layers,
    label: 'MEDUSAJS HEADLESS',
    price: '$1,490',
    retainer: '$350/mes',
    delivery: '14–21 días',
    featured: true,
    badgeText: 'MÁS POPULAR',
    accentColor: '#00e5cc',
    accentBorder: 'border-t-[#00e5cc]',
    cta: 'Empezar con MedusaJS →',
    ctaClass: 'btn-cyan',
    features: [
      'Todo lo incluido en Shopify Starter',
      'Storefront Next.js headless + API MedusaJS',
      'CMS headless (Sanity o Contentful)',
      '0% comisión por transacción — siempre',
      'Multi-currency y multi-región nativo',
      'Arquitectura microservicios escalable',
      'CI/CD en Vercel + GitHub Actions',
      'Código 100% tuyo — sin vendor lock-in',
      'Docker + PostgreSQL self-hosteable',
      'Documentación técnica personalizada',
      'API REST + GraphQL para mobile',
      'Soporte post-lanzamiento 60 días',
    ],
  },
  {
    id: 'ecommy',
    icon: Bot,
    label: 'eCOMMY AI',
    price: '$1,790',
    retainer: '$390/mes',
    delivery: null,
    featured: false,
    badgeText: 'ADD-ON',
    accentColor: '#f59e0b',
    accentBorder: 'border-t-amber-500',
    cta: 'Agregar a mi plan →',
    ctaClass: 'btn-amber',
    features: [
      'Compatible con Shopify y MedusaJS',
      'Personal Shopper conversacional 24/7',
      'RAG sobre tu catálogo de productos',
      'Embeddings semánticos actualizados',
      'Recuperación de carritos con IA',
    ],
    compatBadge: 'Compatible con ambos planes',
  },
]

export function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section
      id="precios"
      ref={ref}
      className="relative py-28"
      style={{ background: '#0a0f1e' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-[#00e5cc] mb-4 text-center"
        >
          Planes
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-4xl md:text-5xl text-white mb-14 text-center text-balance"
        >
          Transparencia total. Sin letra pequeña.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map(({ icon: Icon, ...plan }, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
              whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 250 } }}
              className={`glass rounded-2xl p-8 border-t-2 ${plan.accentBorder} border border-white/8 relative ${
                plan.featured ? 'ring-1 ring-[#00e5cc]/30 shadow-lg shadow-[#00e5cc]/5' : ''
              }`}
            >
              {plan.badgeText && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge
                    className="font-mono text-xs px-3 py-1 rounded-full whitespace-nowrap"
                    style={{
                      background: plan.featured
                        ? 'linear-gradient(135deg, #00e5cc, #00bfa5)'
                        : plan.id === 'ecommy'
                        ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                        : 'rgba(255,255,255,0.1)',
                      color: plan.featured || plan.id === 'ecommy' ? '#0a0f1e' : '#fff',
                    }}
                  >
                    {plan.badgeText}
                  </Badge>
                </div>
              )}

              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${plan.accentColor}18`,
                    border: `1px solid ${plan.accentColor}30`,
                  }}
                >
                  <Icon size={18} style={{ color: plan.accentColor }} />
                </div>
                <h3
                  className="font-mono font-bold text-xs tracking-wider"
                  style={{ color: plan.accentColor }}
                >
                  {plan.label}
                </h3>
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="font-mono font-black text-4xl text-white mb-1">{plan.price}</p>
                <p className="text-slate-400 text-sm">Setup único · {plan.retainer} retainer</p>
                {plan.delivery && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <Clock size={12} className="text-slate-500" />
                    <span className="font-mono text-xs text-slate-500">{plan.delivery} hábiles</span>
                  </div>
                )}
                {plan.compatBadge && (
                  <span
                    className="inline-block mt-2 text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }}
                  >
                    {plan.compatBadge}
                  </span>
                )}
              </div>

              {/* Separator */}
              <div className="w-full h-px bg-white/8 mb-6" />

              {/* Features */}
              <ul className="space-y-2.5 mb-8">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle
                      size={14}
                      className="shrink-0 mt-0.5"
                      style={{ color: plan.accentColor }}
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contacto"
                className={`${plan.ctaClass} w-full block text-center py-3 rounded-xl text-sm font-bold`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-slate-500 text-xs mt-8 max-w-lg mx-auto"
        >
          Los precios son en USD. El retainer incluye hosting, mantenimiento y soporte. No hay contratos de permanencia mínima. Cancelación libre en cualquier momento.
        </motion.p>
      </div>
    </section>
  )
}
