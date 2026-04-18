"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Instagram } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contato" className="py-24 md:py-32 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
              Vamos conversar sobre sua próxima viagem?
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Se você sente que está na hora de viajar com mais tranquilidade e propósito, estou aqui para te ajudar
            </p>
          </div>

          <Card className="p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Seu nome</label>
                  <Input placeholder="Como você gosta de ser chamado?" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">E-mail</label>
                  <Input type="email" placeholder="seu@email.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Telefone (WhatsApp)</label>
                <Input placeholder="(00) 00000-0000" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Conte um pouco sobre sua viagem dos sonhos</label>
                <Textarea
                  placeholder="Para onde você sonha ir? O que você busca nesta viagem? Quando está pensando em viajar?"
                  rows={6}
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-secondary hover:bg-secondary/90 text-white text-lg py-6"
              >
                Começar a planejar minha viagem
              </Button>
            </form>

            <div className="mt-12 pt-8 border-t">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
                <a
                  href="mailto:Marimoymd@gmail.com"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Marimoymd@gmail.com
                </a>
                <a href="tel:+5515991129944" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  (15) 99112-9944
                </a>
                <a
                  href="https://instagram.com"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  @destinosdossonhos
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
