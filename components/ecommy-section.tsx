'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Brain, Search, MessageCircle, ShoppingCart, ChevronRight, Send, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'RAG (Retrieval-Augmented Generation)',
    description:
      'Tu catálogo vive en una base vectorial. El AI recupera los productos exactos que el cliente busca — sin alucinaciones, sin resultados irrelevantes.',
    tech: 'RAG',
  },
  {
    icon: Search,
    title: 'Embeddings Semánticos',
    description:
      'Búsqueda por intención, no por palabras clave. "Algo para correr en lluvia" encuentra tus zapatillas impermeables aunque no tengan esa descripción exacta.',
    tech: 'Embeddings',
  },
  {
    icon: MessageCircle,
    title: 'Personal Shopper Conversacional',
    description:
      'El AI conversa, pregunta, recomienda. Como el mejor vendedor de tu tienda — pero disponible 24/7, en español, inglés o el idioma de tu cliente.',
    tech: 'LLM',
  },
  /* {
    icon: ShoppingCart,
    title: 'Carrito Recuperado con IA',
    description:
      'Detecta abandono en tiempo real y re-engancha al cliente con la oferta correcta en el momento exacto. Recupera hasta el 30% de carritos perdidos.',
    tech: 'Conversión',
  }, */
]

const flowSteps = [
  { label: 'Usuario pregunta', sub: 'Input natural language' },
  { label: 'Embeddings', sub: 'Vectorización semántica' },
  { label: 'RAG Retrieval', sub: 'Búsqueda en catálogo' },
  { label: 'AI genera', sub: 'LLM + contexto' },
  { label: 'Recomienda + carrito', sub: 'Conversión directa' },
]

function AIFlowDiagram() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <div ref={ref} className="my-12 overflow-x-auto">
      <div className="flex items-center justify-center gap-0 min-w-max mx-auto px-4">
        {flowSteps.map((step, i) => (
          <div key={i} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={isInView ? {
                  boxShadow: [
                    '0 0 0px rgba(0,229,204,0)',
                    '0 0 20px rgba(0,229,204,0.4)',
                    '0 0 0px rgba(0,229,204,0)',
                  ],
                } : {}}
                transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
                className="w-24 text-center rounded-xl px-3 py-3 border glass"
                style={{ borderColor: 'rgba(0,229,204,0.3)' }}
              >
                <p className="font-display font-bold text-white text-xs leading-tight">{step.label}</p>
                <p className="font-mono text-[10px] text-[#00e5cc] mt-1 leading-tight">{step.sub}</p>
              </motion.div>
            </motion.div>

            {i < flowSteps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.3, delay: i * 0.15 + 0.2 }}
                style={{ transformOrigin: 'left' }}
              >
                <ChevronRight size={16} className="text-[#00e5cc] mx-1" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Large Personal Shopper Demo Card ─── */
const conversation = [
  { role: 'user', text: '¿Qué laptop recomiendas para diseño gráfico bajo $1,200?' },
  {
    role: 'ai',
    text: 'Perfecto, para diseño gráfico necesitas pantalla con buena gama de colores y RAM suficiente. Encontré 3 opciones en tu rango:',
    products: [
      { name: 'MacBook Air M2', price: '$1,099', tag: 'Mejor valor', color: '#00e5cc' },
      { name: 'ASUS ProArt Studio', price: '$1,149', tag: 'Pantalla OLED', color: '#a78bfa' },
      { name: 'Dell XPS 13 Plus', price: '$1,199', tag: 'Portabilidad', color: '#f59e0b' },
    ],
  },
  { role: 'user', text: 'Me gusta el MacBook, ¿tiene garantía?' },
  {
    role: 'ai',
    text: 'Sí, incluye 1 año de garantía Apple + puedes agregar AppleCare por $199 más. ¿Lo agrego al carrito con el seguro?',
    cta: '¡Sí, agregar al carrito!',
  },
]

function PersonalShopperCard() {
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [typing, setTyping] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (!isInView) return
    let current = 0
    function showNext() {
      if (current >= conversation.length) return
      setTyping(true)
      const delay = conversation[current].role === 'ai' ? 900 : 400
      setTimeout(() => {
        setTyping(false)
        setVisibleMessages((v) => v + 1)
        current++
        if (current < conversation.length) {
          setTimeout(showNext, 600)
        }
      }, delay)
    }
    const t = setTimeout(showNext, 500)
    return () => clearTimeout(t)
  }, [isInView])

  return (
    <div ref={ref} className="relative">
      {/* outer glow */}
      <div
        className="absolute -inset-6 rounded-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, #00e5cc 0%, transparent 70%)' }}
      />

      <div
        className="relative rounded-2xl overflow-hidden border shadow-2xl"
        style={{ background: '#080d1a', borderColor: 'rgba(0,229,204,0.2)' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b"
          style={{ borderColor: 'rgba(0,229,204,0.12)', background: 'rgba(0,229,204,0.04)' }}>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-black text-sm"
            style={{ background: 'linear-gradient(135deg, #00e5cc, #00bfa5)', color: '#0a0f1e' }}
          >
            AI
          </div>
          <div>
            <p className="font-display font-bold text-white text-sm leading-none">eCommy Personal Shopper</p>
            <p className="text-[11px] text-[#00e5cc] mt-0.5 font-mono">Powered by RAG + LLM</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-emerald-400 font-mono">En línea 24/7</span>
          </div>
        </div>

        {/* Chat body */}
        <div className="p-5 space-y-4 min-h-72 flex flex-col">
          <AnimatePresence>
            {conversation.slice(0, visibleMessages).map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'user' ? (
                  <div
                    className="max-w-[75%] rounded-2xl rounded-br-sm px-4 py-2.5 text-sm text-white"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  >
                    {msg.text}
                  </div>
                ) : (
                  <div className="max-w-[88%] space-y-3">
                    <div className="flex items-start gap-2.5">
                      <div
                        className="w-6 h-6 rounded-lg shrink-0 flex items-center justify-center mt-0.5"
                        style={{ background: 'linear-gradient(135deg, #00e5cc, #00bfa5)' }}
                      >
                        <Sparkles size={11} className="text-[#0a0f1e]" />
                      </div>
                      <div
                        className="rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-slate-200 leading-relaxed"
                        style={{ background: 'rgba(0,229,204,0.07)', border: '1px solid rgba(0,229,204,0.12)' }}
                      >
                        {msg.text}
                      </div>
                    </div>

                    {msg.products && (
                      <div className="ml-8 grid grid-cols-3 gap-2">
                        {msg.products.map((p, pi) => (
                          <motion.div
                            key={pi}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: pi * 0.1 }}
                            className="rounded-xl p-3 border text-center cursor-pointer hover:scale-105 transition-transform"
                            style={{ background: 'rgba(255,255,255,0.04)', borderColor: `${p.color}25` }}
                          >
                            <p className="font-mono font-bold text-sm" style={{ color: p.color }}>{p.price}</p>
                            <p className="text-white text-[10px] font-medium mt-0.5 leading-tight">{p.name}</p>
                            <span
                              className="inline-block mt-1.5 text-[9px] px-1.5 py-0.5 rounded-full font-mono"
                              style={{ background: `${p.color}18`, color: p.color }}
                            >
                              {p.tag}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {msg.cta && (
                      <div className="ml-8">
                        <button
                          className="px-4 py-2 rounded-xl text-xs font-bold text-[#0a0f1e] hover:opacity-90 transition-opacity"
                          style={{ background: 'linear-gradient(135deg, #00e5cc, #00bfa5)' }}
                        >
                          {msg.cta}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {typing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <div
                className="w-6 h-6 rounded-lg shrink-0 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #00e5cc, #00bfa5)' }}
              >
                <Sparkles size={11} className="text-[#0a0f1e]" />
              </div>
              <div
                className="flex items-center gap-1 px-3 py-2 rounded-2xl rounded-tl-sm"
                style={{ background: 'rgba(0,229,204,0.07)', border: '1px solid rgba(0,229,204,0.12)' }}
              >
                {[0, 1, 2].map((dot) => (
                  <motion.div
                    key={dot}
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.2 }}
                    className="w-1.5 h-1.5 rounded-full bg-[#00e5cc]"
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Input bar */}
          <div className="mt-auto pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-2.5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <span className="flex-1 text-sm text-slate-600 select-none">Pregunta sobre cualquier producto...</span>
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #00e5cc, #00bfa5)' }}
              >
                <Send size={12} className="text-[#0a0f1e]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function EcommySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section
      id="ecommy"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ background: '#080d1a' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-200 h-200 rounded-full opacity-8 blur-3xl"
          style={{ background: 'radial-gradient(circle, #00e5cc 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ─── Hero headline + large card side by side ─── */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: headline block */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs tracking-[0.2em] uppercase text-[#00e5cc] mb-5"
            >
              Tu Ventaja Injusta
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <h2 className="font-display font-black text-5xl md:text-6xl text-white leading-[1.05] tracking-tight text-balance">
                No es un chatbot de soporte.
              </h2>
              <h2 className="font-display font-black text-5xl md:text-6xl leading-[1.05] tracking-tight text-balance mt-1">
                <span className="text-gradient-cyan">Es un Personal Shopper con cerebro.</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg"
            >
              Mientras tus competidores muestran productos, tu tienda los <strong className="text-white">vende</strong>. Conversa, recomienda, responde objeciones y cierra — todo sin intervención humana.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap gap-3"
            >
              {['RAG sobre tu catálogo', 'Embeddings semánticos', 'Multi-idioma', 'Cierre de carrito'].map((tag, i) => (
                <span
                  key={i}
                  className="font-mono text-xs px-3 py-1.5 rounded-full border"
                  style={{ background: 'rgba(0,229,204,0.06)', border: '1px solid rgba(0,229,204,0.2)', color: '#00e5cc' }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Large Personal Shopper Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <PersonalShopperCard />
          </motion.div>
        </div>

        {/* AI Flow Diagram */}
        <AIFlowDiagram />

        {/* Feature cards */}
        <div className="grid lg:grid-cols-3 gap-5 mb-12">
          {features.map(({ icon: Icon, title, description, tech }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 300 } }}
              className="glass rounded-2xl p-6 border border-white/8 cursor-default"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(0,229,204,0.2), rgba(0,191,165,0.1))', border: '1px solid rgba(0,229,204,0.2)' }}
                >
                  <Icon size={20} className="text-[#00e5cc]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-display font-bold text-white text-sm">{title}</h3>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded text-[#00e5cc]"
                      style={{ background: 'rgba(0,229,204,0.1)' }}>
                      {tech}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pricing block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass rounded-2xl p-8 border-t-2 border-t-[#00e5cc] border border-[#00e5cc]/20 max-w-2xl mx-auto text-center"
        >
          <p className="font-mono text-xs text-[#00e5cc] tracking-widest uppercase mb-2">Add-On</p>
          <h3 className="font-display font-black text-2xl text-white mb-1">eCommy AI — Personal Shopper</h3>
          <p className="text-slate-400 text-sm mb-6">Compatible con Shopify y MedusaJS</p>

          <div className="flex justify-center gap-10 mb-6">
            <div>
              <p className="font-mono text-3xl font-bold text-white">$1,790</p>
              <p className="text-slate-400 text-xs mt-1">App Setup (único pago)</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="font-mono text-3xl font-bold text-white">$390</p>
              <p className="text-slate-400 text-xs mt-1">Retainer LLM/RAG/mes</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {['LLM nativo', 'RAG sobre tu catálogo', 'Embeddings actualizados', 'Soporte 24/7'].map((item) => (
              <span key={item} className="text-xs text-slate-300 px-3 py-1 rounded-full border border-white/10"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                {item}
              </span>
            ))}
          </div>

          <a
            href="#contacto"
            className="btn-cyan inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold"
          >
            Agregar eCommy AI a mi plan →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
