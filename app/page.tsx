"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play, ArrowRight, Zap, Trophy, Users, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Navigation from "@/components/navigation"

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <div ref={containerRef} className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center z-10 px-6 max-w-6xl mx-auto">
          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.div
              whileHover={{
                y: -20,
                rotateX: 15,
                rotateY: 10,
                scale: 1.1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="relative w-32 h-32 mx-auto mb-6 cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src="/placeholder.svg?height=256&width=256"
                alt="Prime Logo"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-6xl md:text-9xl font-black mb-6 bg-gradient-to-r from-blue-400 via-green-400 to-purple-500 bg-clip-text text-transparent animate-gradient bg-300%"
          >
            PRIME
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-3xl mb-4 font-bold text-primary"
          >
            BY FUKRA INSAAN
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-lg md:text-xl mb-8 text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            The ultimate hydration experience that fuels your hustle. Created by India's favorite content creator for
            the next generation of achievers and dreamers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link href="/products">
              <Button
                size="lg"
                className="btn-prime bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-lg px-8 py-4 font-bold group"
              >
                Shop Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary/20 hover:border-primary/50 text-lg px-8 py-4 font-bold group glass bg-transparent"
            >
              <Play className="mr-2 group-hover:scale-110 transition-transform duration-300" />
              Watch Story
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.button
            onClick={scrollToContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
          >
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <ChevronDown className="w-8 h-8" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Floating Bottles */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-10 opacity-60 hidden lg:block"
        >
          <div className="w-24 h-32 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg blur-sm shadow-2xl" />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 40, 0],
            rotate: [0, -8, 8, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-10 opacity-50 hidden lg:block"
        >
          <div className="w-20 h-28 bg-gradient-to-b from-purple-400 to-purple-600 rounded-lg blur-sm shadow-2xl" />
        </motion.div>
      </section>

      {/* Why Prime Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              WHY PRIME?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              More than just hydration - it's a lifestyle, a mindset, a revolution.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "INSTANT ENERGY",
                desc: "Explosive hydration boost that lasts for hours without the crash",
                color: "from-yellow-400 to-orange-500",
                delay: 0,
              },
              {
                icon: Trophy,
                title: "CHAMPION FORMULA",
                desc: "Scientifically crafted blend trusted by winners and achievers",
                color: "from-primary to-purple-500",
                delay: 0.2,
              },
              {
                icon: Users,
                title: "COMMUNITY DRIVEN",
                desc: "Join millions of Prime enthusiasts in the ultimate lifestyle movement",
                color: "from-green-400 to-blue-500",
                delay: 0.4,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: item.delay }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass rounded-3xl p-8 border border-border/50 hover:border-primary/50 transition-all duration-300 group cursor-pointer"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mb-6 mx-auto group-hover:animate-pulse shadow-lg`}
                >
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-center group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/5 to-purple-500/5">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "1M+", label: "Bottles Sold", icon: "🚀" },
              { number: "500K+", label: "Happy Customers", icon: "❤️" },
              { number: "50+", label: "Cities Served", icon: "🌍" },
              { number: "4.9/5", label: "Rating", icon: "⭐" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <div className="text-4xl mb-2 group-hover:animate-bounce">{stat.icon}</div>
                <div className="text-4xl md:text-6xl font-black bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-muted-foreground text-lg font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              FEATURED FLAVORS
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover our most popular Prime flavors loved by millions
            </p>
            <Link href="/products">
              <Button className="btn-prime bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 font-bold">
                View All Products
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/10 to-purple-500/10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              READY TO JOIN THE PRIME SQUAD?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the hydration that's fueling India's next generation of creators and achievers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button
                  size="lg"
                  className="btn-prime bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-lg px-8 py-4 font-bold"
                >
                  <Zap className="mr-2 w-5 h-5" />
                  Shop Prime Now
                </Button>
              </Link>
              <Link href="/verify">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary/20 hover:border-primary/50 text-lg px-8 py-4 font-bold glass bg-transparent"
                >
                  Verify Your Prime
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
