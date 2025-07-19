"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useSearch } from "@/components/search-provider"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const { searchProducts } = useSearch()
  const [suggestions, setSuggestions] = useState<any[]>([])
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    if (searchQuery.trim()) {
      const results = searchProducts(searchQuery)
      setSuggestions(results)
      setIsOpen(true)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }

  const handleSelectProduct = (productId: number) => {
    router.push(`/products/${productId}`)
    setIsOpen(false)
    setQuery("")
    setSuggestions([])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (suggestions.length > 0) {
      handleSelectProduct(suggestions[0].id)
    } else if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`)
      setIsOpen(false)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setSuggestions([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search Prime flavors..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          className="pl-10 pr-10 glass border-border/50 focus:border-primary transition-all duration-300"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 glass border border-border/50 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
          >
            {suggestions.length > 0 ? (
              <div className="p-2">
                <div className="text-xs text-muted-foreground px-3 py-2 font-medium">
                  {suggestions.length} result{suggestions.length !== 1 ? "s" : ""} found
                </div>
                {suggestions.map((product, index) => (
                  <motion.button
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelectProduct(product.id)}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted/20">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{product.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {product.category} • {product.price}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : query ? (
              <div className="p-6 text-center">
                <div className="text-muted-foreground mb-2">No results found</div>
                <div className="text-sm text-muted-foreground">
                  Try searching for "Blue Raspberry", "Tropical", or "Coconut"
                </div>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
