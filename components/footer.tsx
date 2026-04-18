export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center">
              <img src="/logo.png" alt="Destinos dos Sonhos" className="h-12 brightness-0 invert" />
            </div>
            <div className="text-center md:text-right space-y-2">
              <p className="text-sm opacity-90">© 2026 Destinos dos Sonhos. Todos os direitos reservados.</p>
              <p className="text-xs opacity-70">Planejamento de viagens personalizado com carinho e dedicação</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
