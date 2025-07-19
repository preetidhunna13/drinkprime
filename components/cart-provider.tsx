"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "sonner"

interface CartItem {
  id: number
  name: string
  price: string
  image: string
  quantity: number
  flavor: string
}

interface WishlistItem {
  id: number
  name: string
  price: string
  image: string
  flavor: string
}

interface CartContextType {
  cartItems: CartItem[]
  wishlistItems: WishlistItem[]
  addToCart: (product: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  addToWishlist: (product: WishlistItem) => void
  removeFromWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
  moveToCart: (id: number) => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("prime-cart")
    const savedWishlist = localStorage.getItem("prime-wishlist")

    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist))
    }
  }, [])

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("prime-cart", JSON.stringify(cartItems))
  }, [cartItems])

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("prime-wishlist", JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        toast.success(`Increased ${product.name} quantity`)
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        toast.success(`Added ${product.name} to cart`)
        return [...prev, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (id: number) => {
    setCartItems((prev) => {
      const item = prev.find((item) => item.id === id)
      if (item) {
        toast.success(`Removed ${item.name} from cart`)
      }
      return prev.filter((item) => item.id !== id)
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCartItems([])
    toast.success("Cart cleared")
  }

  const addToWishlist = (product: WishlistItem) => {
    setWishlistItems((prev) => {
      if (prev.find((item) => item.id === product.id)) {
        return prev
      }
      toast.success(`Added ${product.name} to wishlist`)
      return [...prev, product]
    })
  }

  const removeFromWishlist = (id: number) => {
    setWishlistItems((prev) => {
      const item = prev.find((item) => item.id === id)
      if (item) {
        toast.success(`Removed ${item.name} from wishlist`)
      }
      return prev.filter((item) => item.id !== id)
    })
  }

  const isInWishlist = (id: number) => {
    return wishlistItems.some((item) => item.id === id)
  }

  const moveToCart = (id: number) => {
    const wishlistItem = wishlistItems.find((item) => item.id === id)
    if (wishlistItem) {
      addToCart(wishlistItem)
      removeFromWishlist(id)
    }
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = Number.parseInt(item.price.replace("₹", ""))
      return total + price * item.quantity
    }, 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        moveToCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
