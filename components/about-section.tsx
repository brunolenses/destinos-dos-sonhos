export function AboutSection() {
  return (
    <section id="sobre" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
            <img src="/mariana.jpg" alt="Mariana - Consultora de Viagens" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-balance leading-tight">Quem é a Mariana</h2>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Tudo começou de forma orgânica. Amigos me pediam dicas, ajuda para organizar viagens, e eu percebi que
                tinha um talento natural para entender o que cada pessoa realmente precisava naquele momento.
              </p>
              <p>
                Hoje, não trabalho com pacotes prontos. Trabalho com pessoas. Escuto seus sonhos, entendo seu momento de
                vida, suas expectativas e construo a experiência perfeita considerando datas, clima, orçamento e,
                principalmente, o que vai fazer seu coração bater mais forte.
              </p>
              <p className="font-medium text-foreground">
                Do primeiro contato até o momento em que você volta para casa com a mala cheia de memórias, eu estou ao
                seu lado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
