'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle, Clock, ShoppingBag, BarChart2, Settings, Star, Package, Globe, Code2, Database, GitBranch, Layers } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { MedusaNoteSection } from './MedusaNoteSection'

const duelRows = [
  { feature: 'Setup (único)', shopify: '$2190 USD', medusa: '$3490 USD' },
  { feature: 'Retainer mensual', shopify: '$290/mes', medusa: '$390/mes' },
  { feature: 'Comisión por venta', shopify: '0.5–2%', medusa: '0%' },
  { feature: 'Propiedad del código', shopify: 'Parcial', medusa: '100% tuyo' },
  { feature: 'Velocidad de setup', shopify: '10–14 días', medusa: '14–21 días' },
  { feature: 'Ideal para', shopify: 'Comenzar rápido', medusa: 'Escalar sin límites' },
]

/* ─── Feature List ─── */
function FeatureList({ items, color }: { items: string[]; color: string }) {
  return (
    <div className="grid gap-2">
      {items.map((feat, i) => (
        <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
          <CheckCircle size={15} className="shrink-0 mt-0.5" style={{ color }} />
          <span>{feat}</span>
        </div>
      ))}
    </div>
  )
}

/* ─── Shopify UI Mockup ─── */
function ShopifyMockup() {
  const products = [
    { name: 'Sneaker Pro X', price: '$89', sales: 142 },
    { name: 'Urban Jacket', price: '$124', sales: 87 },
    { name: 'Cargo Pants', price: '$67', sales: 203 },
  ]

  return (
    <div className="rounded-2xl w-full overflow-hidden border border-white/10 bg-[#0d1525] shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/8 bg-[#0a0f1e]">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
        </div>
        <div className="flex-1 min-w-0 mx-2 bg-white/5 rounded-md px-2 py-1 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400/60 shrink-0" />
          <span className="font-mono text-[10px] text-slate-500 truncate">mystore.myshopify.com</span>
        </div>
      </div>

      {/* Shopify Admin UI */}
      <div className="flex">
        {/* Sidebar — hidden on very small, shown from xs */}
        <div className="hidden xs:flex w-28 sm:w-36 border-r border-white/6 bg-[#0a0f1e] p-3 flex-col gap-1 shrink-0">
          <div className="text-[9px] font-mono text-slate-600 uppercase tracking-wider mb-2 px-2">Admin</div>
          {[
            { icon: BarChart2, label: 'Dashboard', active: false },
            { icon: ShoppingBag, label: 'Pedidos', active: true },
            { icon: Package, label: 'Productos', active: false },
            { icon: Star, label: 'Reviews', active: false },
            { icon: Settings, label: 'Config', active: false },
          ].map(({ icon: Icon, label, active }, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-[10px] ${active ? 'bg-emerald-500/15 text-emerald-400' : 'text-slate-500'}`}
            >
              <Icon size={11} />
              <span className="truncate">{label}</span>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 p-3 sm:p-4 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display font-bold text-white text-xs">Productos activos</span>
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full whitespace-nowrap">En vivo</span>
          </div>

          <div className="space-y-2">
            {products.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="flex items-center gap-2 sm:gap-3 bg-white/3 rounded-xl px-2 sm:px-3 py-2 border border-white/5"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Package size={12} className="text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-white text-[10px] leading-tight truncate">{p.name}</p>
                  <p className="font-mono text-[9px] text-slate-500">{p.sales} ventas</p>
                </div>
                <span className="font-mono text-[11px] font-bold text-emerald-400 shrink-0">{p.price}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-3">
            {[
              { label: 'Conversión', value: '3.2%' },
              { label: 'Hoy', value: '$1,840' },
              { label: 'Apps', value: '12 act.' },
            ].map((s, i) => (
              <div key={i} className="bg-white/3 rounded-lg p-1.5 sm:p-2 text-center border border-white/5">
                <p className="font-mono text-[11px] font-bold text-white">{s.value}</p>
                <p className="text-[9px] text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── MedusaJS UI Mockup ─── */
function MedusaMockup() {
  const endpoints = [
    { method: 'GET', path: '/products', status: 200 },
    { method: 'POST', path: '/cart/line-items', status: 201 },
    { method: 'GET', path: '/orders?region=MX', status: 200 },
  ]
  const stack = [
    { icon: Globe, label: 'Next.js Frontend', color: '#fff' },
    { icon: Database, label: 'PostgreSQL', color: '#00e5cc' },
    { icon: Layers, label: 'MedusaJS API', color: '#00e5cc' },
    { icon: GitBranch, label: 'GitHub CI/CD', color: '#a78bfa' },
  ]

  return (
    <div className="rounded-2xl w-72 sm:w-auto overflow-hidden border border-[#00e5cc]/15 bg-[#0d1525] shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/8 bg-[#0a0f1e]">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
        </div>
        <div className="flex-1 min-w-0 mx-2 bg-white/5 rounded-md px-2 py-1 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00e5cc]/60 shrink-0" />
          <span className="font-mono text-[10px] text-slate-500 truncate">api.mitienda.com / admin.vercel.app</span>
        </div>
      </div>

      {/* Medusa Terminal + Stack */}
      <div className="flex">
        {/* Stack panel — hidden on very small */}
        <div className="hidden xs:flex w-28 sm:w-36 border-r border-white/6 bg-[#0a0f1e] p-3 flex-col gap-1.5 shrink-0">
          <div className="text-[9px] font-mono text-slate-600 uppercase tracking-wider mb-1 px-2">Stack</div>
          {stack.map(({ icon: Icon, label, color }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-white/3 border border-white/5"
            >
              <Icon size={10} style={{ color }} className="shrink-0" />
              <span className="text-[9px] text-slate-400 leading-tight truncate">{label}</span>
            </motion.div>
          ))}
          <div className="mt-auto px-2 pt-2">
            <div className="font-mono text-[9px] text-[#00e5cc]">0% comisión</div>
            <div className="text-[9px] text-slate-600">transacciones</div>
          </div>
        </div>

        {/* API terminal */}
        <div className="flex-1 min-w-0 p-3 sm:p-4 overflow-hidden bg-[#070c18]">
          <div className="flex items-center gap-2 mb-3">
            <Code2 size={11} className="text-[#00e5cc] shrink-0" />
            <span className="font-mono text-[10px] text-[#00e5cc] truncate">API Routes — Live</span>
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00e5cc] animate-pulse shrink-0" />
          </div>

          <div className="space-y-1.5 mb-3">
            {endpoints.map((ep, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.12 }}
                className="flex items-center gap-2 font-mono text-[10px] bg-white/3 rounded-lg px-2 sm:px-2.5 py-1.5 border border-white/5"
              >
                <span className={`shrink-0 font-bold ${ep.method === 'GET' ? 'text-sky-400' : 'text-amber-400'}`}>{ep.method}</span>
                <span className="text-slate-400 flex-1 truncate">{ep.path}</span>
                <span className="text-emerald-400 shrink-0">{ep.status}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {[
              { label: 'Regiones', value: '4' },
              { label: 'Uptime', value: '99.9%' },
              { label: 'Código', value: '100%' },
            ].map((s, i) => (
              <div key={i} className="bg-white/3 rounded-lg p-1.5 sm:p-2 text-center border border-[#00e5cc]/8">
                <p className="font-mono text-[11px] font-bold text-[#00e5cc]">{s.value}</p>
                <p className="text-[9px] text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function DuelSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section
      id="duelo"
      ref={ref}
      className="relative py-16 sm:py-28 diagonal-grid"
      style={{ background: '#0a0f1e' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-[#00e5cc] mb-4"
        >
          El Duelo
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white mb-8 sm:mb-12 max-w-2xl text-balance"
        >
          Dos caminos. Un solo destino: escalar sin fricción.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="shopify">
            <TabsList
              className="flex flex-col sm:flex-row mb-6 sm:mb-8 p-1 rounded-xl h-auto gap-1 border border-white/8 w-full"
              style={{ background: 'rgba(13,21,37,0.8)' }}
            >
              <TabsTrigger
                value="shopify"
                className="w-full rounded-lg px-3 sm:px-5 py-2.5 font-display font-semibold text-xs sm:text-sm data-[state=active]:bg-white/8 data-[state=active]:text-white text-slate-400 text-center"
              >
                Shopify — El Rey de la Velocidad
              </TabsTrigger>
              <TabsTrigger
                value="medusa"
                className="w-full rounded-lg px-3 sm:px-5 py-2.5 font-display font-semibold text-xs sm:text-sm data-[state=active]:bg-white/8 data-[state=active]:text-white text-slate-400 text-center"
              >
                MedusaJS — El Rey de la Propiedad
              </TabsTrigger>
            </TabsList>

            {/* Shopify Tab */}
            <TabsContent value="shopify" className="mt-0">
              <div className="glass rounded-2xl p-4 sm:p-8 border border-white/8">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
                  <div>
                    {/* Price header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                      <div>
                        <Badge
                          className="mb-3 font-mono text-xs px-3 py-1 rounded-full"
                          style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)' }}
                        >
                          IDEAL PARA COMENZAR
                        </Badge>
                        <h3 className="font-display font-black text-2xl text-white">Shopify Starter</h3>
                      </div>
                      <div className="sm:text-right">
                        <p className="font-mono font-bold text-3xl text-white">$2190</p>
                        <p className="text-slate-400 text-sm">Setup + $290/mes retainer</p>
                        <div className="flex items-center gap-1.5 sm:justify-end mt-1.5">
                          <Clock size={12} className="text-slate-500" />
                          <span className="text-xs text-slate-500 font-mono">10–14 días hábiles</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-6 mb-6">
                      <div>
                        <h4 className="font-display font-semibold text-white text-sm mb-3">Shopify starter set up</h4>
                        <FeatureList color="#10b981" items={[
                          "Configuración técnica: Cuenta, dominio, etc",
                          "Diseño: Instalación de tema básico, personalización de marca",
                          "Catálogo: Carga inicial de productos (5 a 20 items)",
                          "Operaciones: Pasarelas de pago, tarifas de envío e impuestos",
                          "Lanzamiento: SEO básico, optimización móvil y pruebas",
                          "Envios: Flexport + Shopify Tax",
                          "Configuración de favicon",
                          "Branding básico",
                          "Links de redes sociales en footer",
                          "Google Analytics / Meta Pixel básico",
                          "Menú de navegación (header/footer)",
                        ]} />
                      </div>

                      <div>
                        <h4 className="font-display font-semibold text-white text-sm mb-3">Retainer para Shopify incluye</h4>
                        <FeatureList color="#10b981" items={[
                          "Actualizaciones de contenido",
                          "Gestión de aplicaciones",
                          "Ajustes de diseño (CSS/Liquid)",
                          "Soporte técnico y resolución de bugs",
                        ]} />
                      </div>

                      <div>
                        <h4 className="font-display font-semibold text-white text-sm mb-3">Tiempo desarrollo Shopify Starter</h4>
                        <FeatureList color="#10b981" items={["10 a 14 días hábiles aprox"]} />
                      </div>
                    </div>

                    <div
                      className="rounded-xl p-4 border border-amber-500/30"
                      style={{ background: 'rgba(245,158,11,0.06)' }}
                    >
                      <p className="text-sm text-amber-300 leading-relaxed">
                        <strong className="text-amber-400">Nota honesta: </strong>
                        Shopify cobra comisiones y un fee mensual. A medida que escales,
                        este &ldquo;impuesto al éxito&rdquo; crece contigo. Perfecto para
                        empezar, pero considera migrar a MedusaJS al crecer.
                      </p>
                    </div>
                  </div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                    <ShopifyMockup />
                  </motion.div>
                </div>
              </div>
            </TabsContent>

            {/* MedusaJS Tab */}
            <TabsContent value="medusa" className="mt-0">
              <div className="glass rounded-2xl p-4 sm:p-8 border border-[#00e5cc]/20">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
                  <div>
                    {/* Price header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                      <div>
                        <Badge
                          className="mb-3 font-mono text-xs px-3 py-1 rounded-full"
                          style={{ background: 'rgba(0,229,204,0.12)', color: '#00e5cc', border: '1px solid rgba(0,229,204,0.3)' }}
                        >
                          IDEAL PARA ESCALAR SIN PAGAR COMISIONES
                        </Badge>
                        <h3 className="font-display font-black text-2xl text-white">MedusaJS Headless</h3>
                      </div>
                      <div className="sm:text-right">
                        <p className="font-mono font-bold text-3xl text-white">$3490</p>
                        <p className="text-slate-400 text-sm">Setup + $390/mes retainer</p>
                        <div className="flex items-center gap-1.5 sm:justify-end mt-1.5">
                          <Clock size={12} className="text-slate-500" />
                          <span className="text-xs text-slate-500 font-mono">14–21 días hábiles</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-6 mb-6">
                      <div>
                        <h4 className="font-display font-semibold text-white text-sm mb-3">Template genérico sin personalización en MedusaJS incluye</h4>
                        <FeatureList color="#00e5cc" items={[
                          "Pagos: Stripe 2.9% + $0.3",
                          "Fulfillment by ShipStation $29/mo (UPS, FedEx, DHL, USPS)",
                          "Lógica Nativa: Tax Regions para impuestos y envíos",
                          "Comisión por ventas (0% GMV) solo Fee Stripe",
                          "Productos y Pedidos Ilimitados",
                          "Control Total (Admin & Storefront)",
                          "Emails Flexibles: automatización sin restricciones",
                        ]} />
                      </div>

                      <div>
                        <h4 className="font-display font-semibold text-white text-sm mb-3">Retainer para MedusaJS incluye</h4>
                        <FeatureList color="#00e5cc" items={[
                          "Mantenimiento del Storefront (Next.js)",
                          "Gestión de Datos y catálogos",
                          "Mantenimiento de infraestructura (PostgreSQL, Redis)",
                          "Actualizaciones de seguridad y parches",
                          "Monitoreo de uptime 24/7",
                          "Gestión de APIs y Webhooks",
                          "Despliegues (CI/CD)",
                        ]} />
                      </div>

                      <div>
                        <h4 className="font-display font-semibold text-white text-sm mb-3">Tiempo desarrollo MedusaJS</h4>
                        <FeatureList color="#00e5cc" items={["14 a 21 días hábiles aprox"]} />
                      </div>
                    </div>

                    <div
                      className="rounded-xl w-72 ms:w-auto p-4 border border-[#00e5cc]/30"
                      style={{ background: 'rgba(0,229,204,0.06)' }}
                    >
                      <p className="text-sm text-[#00e5cc] leading-relaxed">
                        <strong>0% de tus ventas va a la plataforma.</strong> Todo el margen es tuyo. El código es tuyo. La infraestructura la controlas tú. Construye sin límites.
                      </p>
                    </div>
                  </div>

                  <motion.div initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                    <MedusaMockup />
                  </motion.div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <MedusaNoteSection />

          {/* Mini comparison table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 sm:mt-8 glass rounded-2xl overflow-hidden border border-white/8"
          >
            <div className="px-4 sm:px-6 py-4 border-b border-white/8">
              <h4 className="font-display font-bold text-white text-sm">Comparativa rápida</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[320px]">
                <thead>
                  <tr className="bg-white/3">
                    <th className="text-left px-3 sm:px-4 py-3 text-slate-400 font-medium">Característica</th>
                    <th className="text-left px-3 sm:px-4 py-3 text-emerald-400 font-semibold">Shopify</th>
                    <th className="text-left px-3 sm:px-4 py-3 text-[#00e5cc] font-semibold">MedusaJS</th>
                  </tr>
                </thead>
                <tbody>
                  {duelRows.map((row, i) => (
                    <tr key={i} className={`border-t border-white/5 ${i % 2 === 0 ? 'bg-white/1' : ''}`}>
                      <td className="px-3 sm:px-4 py-3 text-slate-400 text-xs sm:text-sm">{row.feature}</td>
                      <td className="px-3 sm:px-4 py-3 text-slate-200 font-mono text-xs sm:text-sm whitespace-nowrap">{row.shopify}</td>
                      <td className="px-3 sm:px-4 py-3 text-[#00e5cc] font-mono font-semibold text-xs sm:text-sm whitespace-nowrap">{row.medusa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}