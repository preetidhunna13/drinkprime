"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Globe, Heart, Target, Lightbulb, Rocket, Star, Trophy, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const milestones = [
  {
    year: "2020",
    title: "The Vision Begins",
    desc: "Fukra Insaan conceptualizes Prime - an energy drink for the gaming and content creation community",
    icon: Lightbulb,
  },
  {
    year: "2021",
    title: "First Formula",
    desc: "After months of testing, the perfect Prime formula is created with zero sugar and maximum energy",
    icon: Zap,
  },
  {
    year: "2022",
    title: "Launch Event",
    desc: "Prime officially launches with a massive YouTube event, reaching 5 million views in 24 hours",
    icon: Rocket,
  },
  {
    year: "2023",
    title: "1 Million Bottles",
    desc: "Prime hits the milestone of 1 million bottles sold across India",
    icon: Trophy,
  },
  {
    year: "2024",
    title: "National Expansion",
    desc: "Prime expands to 50+ cities with partnerships with major retailers and gaming cafes",
    icon: Globe,
  },
]

const team = [
  {
    name: "Logan Paul",
    role: "Co-Founder & Brand Faces",
    image: "https://i.pinimg.com/1200x/a8/da/ce/a8dacef717e0b45eb9f24935476eb885.jpg?height=300&width=300",
    bio: "Visionary creator, podcaster, and boxer, Logan Paul helped transform Prime into a pop-culture phenomenon. With sharp instincts in branding, storytelling, and digital media, he leads Prime's presence across global markets",
    social: "@loganpaul",
  },
  {
    name: "KSI (Olajide “JJ” Olatunji)",
    role: "Co-Founder & Brand Faces",
    image: "https://i.pinimg.com/736x/3f/b2/5c/3fb25ca5fccb7fe6e1bcac6f1ca7989a.jpg?height=300&width=300",
    bio: "Global YouTube icon, rapper, and entrepreneur, KSI brings unmatched creative energy and fan-driven authenticity to Prime. His influence bridges entertainment and wellness, powering Prime's explosive reach across millions of loyal followers",
    social: "@ksi",
  },
  {
    name: "Trey Steiger",
    role: "CEO of Prime",
    image: "/placeholder.svg?height=300&width=300",
    bio: "As the operational powerhouse behind Prime, Trey oversees product development, logistics, and retail expansion. With years of experience in CPG under Congo Brands, he's the architect behind scaling Prime into a billion-dollar brand.",
    social: "@trey_ops",
  },
  {
    name: "Max Clemons",
    role: " Co-owner of Prime",
    image: "https://primevsgatorade.com/wp-content/uploads/2024/06/Entrepreneur-Max-Clemons-co-founder-of-Congo-Brands-and-PRIME.png?height=300&width=300",
    bio: "Business strategist and co-founder of Congo Brands, Max Clemons leads high-level decisions behind Prime's growth. He's the key force connecting manufacturing, partnerships, and long-term brand vision — all while staying behind the scenes.",
    social: "@max_builds",
  },
  {
    name: "Matt Zucco ",
    role: " VP of Marketing",
    image: "https://i1.sndcdn.com/avatars-DjNBDErAWiy2g5QG-93CRZw-t500x500.jpg?height=300&width=300",
    bio: "Marketing strategist fueling Prime's explosive growth across India with bold campaigns, creator-led content, and data-driven decisions.",
    social: "@mattz_prime",
  },
  {
    name: "Keith Adams",
    role: "Creative Director",
    image: "https://clemsontigers.com/wp-content/uploads/2023/09/Adams-Jr_Keith_071123_STF_Fb_23-scaled.jpg?height=300&width=300",
    bio: "Design visionary behind Prime's iconic visual identity, packaging, and storytelling — shaping how India sees and sips Prime.",
    social: "@keith_creative",
  },
]

const achievements = [
  { icon: Users, number: "10M+", label: "Community Members", color: "from-blue-400 to-cyan-500" },
  { icon: Globe, number: "50+", label: "Cities Served", color: "from-green-400 to-emerald-500" },
  { icon: Award, number: "15", label: "Industry Awards", color: "from-purple-400 to-pink-500" },
  { icon: Heart, number: "99.2%", label: "Customer Love", color: "from-red-400 to-rose-500" },
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/10"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-green-400 to-purple-500 bg-clip-text text-transparent"
          >
            PRIME
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-blue-400 transition-colors font-medium">
              Home
            </Link>
            <Link href="/products" className="hover:text-green-400 transition-colors font-medium">
              Products
            </Link>
            <Link href="/about" className="text-purple-400 font-medium">
              About
            </Link>
          </div>
          <Link href="/login">
            <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 font-bold">
              Get Started
            </Button>
          </Link>
        </div>
      </motion.nav>

      <div className="pt-24">
        {/* Hero Section */}
        <section className="py-20 px-6 relative overflow-hidden">
          <motion.div style={{ y }} className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-green-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl" />
          </motion.div>

          <div className="container mx-auto text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-9xl font-black mb-6 bg-gradient-to-r from-blue-400 via-green-400 to-purple-500 bg-clip-text text-transparent"
            >
              OUR STORY
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 font-medium"
            >
              From a content creator's dream to India's most loved energy drink. This is the Prime journey.
            </motion.p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {[
                {
                  icon: Target,
                  title: "OUR MISSION",
                  desc: "To fuel the dreams and ambitions of India's youth with the ultimate energy drink that powers their hustle and creativity.",
                  color: "from-blue-400 to-cyan-500",
                },
                {
                  icon: Lightbulb,
                  title: "OUR VISION",
                  desc: "To become India's #1 energy drink brand, synonymous with gaming, content creation, and youth culture.",
                  color: "from-green-400 to-emerald-500",
                },
                {
                  icon: Rocket,
                  title: "OUR VALUES",
                  desc: "Innovation, authenticity, community, and relentless pursuit of excellence drive everything we do at Prime.",
                  color: "from-purple-400 to-pink-500",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 text-center group"
                >
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mb-6 mx-auto group-hover:animate-pulse`}
                  >
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-6 bg-gradient-to-r from-blue-900/10 to-green-900/10">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                THE PRIME JOURNEY
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium">
                From idea to India's favorite energy drink - here's how we built the Prime empire
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-green-400 to-purple-500 rounded-full" />

              <div className="space-y-16">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                      <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 hover:border-blue-400/50 transition-all duration-300 group">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-4">
                            <Badge className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold text-lg px-4 py-2">
                              {milestone.year}
                            </Badge>
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-green-500 rounded-full flex items-center justify-center group-hover:animate-spin">
                              <milestone.icon className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          <CardTitle className="text-2xl font-black">{milestone.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-300 font-medium leading-relaxed">{milestone.desc}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Timeline Dot */}
                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-500 rounded-full border-4 border-black shadow-lg"
                      />
                    </div>

                    <div className="w-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                MEET THE SQUAD
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium">
                The brilliant minds behind Prime's incredible success
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* First 4 team members */}
              {team.slice(0, 4).map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/10 text-center group hover:border-purple-400/50 transition-all duration-300"
                >
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-400 to-green-500">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-black mb-2">{member.name}</h3>
                  <p className="text-blue-400 mb-2 font-bold">{member.role}</p>
                  <p className="text-gray-300 text-sm mb-4 font-medium">{member.bio}</p>
                  <Badge variant="outline" className="border-green-400/50 text-green-400 font-medium">
                    {member.social}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Last 2 team members centered */}
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mt-8">
              {team.slice(4).map((member, index) => (
                <motion.div
                  key={index + 4}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: (index + 4) * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/10 text-center group hover:border-purple-400/50 transition-all duration-300"
                >
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-400 to-green-500">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-black mb-2">{member.name}</h3>
                  <p className="text-blue-400 mb-2 font-bold">{member.role}</p>
                  <p className="text-gray-300 text-sm mb-4 font-medium">{member.bio}</p>
                  <Badge variant="outline" className="border-green-400/50 text-green-400 font-medium">
                    {member.social}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-20 px-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                OUR ACHIEVEMENTS
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center group"
                >
                  <div
                    className={`w-24 h-24 bg-gradient-to-r ${achievement.color} rounded-full flex items-center justify-center mb-6 mx-auto group-hover:animate-bounce`}
                  >
                    <achievement.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-2">
                    {achievement.number}
                  </div>
                  <p className="text-gray-300 font-bold">{achievement.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
                WHAT PEOPLE SAY
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Gaming Pro Arjun",
                  role: "Professional Gamer",
                  text: "Prime is my secret weapon! It gives me the energy I need for those intense 12-hour gaming sessions.",
                  rating: 5,
                  avatar: "https://www.sabs.ro/wp-content/uploads/2023/05/Vladut-Diaconu-e1684233621147.jpg?height=60&width=60",
                },
                {
                  name: "Content Creator Priya",
                  role: "YouTuber - 2M Subscribers",
                  text: "As a content creator, I need consistent energy. Prime delivers without the crash. It's a game-changer!",
                  rating: 5,
                  avatar: "https://tse2.mm.bing.net/th/id/OIP.4Ty3YEzRaCcQofUsZJXQgwHaI9?w=900&h=1088&rs=1&pid=ImgDetMain&o=7&rm=3?height=60&width=60",
                },
                {
                  name: "Student Rohit",
                  role: "Engineering Student",
                  text: "Prime helps me power through my study sessions and coding marathons. Plus, it tastes amazing!",
                  rating: 5,
                  avatar: "https://i.scdn.co/image/ab67616d0000b273c05c881e7e572c44832b30ae?height=60&width=60",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-pink-400/50 transition-all duration-300"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic font-medium">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-blue-400 text-sm font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-blue-900/30 to-green-900/30">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                READY TO JOIN THE PRIME SQUAD?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-medium">
                Experience the energy that's fueling India's next generation of creators and achievers
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-lg px-8 py-4 font-bold"
                  >
                    <Zap className="mr-2 w-5 h-5" />
                    Shop Prime Now
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4 bg-transparent font-bold"
                  >
                    Join Community
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
