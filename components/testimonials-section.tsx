import { Card } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    text: "A Mariana não só planejou nossa lua de mel, ela entendeu exatamente o que precisávamos naquele momento. Foi mágico do início ao fim.",
    author: "Carolina & André",
    location: "Grécia, 2024",
  },
  {
    text: "Viajei sozinha pela primeira vez e estava insegura. A Mariana me passou tanta confiança e cuidado que foi a melhor experiência da minha vida.",
    author: "Juliana Santos",
    location: "Portugal, 2024",
  },
  {
    text: "Sempre achei que viagens personalizadas eram caras demais. A Mariana mostrou que é possível viajar bem, com custo-benefício perfeito e zero preocupação.",
    author: "Rafael Mendes",
    location: "Tailândia, 2023",
  },
]

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">Quem viajou com cuidado</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Histórias reais de pessoas que confiaram seus sonhos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
              <div className="space-y-6">
                <Quote className="w-10 h-10 text-primary/30" />
                <p className="text-lg leading-relaxed italic">"{testimonial.text}"</p>
                <div className="pt-4 border-t">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
