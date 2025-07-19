"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, CheckCircle, XCircle, Scan, AlertTriangle } from "lucide-react"
import Navigation from "@/components/navigation"

interface VerificationResult {
  isValid: boolean
  product?: {
    name: string
    flavor: string
    batchNumber: string
    manufactureDate: string
    expiryDate: string
    location: string
  }
  message: string
}

export default function VerifyPage() {
  const [code, setCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [result, setResult] = useState<VerificationResult | null>(null)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return

    setIsVerifying(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Dummy verification logic
    const isValidCode = code.length >= 8 && /^[A-Z0-9]+$/.test(code.toUpperCase())

    if (isValidCode) {
      setResult({
        isValid: true,
        product: {
          name: "Prime Blue Raspberry",
          flavor: "Blue Raspberry",
          batchNumber: "BR2024001",
          manufactureDate: "15/01/2024",
          expiryDate: "15/01/2026",
          location: "Mumbai, India",
        },
        message: "Authentic Prime product verified successfully!",
      })
    } else {
      setResult({
        isValid: false,
        message: "Invalid product code. Please check and try again.",
      })
    }

    setIsVerifying(false)
  }

  const resetVerification = () => {
    setCode("")
    setResult(null)
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 px-6 py-12">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              VERIFY YOUR PRIME
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              Enter your Prime product code to verify authenticity and get detailed product information
            </p>
          </motion.div>

          {/* Verification Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Scan className="w-5 h-5" />
                  <span>Product Verification</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!result ? (
                  <form onSubmit={handleVerify} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="code" className="text-sm font-medium">
                        Product Code
                      </Label>
                      <Input
                        id="code"
                        type="text"
                        placeholder="Enter your Prime product code (e.g., PRIME2024ABC)"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        className="glass border-border/50 focus:border-primary text-center text-lg font-mono tracking-wider"
                        maxLength={12}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Find the code on the bottom of your Prime bottle or packaging
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isVerifying || !code.trim()}
                      className="w-full btn-prime bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 font-bold py-3"
                    >
                      {isVerifying ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                      ) : (
                        <Shield className="w-5 h-5 mr-2" />
                      )}
                      {isVerifying ? "Verifying..." : "Verify Product"}
                    </Button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {/* Verification Result */}
                    <div
                      className={`p-6 rounded-lg border-2 ${
                        result.isValid ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        {result.isValid ? (
                          <CheckCircle className="w-8 h-8 text-green-500" />
                        ) : (
                          <XCircle className="w-8 h-8 text-red-500" />
                        )}
                        <div>
                          <h3 className={`font-bold text-lg ${result.isValid ? "text-green-500" : "text-red-500"}`}>
                            {result.isValid ? "Verified Authentic" : "Verification Failed"}
                          </h3>
                          <p className="text-muted-foreground">{result.message}</p>
                        </div>
                      </div>

                      {/* Product Details */}
                      {result.isValid && result.product && (
                        <div className="space-y-3 mt-6">
                          <h4 className="font-semibold text-foreground">Product Details:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">Product:</span>
                              <span className="ml-2 font-medium">{result.product.name}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Flavor:</span>
                              <span className="ml-2 font-medium">{result.product.flavor}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Batch:</span>
                              <span className="ml-2 font-medium font-mono">{result.product.batchNumber}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Location:</span>
                              <span className="ml-2 font-medium">{result.product.location}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Manufactured:</span>
                              <span className="ml-2 font-medium">{result.product.manufactureDate}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Expires:</span>
                              <span className="ml-2 font-medium">{result.product.expiryDate}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={resetVerification}
                      variant="outline"
                      className="w-full glass border-border/50 hover:border-primary/50 bg-transparent"
                    >
                      Verify Another Product
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12"
          >
            <Card className="glass border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Why Verify Your Prime?</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Ensure product authenticity and quality</li>
                      <li>• Check expiration dates and batch information</li>
                      <li>• Protect against counterfeit products</li>
                      <li>• Access warranty and support services</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
