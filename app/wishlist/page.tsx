"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ShoppingCart, X, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Navigation from "@/components/navigation"
import { useCart } from "@/components/cart-provider"

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, moveToCart } = useCart()

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 px-6 py-12">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <Link href="/products">
                <Button variant="ghost" className="mr-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </Button>
              </Link>
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white fill-current" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
              YOUR WISHLIST
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {wishlistItems.length > 0
                ? `You have ${wishlistItems.length} item${wishlistItems.length !== 1 ? "s" : ""} in your wishlist`
                : "Your wishlist is empty. Start adding your favorite Prime flavors!"}
            </p>
          </motion.div>

          {/* Wishlist Items */}
          <AnimatePresence mode="wait">
            {wishlistItems.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {wishlistItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, y: -50 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    layout
                  >
                    <Card className="glass border border-border/50 hover:border-red-500/50 transition-all duration-300 overflow-hidden group">
                      <CardHeader className="pb-4">
                        <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-red-500/10 to-pink-500/10">
                          <motion.div
                            whileHover={{
                              y: -10,
                              scale: 1.05,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                            className="h-full"
                          >
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-contain transition-transform duration-300"
                            />
                          </motion.div>

                          {/* Remove Button */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromWishlist(item.id)}
                            className="absolute top-2 right-2 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </motion.button>
                        </div>

                        <CardTitle className="text-lg font-black mb-2 group-hover:text-red-500 transition-colors duration-300">
                          {item.name}
                        </CardTitle>

                        <div className="flex items-center justify-between mb-4">
                          <div className="text-xl font-black bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                            {item.price}
                          </div>
                          <div className="text-sm text-muted-foreground font-medium">{item.flavor}</div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0 space-y-2">
                        <Button
                          onClick={() => moveToCart(item.id)}
                          className="w-full btn-prime bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 font-bold group/btn"
                        >
                          <ShoppingCart className="mr-2 w-4 h-4 group-hover/btn:animate-bounce" />
                          Move to Cart
                        </Button>

                        <Link href={`/products/${item.id}`} className="block">
                          <Button
                            variant="outline"
                            className="w-full glass border-border/50 hover:border-red-500/50 bg-transparent font-bold"
                          >
                            View Details
                          </Button>
                        </Link>
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
                <div className="w-32 h-32 bg-gradient-to-r from-red-500/20 to-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Heart className="w-16 h-16 text-red-500/50" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-muted-foreground">Your wishlist is empty</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Discover amazing Prime flavors and add them to your wishlist for later
                </p>
                <Link href="/products">
                  <Button className="btn-prime bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 font-bold">
                    <Heart className="mr-2 w-4 h-4" />
                    Start Shopping
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Actions */}
          {wishlistItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button
                    variant="outline"
                    className="glass border-border/50 hover:border-primary/50 bg-transparent font-bold"
                  >
                    Continue Shopping
                  </Button>
                </Link>
                <Link href="/cart">
                  <Button className="btn-prime bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 font-bold">
                    <ShoppingCart className="mr-2 w-4 h-4" />
                    View Cart
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
