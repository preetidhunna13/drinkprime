"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface BottleHoverProps {
  children: ReactNode
}

export default function BottleHover({ children }: BottleHoverProps) {
  return (
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
      className="cursor-pointer transform-gpu"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  )
}
