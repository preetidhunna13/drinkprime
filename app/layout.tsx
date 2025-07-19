import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { SearchProvider } from "@/components/search-provider"
import { CartProvider } from "@/components/cart-provider"
import Footer from "@/components/footer"
import { Suspense } from "react"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Prime by Fukra Insaan - Fuel Your Hustle",
  description:
    "The ultimate hydration drink created by India's favorite content creator Fukra Insaan. Premium quality, incredible taste, maximum performance. Join the Prime Squad today!",
  keywords: "Prime, Fukra Insaan, hydration drink, energy drink, India, content creator, gaming",
  authors: [{ name: "Fukra Insaan" }],
  creator: "Fukra Insaan",
  openGraph: {
    title: "Prime by Fukra Insaan - Fuel Your Hustle",
    description: "The ultimate hydration drink for the next generation of achievers",
    url: "https://prime-fukra.com",
    siteName: "Prime by Fukra Insaan",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200",
        width: 1200,
        height: 630,
        alt: "Prime by Fukra Insaan",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime by Fukra Insaan - Fuel Your Hustle",
    description: "The ultimate hydration drink for the next generation of achievers",
    creator: "@fukra_insaan",
    images: ["/placeholder.svg?height=630&width=1200"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} font-prime`}>
        <ThemeProvider defaultTheme="dark" storageKey="prime-theme">
          <AuthProvider>
            <SearchProvider>
              <CartProvider>
                <Suspense fallback={<div>Loading...</div>}>
                  <div className="min-h-screen flex flex-col">
                    <main className="flex-1">{children}</main>
                    <Footer />
                  </div>
                </Suspense>
                <Toaster position="top-right" richColors />
              </CartProvider>
            </SearchProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
