import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { DestinationsSection } from "@/components/destinations-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <DestinationsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
