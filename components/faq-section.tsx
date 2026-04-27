'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: '¿Por qué son tan baratos comparado con agencias en USA?',
    answer:
      'Porque operamos desde LatAm con talento de primer nivel. Los mismos ingenieros que trabajaron en startups de Silicon Valley ahora construyen desde Buenos Aires, Medellín y Ciudad de México. Nuestros costos operativos son radicalmente menores, y ese ahorro te lo transferimos directamente. No recortamos en calidad — recortamos en overhead.',
  },
  {
    question: '¿Qué pasa si ya tengo una tienda en Shopify? ¿Pueden migrarla?',
    answer:
      'Absolutamente. La migración de tiendas existentes es uno de nuestros servicios principales. Auditamos tu tienda actual, identificamos cuellos de botella técnicos, y migramos con cero downtime. Incluye migración de productos, clientes, órdenes históricas y SEO. Si tienes más de 500 SKUs, agenda primero la auditoría gratuita.',
  },
  {
    question: '¿eCommy AI funciona en mi idioma y con mis productos locales?',
    answer:
      'Sí. eCommy AI se entrena directamente sobre tu catálogo con tus descripciones, tus nombres y tu tono de marca. Funciona en español, inglés y puede configurarse para cualquier idioma. Los embeddings se generan en tu idioma, por lo que la búsqueda semántica funciona perfectamente con regionalismos y términos locales.',
  },
  {
    question: '¿Cuánto tiempo tarda en estar lista mi tienda?',
    answer:
      'Shopify Starter: 10–14 días hábiles desde el kick-off. MedusaJS Headless: 14–21 días hábiles. El tiempo depende de la velocidad de entrega de assets de tu lado (logo, catálogo, fotos). Una vez iniciado el proyecto, recibes updates diarios via Slack o WhatsApp. No hay sorpresas.',
  },
  {
    question: '¿Qué incluye el retainer mensual exactamente?',
    answer:
      'El retainer cubre: hosting gestionado en Vercel + infraestructura, mantenimiento técnico preventivo, actualizaciones de seguridad, 10 horas de desarrollo/modificaciones incluidas, monitoreo 24/7 de uptime y performance, y soporte via Slack con respuesta en menos de 4 horas hábiles. Sin el retainer, puedes operar de forma autónoma — el código es tuyo.',
  },
]

export function FAQSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      ref={ref}
      className="relative py-28"
      style={{ background: '#0a0f1e' }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-[#00e5cc] mb-4 text-center"
        >
          FAQ
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-4xl md:text-5xl text-white mb-12 text-center text-balance"
        >
          Preguntas frecuentes
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="glass rounded-xl border border-white/8 overflow-hidden px-6 data-[state=open]:border-[#00e5cc]/30"
              >
                <AccordionTrigger
                  className="font-display font-semibold text-white text-left py-5 hover:no-underline hover:text-[#00e5cc] transition-colors text-sm md:text-base [&[data-state=open]]:text-[#00e5cc] [&>svg]:text-slate-400 [&[data-state=open]>svg]:text-[#00e5cc]"
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 text-sm leading-relaxed pb-5 pt-0">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
