'use client'

import { Separator } from '@/components/ui/separator'

const navCols = [
  {
    title: 'Servicios',
    links: [
      { label: 'Shopify Starter', href: '#duelo' },
      { label: 'MedusaJS Headless', href: '#duelo' },
      { label: 'eCommy AI', href: '#ecommy' },
      { label: 'Auditoría Gratuita', href: '#contacto' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Comparativa de Costos', href: '#servicios' },
      { label: 'Shopify vs MedusaJS', href: '#duelo' },
      { label: 'Precios', href: '#precios' },
      { label: 'FAQ', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Términos de Servicio', href: '#' },
      { label: 'Política de Privacidad', href: '#' },
      { label: 'Política de Cookies', href: '#' },
      { label: 'Contacto', href: '#contacto' },
    ],
  },
]

export function Footer() {
  return (
    <footer
      className="relative"
      style={{ background: '#080d1a' }}
    >
      {/* Gradient top separator */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #00e5cc40, #00e5cc80, #00e5cc40, transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #00e5cc, #00bfa5)' }}
              >
                <span className="font-display font-black text-[#0a0f1e] text-sm">P</span>
              </div>
              <span className="font-display font-bold text-white text-lg">Protolylat</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Tecnología eCommerce de clase mundial para negocios en LatAm. Shopify, MedusaJS y eCommy AI.
            </p>
            <div className="flex gap-3 mt-5">
              {['Twitter / X', 'LinkedIn', 'Instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all text-xs font-mono"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navCols.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-bold text-white text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-slate-200 text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-white/8 mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Protolylat. Todos los derechos reservados.</p>
          <p className="font-mono">Basados en LatAm. Construyendo para el mundo.</p>
        </div>
      </div>
    </footer>
  )
}
