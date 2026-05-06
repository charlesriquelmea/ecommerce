import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function MedusaNoteSection() {
  return (
    <section
      className="relative py-20 diagonal-grid"
      style={{ background: "#0a0f1e" }}
    >
      <div className="max-w-5xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-8 border border-[#00e5cc]/20"
        >
          {/* Intro */}
          <div className="mb-6">
            <Badge
              className="mb-3 font-mono text-xs px-3 py-1 rounded-full"
              style={{
                background: "rgba(0,229,204,0.12)",
                color: "#00e5cc",
                border: "1px solid rgba(0,229,204,0.3)",
              }}
            >
              INFORMACIÓN IMPORTANTE
            </Badge>
            <p className="text-slate-300 text-sm leading-relaxed">
              El costo del <strong>Set Up de MedusaJS</strong> es más alto,
              considerando la tecnología (Frontend Next.js + Backend MedusaJS),
              lo que permite mayor control y propiedad de los códigos fuentes.
              Además, no requiere pagar comisiones ni suscripciones.
            </p>
          </div>

          {/* Checklist: Todos los planes incluyen */}
          <div className="mb-8">
            <h4 className="font-display font-semibold text-white text-sm mb-3">
              Todos los planes incluyen
            </h4>
            {[
              "Configuración completa",
              "Carga de productos hasta 20 SKU",
              "Pasarela de pago (Stripe / PayPal)",
              "Fulfillment",
              "Certificado SSL",
              "Diseño responsivo",
              "30 días de soporte post-lanzamiento",
            ].map((feat, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 text-sm text-slate-300"
              >
                <CheckCircle
                  size={15}
                  className="text-[#00e5cc] shrink-0 mt-0.5"
                />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Nota sobre Retainer */}
          <div>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              En el caso de MedusaJS, el <strong>Retainer</strong> incluye la
              arquitectura de microservicios en la nube para mantener el
              eCommerce.
            </p>
            <p className="text-slate-400 text-xs">
              Los valores <strong>NO incluyen</strong> suscripciones ni las
              comisiones de Shopify.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
