"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface Image {
  id: string
  title: string
  image_url: string
  alt_text: string
  section: string
  display_order: number
  is_active: boolean
}

export function HeroSection() {
  const [heroImage, setHeroImage] = useState<Image | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const response = await fetch("/api/images?section=hero")
        if (response.ok) {
          const data = await response.json()
          // Get the first active hero image
          const activeHeroImage = data.find((img: Image) => img.is_active) || data[0]
          setHeroImage(activeHeroImage)
        }
      } catch (error) {
        console.error("Error fetching hero image:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroImage()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {loading ? (
          <div className="w-full h-full bg-black"></div>
        ) : (
          <>
            <img
              src={heroImage?.image_url || "/images/mx2twins-studio.jpg"}
              alt={heroImage?.alt_text || "MX2Twins Studio Shot"}
              className="w-full h-full object-cover object-center sm:object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6 sm:px-6 lg:px-8">
        {/* Made logo larger and more prominent, removed text title */}
        <div className="flex justify-center mb-6 sm:mb-4">
          <img src="/images/mx2twins-logo.png" alt="MX2Twins Logo" className="h-24 sm:h-32 md:h-48 lg:h-64 w-auto" />
        </div>

        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-400 max-w-2xl mx-auto px-4">
          Double the Energy. Double the Bars.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
          <Button
            size="lg"
            className="bg-white hover:bg-gray-200 text-black font-bold px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
            onClick={() => scrollToSection("music")}
          >
            <i className="fas fa-play mr-2"></i>
            Listen Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-black font-bold px-6 sm:px-8 py-3 text-base sm:text-lg bg-transparent w-full sm:w-auto"
            onClick={() => scrollToSection("contact")}
          >
            Book Us
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 sm:space-x-6">
          <a
            href="https://www.instagram.com/mx2twins"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
          >
            <i className="fab fa-instagram text-3xl"></i>
            <span className="sr-only">Instagram</span>
          </a>
          <a
            href="https://www.tiktok.com/@mx2twins"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
          >
            <i className="fab fa-tiktok text-3xl"></i>
            <span className="sr-only">TikTok</span>
          </a>
          <a
            href="https://open.spotify.com/artist/3wJT41WhEMtdLC77XiqC8N?si=KquCsOa6Rr6GB9nlZfpmIw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
          >
            <i className="fab fa-spotify text-3xl"></i>
            <span className="sr-only">Spotify</span>
          </a>
          <a
            href="https://music.apple.com/us/artist/mx2/1660386035"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
          >
            <i className="fa-solid fa-music text-3xl"></i>
            <span className="sr-only">Apple Music</span>
          </a>
          <a
            href="https://www.youtube.com/@MX2twins"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
          >
            <i className="fab fa-youtube text-3xl"></i>
            <span className="sr-only">YouTube</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
