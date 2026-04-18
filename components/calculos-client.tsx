"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, DollarSign, Plane, AlertCircle, TrendingUp } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Fornecedor = "azul_viagens" | "agaxtur" | "europ_assistance" | "booking" | "tam_viagens" | "voe_azul" | "latam_pass" | "voe_gol" | "smiles"

export function CalculosClient() {
  const [fornecedor, setFornecedor] = useState<Fornecedor | "">("")
  const [valor, setValor] = useState("")
  const [taxas, setTaxas] = useState("")
  const [margem, setMargem] = useState("")
  const [resultado, setResultado] = useState<{ tipo: 'dinheiro' | 'milhas', valor: string, lucro: string, subtexto?: string } | null>(null)

  const isMiles = fornecedor === 'latam_pass' || fornecedor === 'smiles'

  const handleCalculate = () => {
    if (!fornecedor || !valor) return

    const v = parseFloat(valor.replace(/[^0-9.-]+/g,"")) || 0
    const taxaEmbarque = taxas ? parseFloat(taxas.replace(/[^0-9.-]+/g,"")) : 0
    const m = margem ? parseFloat(margem.replace(/[^0-9.-]+/g,"")) : 0
    
    // Ler cotações salvas (Fallback)
    const saved = localStorage.getItem("agency_miles_quotes")
    let quotes = { latam: 26.50, smiles: 14.80, azul: 21.00 }
    if (saved) {
      try {
         const parsed = JSON.parse(saved)
         quotes = {
           latam: parseFloat(parsed.latam),
           smiles: parseFloat(parsed.smiles),
           azul: parseFloat(parsed.azul)
         }
      } catch(e) {}
    }

    let lucro = 0

    if (isMiles) {
      // REGRA: Cotação de Emissão com Milhas (Ex: 80.000 milhas + R$ 80 de taxa + R$ 200 de lucro)
      const cotaBalcao = fornecedor === 'latam_pass' ? quotes.latam : quotes.smiles
      const custoMilhas = (v / 1000) * cotaBalcao
      const custoTotalCia = custoMilhas + taxaEmbarque // O que a agência vai pagar de verdade
      
      lucro = m !== 0 ? m : 150 // Se ela não colocar lucro, assume R$ 150 padrão
      const precoProCliente = custoTotalCia + lucro
      
      setResultado({ 
        tipo: 'dinheiro', 
        valor: `Preço Final Cliente: R$ ${precoProCliente.toFixed(2)}`, 
        lucro: `Lucro Líquido: R$ ${lucro.toFixed(2)}`,
        subtexto: `Custo do Voo na Agência: R$ ${custoTotalCia.toFixed(2)} (${v} pts a R$ ${cotaBalcao.toFixed(2)} + R$ ${taxaEmbarque.toFixed(2)} taxa)`
      })
    } else {
      // REGRA: Pacotes em Reais (Ex: Navio 5.000, e agência ganha '%' disso)
      let percPadrao = m !== 0 ? (m / 100) : 0.10
      
      if (fornecedor === 'europ_assistance') percPadrao = m !== 0 ? (m / 100) : 0.40
      else if (fornecedor === 'booking') percPadrao = m !== 0 ? (m / 100) : 0.12
      
      lucro = v * percPadrao
      
      setResultado({ 
        tipo: 'dinheiro', 
        valor: `Resumo da Venda: R$ ${v.toFixed(2)}`, 
        lucro: `Comissão Agência: R$ ${lucro.toFixed(2)}`,
        subtexto: `Faturamento em porcentagem: ${(percPadrao * 100).toFixed(1)}%`
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Calculator className="h-8 w-8 text-blue-400" />
            Cálculos e Comissões
          </h1>
          <p className="text-white/60 mt-2 text-lg max-w-2xl">
            Sistema inteligente de conversão e cálculo de repasse para os parceiros da agência.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-white">
            <Calculator className="h-5 w-5" /> Calculadora Dinâmica
          </h2>
          
          <p className="text-white/60 text-sm mb-6">
            Selecione o fornecedor e informe o valor da venda para obter instantaneamente o retorno exato em comissão (R$) ou bônus (Milhas).
          </p>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Nome do Fornecedor / Parceiro</label>
              <Select onValueChange={(v) => setFornecedor(v as Fornecedor)}>
                <SelectTrigger className="w-full h-12 bg-white/5 border border-white/20 rounded-2xl text-white">
                  <SelectValue placeholder="Selecione um Fornecedor" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/20 text-white">
                  <SelectItem value="voe_azul">Voe Azul (Rende Dinheiro)</SelectItem>
                  <SelectItem value="azul_viagens">Azul Viagens [Pacote/Hosp.] (Dinheiro e Milhas)</SelectItem>
                  <SelectItem value="latam_pass">Latam Pass (Rende Milhas)</SelectItem>
                  <SelectItem value="voe_gol">Voe Gol (Rende Dinheiro)</SelectItem>
                  <SelectItem value="smiles">Smiles [Prog. Gol] (Rende Milhas)</SelectItem>
                  <SelectItem value="agaxtur">Agaxtur [Cruzeiro/Aéreo] (Rende Dinheiro)</SelectItem>
                  <SelectItem value="europ_assistance">Europ Assistance [Seguro] (Rende Dinheiro)</SelectItem>
                  <SelectItem value="booking">Booking / Hoteis (Rende Dinheiro)</SelectItem>
                  <SelectItem value="tam_viagens">CVC / Tam Viagens (Rende Dinheiro)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                {isMiles ? "Quantidade Total de Milhas (Ex: 80000)" : "Valor do Pacote / Venda em Real (R$)"}
              </label>
              <Input 
                type="number" 
                placeholder={isMiles ? "Ex: 80000" : "Ex: 4500.00"} 
                value={valor}
                onChange={e => setValor(e.target.value)}
                className="h-12 bg-white/5 border border-white/20 rounded-2xl text-white text-lg placeholder:text-white/40 focus:border-white/40 focus:bg-white/10"
              />
            </div>

            {isMiles && (
              <div className="space-y-2 animate-in fade-in zoom-in duration-300">
                <label className="text-sm font-medium text-white/80">Taxa de Embarque Pagas em R$</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">R$</span>
                  <Input 
                    type="number" 
                    placeholder="Ex: 80.50" 
                    value={taxas}
                    onChange={e => setTaxas(e.target.value)}
                    className="pl-10 h-12 bg-white/5 border border-white/20 rounded-2xl text-white text-lg placeholder:text-white/40 focus:border-white/40 focus:bg-white/10"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-white/80">
                  {isMiles ? "Sua Comissão Fixa Embutida (R$)" : "Comissão da Operadora (%)"}
                </label>
                <span className="text-xs text-yellow-400 flex items-center gap-1">
                   <AlertCircle className="h-3 w-3" /> Deixe branco p/ base padrão
                </span>
              </div>
              <div className="relative">
                {isMiles && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">R$</span>}
                <Input 
                  type="number" 
                  placeholder={isMiles ? "Ex: 200 (Lucro da Agência)" : "Ex: 15 (Porcentagem)"} 
                  value={margem}
                  onChange={e => setMargem(e.target.value)}
                  className={`${isMiles ? 'pl-10' : ''} h-12 bg-white/5 border border-white/20 rounded-2xl text-white text-lg placeholder:text-white/40 focus:border-white/40 focus:bg-white/10`}
                />
              </div>
            </div>

            <Button 
              onClick={handleCalculate}
              disabled={!fornecedor || !valor}
              className="w-full h-14 mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 transition-all duration-700 ease-out hover:scale-[1.02] text-lg font-semibold rounded-2xl"
            >
              Calcular Retorno
            </Button>
          </div>
        </Card>

        {/* Card for Results */}
        <Card className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-center items-center text-center min-h-[400px]">
          {!resultado ? (
            <div className="opacity-50 flex flex-col items-center">
              <Calculator className="h-20 w-20 text-white/40 mb-4" />
              <p className="text-white text-lg">Preencha os dados e clique em calcular para visualizar seu retorno.</p>
            </div>
          ) : (
            <div className="w-full animate-in fade-in zoom-in duration-500">
              <div className="mb-8">
                <span className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full mb-4 ring-4 ring-white/5">
                  {resultado.tipo === 'dinheiro' ? (
                     <DollarSign className="h-10 w-10 text-green-400" />
                  ) : (
                     <Plane className="h-10 w-10 text-blue-400" />
                  )}
                </span>
                <p className="text-sm font-semibold uppercase tracking-wider text-white/60">
                  Resumo da Operação
                </p>
                <h3 className="text-2xl font-bold mt-2 text-white">{resultado.valor}</h3>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-2xl">
                 <p className="text-sm text-green-200 uppercase font-semibold mb-1 tracking-wider">LUCRO ESTIMADO / COMISSÃO LÍQUIDA</p>
                 <p className="text-4xl font-black text-green-400 drop-shadow-sm">{resultado.lucro}</p>
                 {resultado.subtexto && (
                   <p className="text-xs text-green-300/80 mt-2 font-medium">{resultado.subtexto}</p>
                 )}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
