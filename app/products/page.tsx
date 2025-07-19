"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Filter, Search, ShoppingCart, Zap, Heart, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Navigation from "@/components/navigation"
import { useCart } from "@/components/cart-provider"

const products = [
  {
    id: 1,
    name: "Prime Blue Raspberry",
    price: "₹299",
    originalPrice: "₹399",
    image: "https://drinkprime.com/cdn/shop/files/PrimeHydration_UK_1serve_BlueRaspberry_00000_b6c8690b-2f25-49d3-af8f-e7acbd4f1ebc_600x.png?v=1731091487?height=300&width=200",
    flavor: "Blue Raspberry",
    category: "Energy",
    rating: 4.9,
    reviews: 1247,
    popular: true,
    description: "The classic that started it all - explosive blue raspberry flavor",
    colors: ["from-blue-400", "to-blue-600"],
  },
  {
    id: 2,
    name: "Prime Tropical Punch",
    price: "₹299",
    originalPrice: "₹399",
    image: "https://drinkprime.com/cdn/shop/files/PrimeHydration_UK_1serve_TropicalPunch_00000_88991c4d-6de2-45b1-9f50-4fe4e9bc0b4d_600x.png?v=1731091491?height=300&width=200",
    flavor: "Tropical",
    category: "Energy",
    rating: 4.8,
    reviews: 892,
    popular: false,
    description: "Transport yourself to paradise with tropical punch",
    colors: ["from-orange-400", "to-pink-500"],
  },
  {
    id: 3,
    name: "Prime Lemon Lime",
    price: "₹299",
    originalPrice: "₹399",
    image: "https://drinkprime.com/cdn/shop/files/PrimeHydration_UK_1serve_LemonLime_00000_285f23e3-a933-4d1e-91fa-caa6ad17adff_600x.png?v=1731091487?height=300&width=200",
    flavor: "Citrus",
    category: "Energy",
    rating: 4.7,
    reviews: 654,
    popular: false,
    description: "Refreshing citrus blast for the ultimate energy boost",
    colors: ["from-yellow-400", "to-green-500"],
  },
  {
    id: 4,
    name: "Prime Meta Moon",
    price: "₹249",
    originalPrice: "₹349",
    image: "https://drinkprime.com/cdn/shop/products/Prime-Metamoon-ProductDetail-front_400x.png?v=1662754165?height=300&width=200",
    flavor: "Coconut",
    category: "Hydration",
    rating: 4.6,
    reviews: 423,
    popular: false,
    description: "Pure hydration with natural coconut water",
    colors: ["from-green-400", "to-blue-400"],
  },
  {
    id: 5,
    name: "Prime Ice Pop",
    price: "₹299",
    originalPrice: "₹399",
    image: "https://drinkprime.com/cdn/shop/products/PrimeHydration_1serve_IcePop_0000_400x.png?v=1656076690?height=300&width=200",
    flavor: "Ice Pop",
    category: "Energy",
    rating: 4.9,
    reviews: 1156,
    popular: true,
    description: "Cool and refreshing ice pop flavor sensation",
    colors: ["from-cyan-400", "to-purple-500"],
  },
  {
    id: 6,
    name: "Prime Grape",
    price: "₹299",
    originalPrice: "₹399",
    image: "https://drinkprime.com/cdn/shop/files/PrimeHydration_1serve_grape_0000_1_600x.png?v=1711576657?height=300&width=200",
    flavor: "Grape",
    category: "Energy",
    rating: 4.8,
    reviews: 789,
    popular: false,
    description: "Rich grape flavor that packs a powerful punch",
    colors: ["from-purple-400", "to-pink-500"],
  },
  {
    id: 7,
    name: "Prime Orange",
    price: "₹299",
    originalPrice: "₹399",
    image: "https://drinkprime.com/cdn/shop/files/PrimeHydration_US_1serve_16.9oz_ICE_Orange_00000_1_600x.png?v=1735309294?height=300&width=200",
    flavor: "Orange",
    category: "Energy",
    rating: 4.9,
    reviews: 1156,
    popular: true,
    description: "Cool and refreshing ice pop flavor sensation",
    colors: ["from-cyan-400", "to-purple-500"],
  },
  {
    id: 8,
    name: "Prime Strawberry Watermelon",
    price: "₹299",
    originalPrice: "₹399",
    image: "https://drinkprime.com/cdn/shop/files/PrimeHydration_1serve_StrawberryWatermelon_0000_615629b0-0317-4f1c-a1a1-dbdd154644bb_2_600x.png?v=1711576656?height=300&width=200",
    flavor: "Strawberry",
    category: "Energy",
    rating: 4.8,
    reviews: 789,
    popular: false,
    description: "Rich grape flavor that packs a powerful punch",
    colors: ["from-purple-400", "to-pink-500"],
  },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedFlavor, setSelectedFlavor] = useState("all")
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart()

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.flavor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesFlavor =
      selectedFlavor === "all" || product.flavor.toLowerCase().includes(selectedFlavor.toLowerCase())

    return matchesSearch && matchesCategory && matchesFlavor
  })

  const handleWishlistToggle = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        flavor: product.flavor,
      })
    }
  }

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      flavor: product.flavor,
    })
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 px-6">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient bg-300%"
            >
              PRIME COLLECTION
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 font-medium"
            >
              Discover the full range of Prime hydration drinks. Each flavor crafted for peak performance and incredible
              taste.
            </motion.p>
          </div>
        </section>

        {/* Search and Filters Section */}
        <section className="py-12">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl p-6 border border-border/50 mb-12 shadow-lg"
            >
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center space-x-2 text-primary">
                  <Filter className="w-5 h-5" />
                  <span className="font-bold">Filters:</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  {/* Search Input */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Search products by name or flavor..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 glass border-border/50 font-medium focus:border-primary transition-all duration-300"
                    />
                  </div>

                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-48 glass border-border/50">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="glass border-border/50">
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="energy">Energy</SelectItem>
                      <SelectItem value="hydration">Hydration</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedFlavor} onValueChange={setSelectedFlavor}>
                    <SelectTrigger className="w-full sm:w-48 glass border-border/50">
                      <SelectValue placeholder="Flavor" />
                    </SelectTrigger>
                    <SelectContent className="glass border-border/50">
                      <SelectItem value="all">All Flavors</SelectItem>
                      <SelectItem value="blue">Blue Raspberry</SelectItem>
                      <SelectItem value="tropical">Tropical</SelectItem>
                      <SelectItem value="citrus">Citrus</SelectItem>
                      <SelectItem value="coconut">Coconut</SelectItem>
                      <SelectItem value="grape">Grape</SelectItem>
                      <SelectItem value="Orange">Orange</SelectItem>
                      <SelectItem value="Strawberry">Strawberry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>

            {/* Products Grid */}
            <AnimatePresence mode="wait">
              {filteredProducts.length > 0 ? (
                <motion.div
                  key={`${selectedCategory}-${selectedFlavor}-${searchTerm}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      onHoverStart={() => setHoveredProduct(product.id)}
                      onHoverEnd={() => setHoveredProduct(null)}
                      className="relative group"
                    >
                      <Card className="glass border border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden h-full shadow-lg hover:shadow-2xl group-hover:scale-105">
                        {product.popular && (
                          <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 font-bold animate-pulse">
                            🔥 POPULAR
                          </Badge>
                        )}

                        <CardHeader className="pb-4">
                          <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${product.colors[0]} ${product.colors[1]} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                            />
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
                              className="cursor-pointer transform-gpu h-full"
                              style={{ transformStyle: "preserve-3d" }}
                            >
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-contain transition-transform duration-500"
                              />
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-4"
                            >
                              <div className="flex space-x-2">
                                <Link href={`/products/${product.id}`}>
                                  <Button size="sm" className="glass bg-white/20 hover:bg-white/30 font-bold">
                                    <Eye className="mr-2 w-4 h-4" />
                                    Quick View
                                  </Button>
                                </Link>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleWishlistToggle(product)}
                                  className={`p-2 rounded-lg glass transition-colors ${
                                    isInWishlist(product.id)
                                      ? "bg-red-500/20 text-red-500"
                                      : "bg-white/20 text-white hover:bg-white/30"
                                  }`}
                                >
                                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                                </motion.button>
                              </div>
                            </motion.div>
                          </div>

                          <div className="flex items-center justify-between mb-2">
                            <Badge
                              variant="outline"
                              className={`border-primary/50 text-primary font-bold bg-gradient-to-r ${product.colors[0]} ${product.colors[1]} bg-clip-text text-transparent`}
                            >
                              {product.category}
                            </Badge>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                              <span className="text-sm text-muted-foreground font-medium">{product.rating}</span>
                              <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                            </div>
                          </div>

                          <CardTitle className="text-xl font-black mb-2 group-hover:text-primary transition-colors duration-300">
                            {product.name}
                          </CardTitle>
                          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{product.description}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div
                                className={`text-2xl font-black bg-gradient-to-r ${product.colors[0]} ${product.colors[1]} bg-clip-text text-transparent`}
                              >
                                {product.price}
                              </div>
                              <div className="text-sm text-muted-foreground line-through">{product.originalPrice}</div>
                            </div>
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 font-bold">25% OFF</Badge>
                          </div>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <Button
                            onClick={() => handleAddToCart(product)}
                            className={`w-full btn-prime bg-gradient-to-r ${product.colors[0]} ${product.colors[1]} hover:scale-105 font-bold group/btn transition-all duration-300 shadow-lg hover:shadow-xl`}
                          >
                            <ShoppingCart className="mr-2 w-4 h-4 group-hover/btn:animate-bounce" />
                            Add to Cart
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-20"
                >
                  <div className="text-6xl mb-4">😔</div>
                  <h3 className="text-2xl font-bold mb-2 text-muted-foreground">No products found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl my-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                WHY CHOOSE PRIME?
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "INSTANT HYDRATION",
                  desc: "Explosive hydration boost that lasts for hours",
                  color: "from-yellow-400 to-orange-500",
                },
                {
                  icon: Star,
                  title: "PREMIUM QUALITY",
                  desc: "Only the finest ingredients for peak performance",
                  color: "from-purple-400 to-pink-500",
                },
                {
                  icon: ShoppingCart,
                  title: "FAST DELIVERY",
                  desc: "Get your Prime delivered within 24 hours",
                  color: "from-green-400 to-blue-500",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="text-center group cursor-pointer"
                >
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mb-6 mx-auto group-hover:animate-pulse shadow-lg`}
                  >
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-black mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground font-medium">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
