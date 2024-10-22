"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"

interface MusicPlayerButtonProps {
  weekNumber: number
  isPlaying: boolean
  onClick: () => void
}

export function MusicPlayerButtonComponent({ weekNumber, isPlaying, onClick }: MusicPlayerButtonProps) {
  return (
    <motion.div
      whileHover={{ opacity: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        onClick={onClick}
        variant="outline"
        className="border-primary text-primary hover:bg-primary/5 transition-colors duration-200"
      >
        {isPlaying ? (
          <Pause className="h-4 w-4 mr-2" />
        ) : (
          <Play className="h-4 w-4 mr-2" />
        )}
        Set {weekNumber}
      </Button>
    </motion.div>
  )
}