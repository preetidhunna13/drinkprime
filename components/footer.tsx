"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Youtube, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-card/50 backdrop-blur-xl border-t border-border/50 mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-black bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent"
              >
                PRIME
              </motion.div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The ultimate hydration drink created by India's favorite content creator. Fuel your hustle, live your
              prime.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Youtube, href: "#", color: "hover:text-red-500" },
                { icon: Instagram, href: "#", color: "hover:text-pink-500" },
                { icon: Twitter, href: "#", color: "hover:text-blue-400" },
                { icon: Facebook, href: "#", color: "hover:text-blue-600" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 rounded-full bg-muted/20 flex items-center justify-center transition-colors ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "Products", href: "/products" },
                { name: "About Us", href: "/about" },
                { name: "Verify Prime", href: "/verify" },
              ].map((link, index) => (
                <motion.div key={index} whileHover={{ x: 5 }}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Support</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>support@prime.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">Get the latest Prime news and exclusive offers.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass border-border/50 focus:border-primary"
                required
              />
              <Button
                type="submit"
                className="w-full btn-prime bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700"
              >
                {isSubscribed ? "Subscribed! ✓" : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="text-sm text-muted-foreground">© Prime Hydration LLC. All rights reserved.</div>
          <div className="flex space-x-6 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
