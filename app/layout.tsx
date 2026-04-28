import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Protolylat — Tecnología eCommerce de Clase Mundial para LatAm',
  description:
    'Shopify y MedusaJS Headless con IA nativa. Obtén la tecnología de una agencia de $50,000 USD en New York por una fracción del costo. Basados en LatAm.',
  generator: 'v0.app',
  keywords: ['eCommerce', 'Shopify', 'MedusaJS', 'IA', 'LatAm', 'agencia', 'tienda online'],
  openGraph: {
    title: 'Protolylat — Tecnología eCommerce de Clase Mundial para LatAm',
    description: 'Shopify o MedusaJS Headless. Con IA nativa que cierra ventas 24/7.',
    type: 'website',
  },
  icons: {
    icon: 'favicon.png',
    apple: 'favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} bg-[#0a0f1e]`}>
      <body className="font-sans antialiased bg-[#0a0f1e] text-white">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
