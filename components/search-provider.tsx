"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface Product {
  id: number
  name: string
  flavor: string
  category: string
  price: string
  image: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Prime Blue Raspberry",
    flavor: "Blue Raspberry",
    category: "Energy",
    price: "₹299",
    image: "https://drinkprime.com/cdn/shop/files/PrimeHydration_UK_1serve_BlueRaspberry_00000_b6c8690b-2f25-49d3-af8f-e7acbd4f1ebc_600x.png?v=1731091487?height=200&width=150",
  },
  {
    id: 2,
    name: "Prime Tropical Punch",
    flavor: "Tropical",
    category: "Energy",
    price: "₹299",
    image: "https://drinkprime.com/cdn/shop/files/PrimeHydration_UK_1serve_TropicalPunch_00000_88991c4d-6de2-45b1-9f50-4fe4e9bc0b4d_600x.png?v=1731091491?height=200&width=150",
  },
  {
    id: 3,
    name: "Prime Lemon Lime",
    flavor: "Citrus",
    category: "Energy",
    price: "₹299",
    image: "https://drinkprime.com/cdn/shop/files/PrimeHydration_UK_1serve_LemonLime_00000_285f23e3-a933-4d1e-91fa-caa6ad17adff_600x.png?v=1731091487?height=200&width=150",
  },
  {
    id: 4,
    name: "Prime Meta Moon",
    flavor: "Coconut",
    category: "Hydration",
    price: "₹249",
    image: "https://drinkprime.com/cdn/shop/products/Prime-Metamoon-ProductDetail-front_400x.png?v=1662754165?height=200&width=150",
  },
  {
    id: 5,
    name: "Prime Ice Pop",
    flavor: "Ice Pop",
    category: "Energy",
    price: "₹299",
    image: "https://drinkprime.com/cdn/shop/products/PrimeHydration_1serve_IcePop_0000_400x.png?v=1656076690?height=200&width=150",
  },
  {
    id: 6,
    name: "Prime Grape",
    flavor: "Grape",
    category: "Energy",
    price: "₹299",
    image: "https://drinkprime.com/cdn/shop/files/PrimeHydration_1serve_grape_0000_1_600x.png?v=1711576657?height=200&width=150",
  },
  {
    id: 7,
    name: "Prime Orange",
    flavor: "Orange",
    category: "Energy",
    price: "₹299",
    image: "https://drinkprime.com/cdn/shop/files/PrimeHydration_US_1serve_16.9oz_ICE_Orange_00000_1_600x.png?v=1735309294?height=200&width=150",
  },
  {
    id: 8,
    name: "Prime Strawberry Watermelon",
    flavor: "Strawberry",
    category: "Hydration",
    price: "₹249",
    image: "https://drinkprime.com/cdn/shop/files/PrimeHydration_1serve_StrawberryWatermelon_0000_615629b0-0317-4f1c-a1a1-dbdd154644bb_2_600x.png?v=1711576656?height=200&width=150",
  },
]

interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchResults: Product[]
  isSearching: boolean
  searchProducts: (query: string) => Product[]
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const searchProducts = (query: string): Product[] => {
    if (!query.trim()) return []

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.flavor.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()),
    )

    setSearchResults(filtered)
    return filtered
  }

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearching,
        searchProducts,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}
