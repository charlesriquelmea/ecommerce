import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { ProblemSection } from '@/components/problem-section'
import { DuelSection } from '@/components/duel-section'
import { EcommySection } from '@/components/ecommy-section'
import { PricingSection } from '@/components/pricing-section'
import { TrustSection } from '@/components/trust-section'
import { FAQSection } from '@/components/faq-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <DuelSection />
      <EcommySection />
      <PricingSection />
      <TrustSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
