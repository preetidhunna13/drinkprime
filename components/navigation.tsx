"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, User, LogOut, Menu, X, Heart, ShoppingCart } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"
import Link from "next/link"
import { useState } from "react"
import SearchBar from "@/components/search-bar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navigation() {
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()
  const { getTotalItems, wishlistItems } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 glass border-b border-border/50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-3xl font-black bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent"
            >
              PRIME
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/products" className="nav-link">
              Products
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/verify" className="nav-link">
              Verify Prime
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Wishlist */}
            <Link href="/wishlist">
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-white text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Theme Toggle */}
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="relative overflow-hidden">
              <motion.div
                initial={false}
                animate={{
                  scale: theme === "light" ? 1 : 0,
                  rotate: theme === "light" ? 0 : 180,
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sun className="h-4 w-4" />
              </motion.div>
              <motion.div
                initial={false}
                animate={{
                  scale: theme === "dark" ? 1 : 0,
                  rotate: theme === "dark" ? 0 : -180,
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Moon className="h-4 w-4" />
              </motion.div>
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass">
                  <DropdownMenuItem onClick={logout} className="flex items-center space-x-2">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="btn-prime bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 font-bold">
                  Get Started
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <SearchBar />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 pb-4 border-t border-border/50"
          >
            <div className="flex flex-col space-y-4 pt-4">
              <Link href="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/products" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Products
              </Link>
              <Link href="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </Link>
              <Link href="/verify" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Verify Prime
              </Link>
              <Link href="/wishlist" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Wishlist ({wishlistItems.length})
              </Link>
              <Link href="/cart" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Cart ({getTotalItems()})
              </Link>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <Button variant="ghost" size="sm" onClick={toggleTheme}>
                  {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <span className="ml-2">{theme === "light" ? "Dark" : "Light"} Mode</span>
                </Button>

                {user ? (
                  <Button variant="ghost" size="sm" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button size="sm" className="btn-prime bg-gradient-to-r from-blue-500 to-purple-600">
                      Get Started
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
