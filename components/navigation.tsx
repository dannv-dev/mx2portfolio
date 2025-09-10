"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    if (typeof document === "undefined") return

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 backdrop-blur-sm shadow-lg border-b border-gray-800" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src="/images/mx2twins-logo.png" alt="MX2Twins Logo" className="h-10 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-white hover:text-gray-300 transition-colors font-semibold"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("music")}
              className="text-white hover:text-gray-300 transition-colors font-semibold"
            >
              Music
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-white hover:text-gray-300 transition-colors font-semibold"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-white hover:text-gray-300 transition-colors font-semibold"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white hover:text-gray-300 transition-colors font-semibold"
            >
              Contact
            </button>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild className="text-white hover:text-gray-300">
                <a href="https://www.instagram.com/mx2twins" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram text-lg"></i>
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild className="text-white hover:text-gray-300">
                <a href="https://www.youtube.com/@MX2twins" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube text-lg"></i>
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              {isMobileMenuOpen ? <i className="fas fa-times text-xl"></i> : <i className="fas fa-bars text-xl"></i>}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection("home")}
                className="block px-3 py-2 text-white hover:text-gray-300 transition-colors font-medium w-full text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("music")}
                className="block px-3 py-2 text-white hover:text-gray-300 transition-colors font-medium w-full text-left"
              >
                Music
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block px-3 py-2 text-white hover:text-gray-300 transition-colors font-medium w-full text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="block px-3 py-2 text-white hover:text-gray-300 transition-colors font-medium w-full text-left"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block px-3 py-2 text-white hover:text-gray-300 transition-colors font-medium w-full text-left"
              >
                Contact
              </button>
              <div className="flex items-center space-x-2 px-3 py-2">
                <Button variant="ghost" size="sm" asChild className="text-white hover:text-gray-300">
                  <a href="https://www.instagram.com/mx2twins" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram text-lg"></i>
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild className="text-white hover:text-gray-300">
                  <a href="https://www.youtube.com/@MX2twins" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-youtube text-lg"></i>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
