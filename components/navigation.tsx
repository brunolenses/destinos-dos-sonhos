"use client"

import { useState, useEffect } from "react"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logo.png" alt="Destinos dos Sonhos" className="h-12 md:h-14 w-auto" />
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#sobre" className="text-sm font-medium hover:text-primary transition-colors">
            Sobre
          </a>
          <a href="#como-funciona" className="text-sm font-medium hover:text-primary transition-colors">
            Como Funciona
          </a>
          <a href="#destinos" className="text-sm font-medium hover:text-primary transition-colors">
            Experiências
          </a>
          <a href="#depoimentos" className="text-sm font-medium hover:text-primary transition-colors">
            Depoimentos
          </a>
          <a
            href="#contato"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Contato
          </a>
        </div>
      </div>
    </nav>
  )
}
