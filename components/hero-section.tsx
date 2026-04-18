"use client"

import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/aerial-view-of-turquoise-ocean-meeting-tropical-wh.jpg" alt="Vista aérea paradisíaca" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-tight text-balance">
            Viagens pensadas para o seu momento, não para um catálogo
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Planejamento personalizado que acompanha você do primeiro sonho até o retorno com memórias inesquecíveis
          </p>
          <div className="pt-4">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg rounded-full shadow-2xl"
              onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
            >
              <MapPin className="mr-2 h-5 w-5" />
              Falar com a Mariana
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  )
}
