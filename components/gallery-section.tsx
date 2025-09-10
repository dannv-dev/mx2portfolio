"use client"

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

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [images, setImages] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/images?section=gallery")
        if (response.ok) {
          const data = await response.json()
          setImages(data)
        }
      } catch (error) {
        console.error("Error fetching images:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  if (loading) {
    return (
      <section id="gallery" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-foreground text-lg">Loading gallery...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="gallery" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-4">
            Photo <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Behind the scenes and professional shots showcasing our journey and style
          </p>
        </div>

        {images.length === 0 ? (
          <div className="text-center text-muted-foreground">No gallery images available at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedImage(image.image_url)}
              >
                <img
                  src={image.image_url || "/placeholder.svg"}
                  alt={image.alt_text}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-heading font-bold">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for enlarged image */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <i className="fas fa-times text-2xl"></i>
              </button>
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Enlarged view"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
