"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Plus, Minus, X, ArrowLeft, CreditCard } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Navigation from "@/components/navigation"
import { useCart } from "@/components/cart-provider"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart()

  const handleCheckout = () => {
    if (cartItems.length === 0) return

    // Simulate checkout process
    alert(`Proceeding to checkout with ${cartItems.length} items. Total: ₹${getTotalPrice()}`)
  }

  const formatPrice = (price: string) => {
    return Number.parseInt(price.replace("₹", ""))
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 px-6 py-12">
        <div className="container mx-auto max-w-6xl">
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
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              YOUR CART
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {cartItems.length > 0
                ? `You have ${cartItems.reduce((total, item) => total + item.quantity, 0)} item${cartItems.reduce((total, item) => total + item.quantity, 0) !== 1 ? "s" : ""} in your cart`
                : "Your cart is empty. Start adding your favorite Prime flavors!"}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {cartItems.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    {/* Clear Cart Button */}
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Cart Items</h2>
                      <Button
                        variant="outline"
                        onClick={clearCart}
                        className="text-red-500 border-red-500/30 hover:bg-red-500/10 bg-transparent"
                      >
                        Clear Cart
                      </Button>
                    </div>

                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        layout
                      >
                        <Card className="glass border border-border/50 hover:border-primary/50 transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                              {/* Product Image */}
                              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-blue-500/10 flex-shrink-0">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>

                              {/* Product Info */}
                              <div className="flex-1">
                                <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{item.flavor}</p>
                                <div className="text-lg font-black bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                                  {item.price} each
                                </div>
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-8 h-8 p-0"
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-8 text-center font-bold">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-8 h-8 p-0"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>

                              {/* Item Total */}
                              <div className="text-right">
                                <div className="text-lg font-black">₹{formatPrice(item.price) * item.quantity}</div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-500 hover:text-red-600 hover:bg-red-500/10 mt-1"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
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
                    <div className="w-32 h-32 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-8">
                      <ShoppingCart className="w-16 h-16 text-primary/50" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-muted-foreground">Your cart is empty</h3>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                      Discover amazing Prime flavors and add them to your cart
                    </p>
                    <Link href="/products">
                      <Button className="btn-prime bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 font-bold">
                        <ShoppingCart className="mr-2 w-4 h-4" />
                        Start Shopping
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            {cartItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <Card className="glass border border-border/50 sticky top-32">
                  <CardHeader>
                    <CardTitle className="text-xl font-black">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Items Breakdown */}
                    <div className="space-y-2">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-medium">₹{formatPrice(item.price) * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border/50 pt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">₹{getTotalPrice()}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-medium text-green-500">Free</span>
                      </div>
                      <div className="flex justify-between text-sm mb-4">
                        <span className="text-muted-foreground">Tax</span>
                        <span className="font-medium">₹{Math.round(getTotalPrice() * 0.18)}</span>
                      </div>
                      <div className="border-t border-border/50 pt-4">
                        <div className="flex justify-between text-lg font-black">
                          <span>Total</span>
                          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            ₹{getTotalPrice() + Math.round(getTotalPrice() * 0.18)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleCheckout}
                      className="w-full btn-prime bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 font-bold py-3 text-lg"
                    >
                      <CreditCard className="mr-2 w-5 h-5" />
                      Checkout
                    </Button>

                    <div className="text-center">
                      <Link href="/products">
                        <Button
                          variant="outline"
                          className="glass border-border/50 hover:border-primary/50 bg-transparent font-bold"
                        >
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
