"use client"
import { Button } from "@/components/ui/button"
import type React from "react"
import { useState, useEffect, useRef } from "react"

interface Song {
  id: string
  title: string
  artist: string
  spotify_embed_url: string
  display_order: number
  is_active: boolean
}

const convertToSpotifyEmbed = (url: string): string => {
  if (url.includes("/embed/")) {
    return url
  }

  const trackMatch = url.match(/\/track\/([a-zA-Z0-9]+)/)
  if (trackMatch) {
    const trackId = trackMatch[1]
    return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`
  }

  return url
}

export function MusicSection() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        console.log("[v0] Attempting to fetch songs from /api/songs")
        const response = await fetch("/api/songs")
        console.log("[v0] Response status:", response.status)

        if (response.ok) {
          const data = await response.json()
          console.log("[v0] Fetched songs from database:", data)

          if (data && data.length > 0) {
            setSongs(data)
          } else {
            console.log("[v0] No songs in database, using fallback songs")
            setSongs(fallbackSongs)
          }
        } else {
          const errorText = await response.text()
          console.error("[v0] Failed to fetch songs - Status:", response.status, "Error:", errorText)
          setSongs(fallbackSongs)
        }
      } catch (error) {
        console.error("[v0] Error fetching songs:", error)
        setSongs(fallbackSongs)
      } finally {
        setLoading(false)
      }
    }

    fetchSongs()
  }, [])

  const nextTrack = () => {
    if (isAnimating) return
    setCurrentIndex((prev) => (prev + 1) % songs.length)
  }

  const prevTrack = () => {
    if (isAnimating) return
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (songs.length <= 1) return
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setCurrentX(e.touches[0].clientX)
    setDragOffset(0)

    // Prevent default scrolling behavior
    e.preventDefault()
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || songs.length <= 1) return

    const touchX = e.touches[0].clientX
    const diffX = touchX - startX
    setCurrentX(touchX)
    setDragOffset(diffX)

    // Prevent default scrolling
    e.preventDefault()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging || songs.length <= 1) return

    setIsDragging(false)
    setIsAnimating(true)

    const endX = e.changedTouches[0].clientX
    const diffX = startX - endX
    const threshold = 50
    const velocity = Math.abs(diffX) / 100 // Simple velocity calculation

    // Reset drag offset
    setDragOffset(0)

    if (Math.abs(diffX) > threshold || velocity > 0.5) {
      if (diffX > 0) {
        nextTrack()
      } else {
        prevTrack()
      }
    }

    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 300)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (songs.length <= 1) return
    setIsDragging(true)
    setStartX(e.clientX)
    setCurrentX(e.clientX)
    setDragOffset(0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || songs.length <= 1) return

    const mouseX = e.clientX
    const diffX = mouseX - startX
    setCurrentX(mouseX)
    setDragOffset(diffX)
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || songs.length <= 1) return

    setIsDragging(false)
    setIsAnimating(true)

    const endX = e.clientX
    const diffX = startX - endX
    const threshold = 50

    setDragOffset(0)

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        nextTrack()
      } else {
        prevTrack()
      }
    }

    setTimeout(() => setIsAnimating(false), 300)
  }

  const fallbackSongs: Song[] = [
    {
      id: "fallback-1",
      title: "Coming Soon",
      artist: "MX2Twins",
      spotify_embed_url: "https://open.spotify.com/embed/track/4iV5W9uYEdYUVa79Axb7Rh?utm_source=generator&theme=0",
      display_order: 1,
      is_active: true,
    },
    {
      id: "fallback-2",
      title: "New Release",
      artist: "MX2Twins",
      spotify_embed_url: "https://open.spotify.com/embed/track/1301WleyT98MSxVHPZCA6M?utm_source=generator&theme=0",
      display_order: 2,
      is_active: true,
    },
    {
      id: "fallback-3",
      title: "Latest Track",
      artist: "MX2Twins",
      spotify_embed_url: "https://open.spotify.com/embed/track/6habFhsOp2NvshLv26DqMb?utm_source=generator&theme=0",
      display_order: 3,
      is_active: true,
    },
  ]

  const getVisibleSongs = () => {
    if (songs.length === 0) return []
    if (songs.length === 1) return [songs[0]]
    if (songs.length === 2) return [songs[currentIndex], songs[(currentIndex + 1) % songs.length]]

    // Show 3 songs: previous, current, next
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length
    const nextIndex = (currentIndex + 1) % songs.length

    return [
      { song: songs[prevIndex], position: "left" },
      { song: songs[currentIndex], position: "center" },
      { song: songs[nextIndex], position: "right" },
    ]
  }

  if (loading) {
    return (
      <section id="music" className="py-8 sm:py-12 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-white text-lg">Loading music...</div>
          </div>
        </div>
      </section>
    )
  }

  const visibleSongs = getVisibleSongs()

  return (
    <section id="music" className="py-8 sm:py-12 bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white mb-2">
            Our <span className="text-white">Music</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto">Latest tracks from MX2Twins</p>
        </div>

        <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-4">
            <i className="fab fa-spotify text-green-500 text-xl mr-2"></i>
            <h3 className="text-lg sm:text-xl font-sans font-semibold text-white">Latest Tracks</h3>
          </div>

          <div className="relative">
            {/* Navigation arrows */}
            {songs.length > 1 && (
              <>
                <Button
                  onClick={prevTrack}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-gray-800/60 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg backdrop-blur-sm border border-gray-600 w-8 h-8"
                >
                  <i className="fas fa-chevron-left text-sm"></i>
                </Button>
                <Button
                  onClick={nextTrack}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-gray-800/60 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg backdrop-blur-sm border border-gray-600 w-8 h-8"
                >
                  <i className="fas fa-chevron-right text-sm"></i>
                </Button>
              </>
            )}

            {/* Carousel container */}
            <div
              ref={carouselRef}
              className="relative h-64 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{
                touchAction: "pan-y pinch-zoom", // Allow vertical scroll but handle horizontal
              }}
            >
              {visibleSongs.map((item, index) => {
                const isCenter = item.position === "center" || songs.length === 1
                const isLeft = item.position === "left"
                const isRight = item.position === "right"

                let baseTransform = isLeft ? -192 : isRight ? 192 : 0 // 12rem = 192px
                if (isDragging) {
                  baseTransform += dragOffset * 0.5 // Reduce sensitivity for smoother feel
                }

                return (
                  <div
                    key={`${item.song.id}-${index}`}
                    className={`absolute transition-all duration-300 ease-out ${
                      isCenter ? "z-20 scale-100 opacity-100" : "z-10 scale-75 opacity-30"
                    } ${isDragging ? "transition-none" : ""}`}
                    style={{
                      transform: `translateX(${baseTransform}px) scale(${isCenter ? 1 : 0.75})`,
                    }}
                  >
                    <div className="w-72 h-40 rounded-lg overflow-hidden pointer-events-none">
                      <iframe
                        src={convertToSpotifyEmbed(item.song.spotify_embed_url)}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowTransparency={true}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="w-full h-full"
                        title={`${item.song.title} by ${item.song.artist}`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Dot indicators */}
            {songs.length > 1 && (
              <div className="flex justify-center space-x-2 mt-4">
                {songs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentIndex ? "bg-green-500" : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <Button className="bg-white hover:bg-gray-200 text-black font-semibold text-sm px-6 py-2 shadow-lg" asChild>
            <a
              href="https://open.spotify.com/artist/3wJT41WhEMtdLC77XiqC8N?si=qkaoEzBKTDOKCcxciYS5-Q"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-spotify mr-2"></i>
              Listen on Spotify
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
