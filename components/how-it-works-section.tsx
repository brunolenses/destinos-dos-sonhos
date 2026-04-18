import { Heart, Calendar, Compass, Plane, Shield } from "lucide-react"
import { Card } from "@/components/ui/card"

const steps = [
  {
    icon: Heart,
    title: "Entendimento",
    description:
      "Conversamos sobre o que você busca nesta viagem. Qual o objetivo? Relaxar? Aventura? Conexão? Romance?",
  },
  {
    icon: Calendar,
    title: "Análise",
    description:
      "Avalio as melhores datas considerando clima, alta temporada, eventos locais e seu orçamento disponível",
  },
  {
    icon: Compass,
    title: "Curadoria",
    description: "Seleciono os destinos e experiências que mais fazem sentido para o seu momento e expectativas",
  },
  {
    icon: Plane,
    title: "Organização",
    description: "Cuido de passagens, hospedagem, passeios, transfers e todos os detalhes que transformam a viagem",
  },
  {
    icon: Shield,
    title: "Suporte",
    description: "Estou disponível antes, durante e depois da viagem. Sua tranquilidade é minha prioridade",
  },
]

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
            Como funciona o planejamento
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Um processo natural e humano, pensado para você viajar com segurança e propósito
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow border-muted">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
