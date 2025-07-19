"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ArrowLeft, Heart, Share2, ShoppingCart, Plus, Minus, Zap, Shield, Truck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

const productData = {
  1: {
    name: "Prime Blue Raspberry",
    price: "₹299",
    originalPrice: "₹399",
    image: "/placeholder.svg?height=500&width=300",
    rating: 4.9,
    reviews: 1247,
    description:
      "The classic that started it all - explosive blue raspberry flavor that delivers instant energy and incredible taste. Perfect for gamers, athletes, and anyone who needs that extra boost.",
    features: [
      "Zero Sugar Formula",
      "200mg Natural Caffeine",
      "Electrolyte Enhanced",
      "Vitamin B Complex",
      "Natural Flavoring",
      "No Artificial Colors",
    ],
    specs: {
      "Serving Size": "355ml",
      Calories: "25",
      Caffeine: "200mg",
      Sodium: "10mg",
      Potassium: "700mg",
      "Vitamin B6": "1.4mg",
      "Vitamin B12": "2.5μg",
    },
    gallery: [
      "/placeholder.svg?height=500&width=300",
      "/placeholder.svg?height=500&width=300",
      "/placeholder.svg?height=500&width=300",
      "/placeholder.svg?height=500&width=300",
    ],
    category: "Energy Drink",
    flavor: "Blue Raspberry",
    inStock: true,
  },
}

const reviews = [
  {
    name: "Arjun Sharma",
    rating: 5,
    text: "Best energy drink I've ever had! The blue raspberry flavor is incredible and gives me energy for hours.",
    date: "2 weeks ago",
    verified: true,
  },
  {
    name: "Priya Patel",
    rating: 5,
    text: "Love this! Perfect for my workout sessions. No crash afterwards like other energy drinks.",
    date: "1 month ago",
    verified: true,
  },
  {
    name: "Rohit Kumar",
    rating: 4,
    text: "Great taste and energy boost. Definitely my go-to drink for gaming sessions.",
    date: "3 weeks ago",
    verified: true,
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const product = productData[1] // Using first product as example

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isZoomed, setIsZoomed] = useState(false)

  const progressValue = useTransform(scrollYProgress, [0, 1], [0, 100])

  const handleAddToCart = () => {
    // Dummy cart logic
    alert(`Added ${quantity} x ${product.name} to cart!`)
  }

  const handleBuyNow = () => {
    // Dummy buy now logic
    alert(`Proceeding to checkout with ${quantity} x ${product.name}`)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-green-500 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full z-40 backdrop-blur-md bg-black/20 border-b border-white/10"
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
            <Link href="/about" className="hover:text-purple-400 transition-colors font-medium">
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

      <div className="pt-24 px-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto mb-8"
        >
          <Link href="/products">
            <Button variant="ghost" className="text-blue-400 hover:text-blue-300 font-bold">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Products
            </Button>
          </Link>
        </motion.div>

        {/* Product Hero */}
        <section className="py-12">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Product Images */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-green-500/20 border border-white/10">
                  <motion.div
                    whileHover={{ scale: isZoomed ? 1 : 1.1 }}
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="cursor-zoom-in h-full"
                  >
                    <Image
                      src={product.gallery[selectedImage] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-300"
                    />
                  </motion.div>
                </div>
                <div className="flex space-x-4">
                  {product.gallery.map((img, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? "border-blue-400" : "border-white/20"
                      }`}
                    >
                      <Image src={img || "/placeholder.svg"} alt="" fill className="object-contain" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 font-bold">
                      {product.category}
                    </Badge>
                    {product.inStock && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-bold">
                        ✅ In Stock
                      </Badge>
                    )}
                  </div>

                  <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    {product.name}
                  </h1>

                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-400"}`}
                        />
                      ))}
                      <span className="ml-2 text-gray-300 font-medium">({product.reviews} reviews)</span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed mb-6">{product.description}</p>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    {product.price}
                  </div>
                  <div className="text-xl text-gray-400 line-through">{product.originalPrice}</div>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 font-bold">Save 25%</Badge>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-gray-300 font-medium">Quantity:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Button
                    onClick={handleBuyNow}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-lg py-6 font-bold"
                  >
                    <Zap className="mr-2 w-5 h-5" />
                    Buy Now
                  </Button>
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent text-lg py-6 font-bold"
                  >
                    <ShoppingCart className="mr-2 w-5 h-5" />
                    Add to Cart
                  </Button>
                </div>

                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>

                {/* Key Features */}
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-black mb-4">Key Features</h3>
                  <ul className="grid grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center"
                      >
                        <Zap className="w-4 h-4 text-blue-400 mr-2 flex-shrink-0" />
                        <span className="text-gray-300 text-sm font-medium">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="py-20">
          <div className="container mx-auto">
            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-white/5 backdrop-blur-lg border border-white/10">
                <TabsTrigger value="specifications" className="font-bold">
                  Specs
                </TabsTrigger>
                <TabsTrigger value="reviews" className="font-bold">
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="shipping" className="font-bold">
                  Shipping
                </TabsTrigger>
              </TabsList>

              <TabsContent value="specifications" className="mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10">
                    <CardHeader>
                      <CardTitle className="text-2xl font-black bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                        Nutritional Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {Object.entries(product.specs).map(([key, value], index) => (
                          <motion.div
                            key={key}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex justify-between items-center py-3 border-b border-white/10"
                          >
                            <span className="text-gray-300 font-medium">{key}</span>
                            <span className="font-bold text-blue-400">{value}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  {reviews.map((review, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="font-bold">{review.name}</h4>
                                {review.verified && (
                                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                    ✓ Verified
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-400"}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-400">{review.date}</span>
                          </div>
                          <p className="text-gray-300">{review.text}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="shipping" className="mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10">
                    <CardHeader>
                      <CardTitle className="text-2xl font-black bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                        Shipping & Returns
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <Truck className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                          <h3 className="font-bold mb-2">Fast Delivery</h3>
                          <p className="text-gray-300 text-sm">Free shipping on orders over ₹999</p>
                        </div>
                        <div className="text-center">
                          <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                          <h3 className="font-bold mb-2">Secure Packaging</h3>
                          <p className="text-gray-300 text-sm">Your Prime arrives in perfect condition</p>
                        </div>
                        <div className="text-center">
                          <Heart className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                          <h3 className="font-bold mb-2">Easy Returns</h3>
                          <p className="text-gray-300 text-sm">30-day hassle-free return policy</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </div>
  )
}
