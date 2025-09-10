import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { MusicSection } from "@/components/music-section"
import { AboutSection } from "@/components/about-section"
import { GallerySection } from "@/components/gallery-section"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
  return (
    <main className="min-h-screen dark">
      <Navigation />
      <HeroSection />
      <MusicSection />
      <AboutSection />
      <GallerySection />
      <ContactSection />
    </main>
  )
}
