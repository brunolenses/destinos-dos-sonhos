export function DestinationsSection() {
  const destinations = [
    {
      image: "/santorini-sunset.png",
      title: "Europa Clássica",
      description: "História, arte e gastronomia",
    },
    {
      image: "/maldives-bungalows.png",
      title: "Ilhas Paradisíacas",
      description: "Descanso e contemplação",
    },
    {
      image: "/patagonia-mountains-hiking-adventure.jpg",
      title: "Aventuras",
      description: "Natureza e adrenalina",
    },
    {
      image: "/tokyo-japan-modern-city-neon-lights.jpg",
      title: "Ásia Fascinante",
      description: "Cultura e modernidade",
    },
    {
      image: "/african-safari-elephants-sunset.jpg",
      title: "Safari Africano",
      description: "Vida selvagem única",
    },
    {
      image: "/eiffel-tower-romantic-evening.png",
      title: "Romântico",
      description: "Conexão e intimidade",
    },
  ]

  return (
    <section id="destinos" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">Experiências e destinos</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Não trabalho com lista fixa de pacotes. Cada viagem é única e construída especialmente para você, do jeito
            que precisa ser
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {destinations.map((dest, index) => (
            <div
              key={index}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={dest.image || "/placeholder.svg"}
                alt={dest.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-semibold mb-2">{dest.title}</h3>
                <p className="text-white/90">{dest.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
