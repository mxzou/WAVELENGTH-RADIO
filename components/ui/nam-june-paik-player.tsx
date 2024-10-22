"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface NamJunePaikPlayerProps {
    onPlay: () => void
    onStop: () => void
}

export function NamJunePaikPlayer({ onPlay, onStop }: NamJunePaikPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)

    const handlePlay = () => {
        setIsPlaying(true)
        onPlay()
    }

    const handleStop = () => {
        setIsPlaying(false)
        onStop()
    }

    return (
        <div className="flex space-x-4">
            <motion.button
                onClick={handlePlay}
                className="w-16 h-16 bg-transparent border-2 border-[#39FF14] flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <motion.div
                    className="w-0 h-0 border-l-[14px] border-l-[#39FF14] border-y-[10px] border-y-transparent"
                    animate={{
                        opacity: isPlaying ? [1, 0.5, 1] : 1,
                    }}
                    transition={{
                        duration: 1,
                        repeat: isPlaying ? Infinity : 0,
                        ease: "linear",
                    }}
                />
            </motion.button>

            <motion.button
                onClick={handleStop}
                className="w-16 h-16 bg-transparent border-2 border-[#39FF14] flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <motion.div
                    className="w-8 h-8 bg-[#39FF14]"
                    animate={{
                        scale: isPlaying ? 1 : [1, 0.9, 1],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </motion.button>

            <svg width="0" height="0">
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </svg>
        </div>
    )
}