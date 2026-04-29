"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp, Save, RefreshCw } from "lucide-react"
import { toast } from "sonner"

export function CotacoesClient() {
  const [loading, setLoading] = useState(false)
  const [source, setSource] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<string | null>(null)
  const [quotes, setQuotes] = useState({
    latam: "26.50",
    smiles: "14.80",
    azul: "21.00"
  })

  useEffect(() => {
    const saved = localStorage.getItem("agency_miles_quotes")
    const savedMeta = localStorage.getItem("agency_miles_meta")
    if (saved) {
      try {
        setQuotes(JSON.parse(saved))
      } catch (e) {}
    }
    if (savedMeta) {
      try {
        const meta = JSON.parse(savedMeta)
        setSource(meta.source || null)
        setLastUpdate(meta.lastUpdate || null)
      } catch (e) {}
    }
  }, [])

  const handleAIMatch = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/cotacao", { method: "POST" })
      if (!res.ok) throw new Error("Falha na API da IA")
      
      const data = await res.json()
      
      if (data.latam && data.smiles && data.azul) {
        const newQuotes = {
          latam: String(data.latam.toFixed(2)),
          smiles: String(data.smiles.toFixed(2)),
          azul: String(data.azul.toFixed(2))
        }
        const now = new Date().toLocaleString("pt-BR")
        setQuotes(newQuotes)
        setSource(data.source || "gemini_ai")
        setLastUpdate(now)
        localStorage.setItem("agency_miles_quotes", JSON.stringify(newQuotes))
        localStorage.setItem("agency_miles_meta", JSON.stringify({ source: data.source || "gemini_ai", lastUpdate: now }))
        toast.success("Cotação atualizada pela Inteligência Artificial com sucesso!")
      } else {
        throw new Error("Formato inválido retornado pela IA")
      }
    } catch (error) {
       toast.error("Erro ao buscar cotação via IA. Preencha manualmente.")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = () => {
    const now = new Date().toLocaleString("pt-BR")
    setSource("manual")
    setLastUpdate(now)
    localStorage.setItem("agency_miles_quotes", JSON.stringify(quotes))
    localStorage.setItem("agency_miles_meta", JSON.stringify({ source: "manual", lastUpdate: now }))
    toast.success("Cotações manuais salvas com sucesso!")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-yellow-400" />
            Painel de Cotação Dinâmica
          </h1>
          <p className="text-white/60 mt-2 text-lg max-w-2xl">
            Defina o valor do milheiro do dia. Use a IA para buscar o preço de balcão atual ou preencha manualmente.
          </p>
          {source && (
            <div className="flex items-center gap-3 mt-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                source === "gemini_ai" 
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" 
                  : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
              }`}>
                {source === "gemini_ai" ? "🤖 Estimativa IA (Gemini)" : "✏️ Preenchimento Manual"}
              </span>
              {lastUpdate && (
                <span className="text-white/40 text-xs">Atualizado: {lastUpdate}</span>
              )}
            </div>
          )}
        </div>
        <Button 
          onClick={handleAIMatch} 
          disabled={loading}
          className="bg-white/20 hover:bg-white/30 border border-white/30 hover:border-white/40 text-white transition-all duration-700 ease-out hover:scale-[1.02] px-6 py-6 text-base font-semibold rounded-2xl"
        >
          {loading ? <RefreshCw className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5 text-yellow-300" />}
          {loading ? "Buscando o Mercado..." : "Autopreencher com Inteligência Artificial"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 transition-all duration-700 ease-out hover:scale-[1.02] hover:bg-white/15">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Latam Pass</h3>
              <p className="text-white/60 text-sm">Valor pago por 1.000 milhas</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Cotação em Reais (R$)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 font-medium">R$</span>
                <Input 
                  value={quotes.latam}
                  onChange={e => setQuotes({...quotes, latam: e.target.value})}
                  type="number"
                  step="0.01"
                  className="pl-10 h-12 bg-white/5 border border-white/20 rounded-2xl text-white text-lg font-bold placeholder:text-white/40 focus:border-white/40 focus:bg-white/10"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 transition-all duration-700 ease-out hover:scale-[1.02] hover:bg-white/15">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Smiles (Gol)</h3>
              <p className="text-white/60 text-sm">Valor pago por 1.000 milhas</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Cotação em Reais (R$)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 font-medium">R$</span>
                <Input 
                  value={quotes.smiles}
                  onChange={e => setQuotes({...quotes, smiles: e.target.value})}
                  type="number"
                  step="0.01"
                  className="pl-10 h-12 bg-white/5 border border-white/20 rounded-2xl text-white text-lg font-bold placeholder:text-white/40 focus:border-white/40 focus:bg-white/10"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 transition-all duration-700 ease-out hover:scale-[1.02] hover:bg-white/15">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">TudoAzul</h3>
              <p className="text-white/60 text-sm">Valor pago por 1.000 milhas</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Cotação em Reais (R$)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 font-medium">R$</span>
                <Input 
                  value={quotes.azul}
                  onChange={e => setQuotes({...quotes, azul: e.target.value})}
                  type="number"
                  step="0.01"
                  className="pl-10 h-12 bg-white/5 border border-white/20 rounded-2xl text-white text-lg font-bold placeholder:text-white/40 focus:border-white/40 focus:bg-white/10"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} size="lg" className="w-full md:w-auto min-w-[200px] h-14 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0 text-white rounded-2xl text-lg font-semibold transition-all duration-700 ease-out hover:scale-[1.02]">
          <Save className="mr-2 h-5 w-5" />
          Salvar Valores do Dia
        </Button>
      </div>
    </div>
  )
}
