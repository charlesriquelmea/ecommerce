'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type FormData = {
  name: string
  email: string
  hasStore: string
  catalogSize: string
  interests: string[]
  budget: string
  phone: string
  preferredTime: string
}

const initialData: FormData = {
  name: '',
  email: '',
  hasStore: '',
  catalogSize: '',
  interests: [],
  budget: '',
  phone: '',
  preferredTime: '',
}

const TOTAL_STEPS = 7

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
        selected
          ? 'border-[#00e5cc] text-white'
          : 'border-white/10 text-slate-300 hover:border-white/20 hover:text-white'
      }`}
      style={{
        background: selected ? 'rgba(0,229,204,0.1)' : 'rgba(255,255,255,0.03)',
      }}
    >
      {children}
    </button>
  )
}

function CheckOption({
  checked,
  onChange,
  label,
  id,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  id: string
}) {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border text-sm font-medium cursor-pointer transition-all duration-200 ${
        checked
          ? 'border-[#00e5cc] text-white'
          : 'border-white/10 text-slate-300 hover:border-white/20 hover:text-white'
      }`}
      style={{
        background: checked ? 'rgba(0,229,204,0.1)' : 'rgba(255,255,255,0.03)',
      }}
    >
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="border-white/20 data-[state=checked]:bg-[#00e5cc] data-[state=checked]:border-[#00e5cc]"
      />
      {label}
    </label>
  )
}

export function ContactSection() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [data, setData] = useState<FormData>(initialData)
  const [done, setDone] = useState(false)

  const progress = Math.round(((step) / TOTAL_STEPS) * 100)

  const advance = () => {
    if (step < TOTAL_STEPS - 1) {
      setDirection(1)
      setStep((s) => s + 1)
    } else {
      setDone(true)
    }
  }

  const update = (field: keyof FormData, value: string) =>
    setData((d) => ({ ...d, [field]: value }))

  const toggleInterest = (val: string) =>
    setData((d) => ({
      ...d,
      interests: d.interests.includes(val)
        ? d.interests.filter((i) => i !== val)
        : [...d.interests, val],
    }))

  const steps = [
    // 0: name
    <div key="name" className="space-y-4">
      <h3 className="font-display font-black text-2xl text-white">¿Cómo te llamas?</h3>
      <Input
        /* autoFocus */
        placeholder="Tu nombre completo"
        value={data.name}
        onChange={(e) => update('name', e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && data.name && advance()}
        className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 text-base h-12 focus:border-[#00e5cc] focus:ring-[#00e5cc]/20"
      />
    </div>,

    // 1: email
    <div key="email" className="space-y-4">
      <h3 className="font-display font-black text-2xl text-white">¿Cuál es tu email?</h3>
      <Input
        autoFocus
        type="email"
        placeholder="tu@empresa.com"
        value={data.email}
        onChange={(e) => update('email', e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && data.email && advance()}
        className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 text-base h-12 focus:border-[#00e5cc] focus:ring-[#00e5cc]/20"
      />
    </div>,

    // 2: has store
    <div key="store" className="space-y-4">
      <h3 className="font-display font-black text-2xl text-white">¿Tienes tienda actualmente?</h3>
      <div className="space-y-2">
        {['Sí, en Shopify', 'Sí, en otra plataforma', 'No, es nueva'].map((opt) => (
          <OptionButton
            key={opt}
            selected={data.hasStore === opt}
            onClick={() => { update('hasStore', opt); setTimeout(advance, 300) }}
          >
            {opt}
          </OptionButton>
        ))}
      </div>
    </div>,

    // 3: catalog size
    <div key="catalog" className="space-y-4">
      <h3 className="font-display font-black text-2xl text-white">
        ¿Cuántos productos tiene (o tendrá) tu catálogo?
      </h3>
      <div className="space-y-2">
        {['Menos de 20', '20–100', 'Más de 100'].map((opt) => (
          <OptionButton
            key={opt}
            selected={data.catalogSize === opt}
            onClick={() => { update('catalogSize', opt); setTimeout(advance, 300) }}
          >
            {opt}
          </OptionButton>
        ))}
      </div>
    </div>,

    // 4: interests
    <div key="interests" className="space-y-4">
      <h3 className="font-display font-black text-2xl text-white">¿Qué te interesa más?</h3>
      <p className="text-slate-400 text-sm">Puedes seleccionar varias opciones.</p>
      <div className="space-y-2">
        {['Setup Shopify', 'Setup MedusaJS', 'eCommy AI', 'Todo el ecosistema'].map((opt) => (
          <CheckOption
            key={opt}
            id={opt}
            label={opt}
            checked={data.interests.includes(opt)}
            onChange={() => toggleInterest(opt)}
          />
        ))}
      </div>
    </div>,

    // 5: budget
    <div key="budget" className="space-y-4">
      <h3 className="font-display font-black text-2xl text-white">
        ¿Cuál es tu presupuesto mensual estimado?
      </h3>
      <div className="space-y-2">
        {['Menos de $500/mes', '$500–$1,000/mes', 'Más de $1,000/mes'].map((opt) => (
          <OptionButton
            key={opt}
            selected={data.budget === opt}
            onClick={() => { update('budget', opt); setTimeout(advance, 300) }}
          >
            {opt}
          </OptionButton>
        ))}
      </div>
    </div>,

    // 6: contact info
    <div key="contact" className="space-y-4">
      <h3 className="font-display font-black text-2xl text-white">¿Cómo podemos contactarte?</h3>
      <Input
        autoFocus
        type="tel"
        placeholder="+54 9 11 1234-5678"
        value={data.phone}
        onChange={(e) => update('phone', e.target.value)}
        className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 text-base h-12 focus:border-[#00e5cc] focus:ring-[#00e5cc]/20"
      />
      <Select onValueChange={(v) => update('preferredTime', v)}>
        <SelectTrigger className="bg-white/5 border-white/10 text-slate-300 h-12 focus:border-[#00e5cc]">
          <SelectValue placeholder="Horario de contacto preferido" />
        </SelectTrigger>
        <SelectContent className="bg-[#0d1525] border-white/10">
          <SelectItem value="manana" className="text-slate-200 focus:bg-white/10">Mañana (9–12h)</SelectItem>
          <SelectItem value="tarde" className="text-slate-200 focus:bg-white/10">Tarde (12–17h)</SelectItem>
          <SelectItem value="noche" className="text-slate-200 focus:bg-white/10">Noche (17–20h)</SelectItem>
          <SelectItem value="cualquiera" className="text-slate-200 focus:bg-white/10">Cualquier horario</SelectItem>
        </SelectContent>
      </Select>
    </div>,
  ]

  const canAdvance = [
    !!data.name,
    !!data.email,
    !!data.hasStore,
    !!data.catalogSize,
    data.interests.length > 0,
    !!data.budget,
    !!data.phone && !!data.preferredTime,
  ][step]

  return (
    <section
      id="contacto"
      className="relative py-28"
      style={{ background: '#080d1a' }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[500px] h-[500px] rounded-full opacity-5 blur-3xl"
          style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-[#00e5cc] mb-4 text-center"
        >
          Auditoría de IA Gratuita
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display font-black text-4xl md:text-5xl text-white mb-12 text-center text-balance"
        >
          ¿Tu tienda vende o solo muestra?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl border border-white/8 overflow-hidden"
        >
          {/* Progress bar */}
          {!done && (
            <div className="px-8 pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-slate-500">
                  Paso {step + 1} de {TOTAL_STEPS}
                </span>
                <span className="font-mono text-xs text-[#00e5cc]">{progress}%</span>
              </div>
              <Progress
                value={progress}
                className="h-0.5 bg-white/8"
              />
            </div>
          )}

          <div className="p-8">
            <AnimatePresence mode="wait" initial={false}>
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: 'rgba(0,229,204,0.15)', border: '2px solid rgba(0,229,204,0.4)' }}
                  >
                    <CheckCircle size={28} className="text-[#00e5cc]" />
                  </motion.div>
                  <h3 className="font-display font-black text-2xl text-white mb-2">¡Listo!</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Te contactaremos en menos de 24 horas hábiles con tu auditoría personalizada.
                    Revisa tu bandeja de entrada en{' '}
                    <span className="text-[#00e5cc]">{data.email}</span>.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: direction * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -60 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {steps[step]}

                  {/* Advance button (shown for text inputs and multi-select) */}
                  {(step === 0 || step === 1 || step === 4 || step === 6) && (
                    <motion.button
                      type="button"
                      onClick={advance}
                      disabled={!canAdvance}
                      className="mt-6 btn-amber w-full py-3.5 rounded-xl text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                    >
                      {step === TOTAL_STEPS - 1 ? 'Enviar Solicitud →' : 'Continuar →'}
                    </motion.button>
                  )}

                  {/* Back button */}
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => { setDirection(-1); setStep((s) => s - 1) }}
                      className="mt-3 w-full text-center text-xs text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      ← Volver
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
