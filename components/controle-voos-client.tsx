"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PlaneTakeoff, Search, Plus, Filter, MoreHorizontal } from "lucide-react"

export function ControleVoosClient() {
  const [searchTerm, setSearchTerm] = useState("")

  const voos = [
    {
      id: 1,
      passageiro: "Marco Antonio Souza",
      cpf: "123.456.789-00",
      ida: "18/02 14:00",
      volta: "13/03 16:35",
      origem: "Guarulhos (GRU)",
      destino: "Milão (MXP)",
      localizador: "PSRHFC",
      cia: "Latam",
      status: "Concluído"
    },
    {
      id: 2,
      passageiro: "Tatiane Cordeiro Bruno",
      cpf: "360.562.108-20",
      ida: "04/04 17:25",
      volta: "08/04 19:50",
      origem: "Viracopos (VCP)",
      destino: "Foz do Iguaçu (IGU)",
      localizador: "PS7WJE",
      cia: "Azul",
      tipo: "Pacote",
      status: "Agendado"
    },
    {
      id: 3,
      passageiro: "Simone Carla da Rosa",
      cpf: "156.629.018-05",
      ida: "14/03 16:35",
      volta: "22/03 10:35",
      origem: "Viracopos (VCP)",
      destino: "Natal (NAT)",
      localizador: "ISSISH",
      cia: "Latam",
      status: "Cancelado"
    },
    {
      id: 4,
      passageiro: "Igor Leandro Aleixo",
      cpf: "434.479.578-40",
      ida: "23/03 09:50",
      volta: "28/03 17:45",
      origem: "Viracopos (VCP)",
      destino: "Galeão (GIG)",
      localizador: "OJZXCO",
      cia: "Smiles",
      status: "Agendado"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <PlaneTakeoff className="h-8 w-8 text-indigo-400" />
            Controle de Emissões
          </h1>
          <p className="text-white/60 mt-2 text-lg max-w-2xl">
            Gestão completa de passageiros, localizadores e status de voos. (Substituindo a planilha Excel)
          </p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all duration-300 px-6 py-6 text-base font-semibold rounded-2xl border-0 shadow-lg shadow-indigo-500/25">
          <Plus className="mr-2 h-5 w-5" /> Nova Emissão
        </Button>
      </div>

      <Card className="backdrop-blur-xl bg-slate-900/60 border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Barra de Busca e Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
            <Input 
              placeholder="Buscar por passageiro, CPF ou Localizador..." 
              className="pl-10 h-12 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:border-indigo-400/50 focus:bg-white/10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-12 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-2xl px-6">
            <Filter className="mr-2 h-4 w-4" /> Filtros
          </Button>
        </div>

        {/* Tabela Style Glass */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/60 text-sm font-medium">
                <th className="pb-4 pl-4">Passageiro & CPF</th>
                <th className="pb-4">Trecho (Ida / Volta)</th>
                <th className="pb-4">Datas</th>
                <th className="pb-4">Cia Aérea</th>
                <th className="pb-4">Localizador</th>
                <th className="pb-4">Status</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {voos.map((voo) => (
                <tr key={voo.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-white/10">
                        <AvatarFallback className="bg-indigo-500/20 text-indigo-300 font-bold">
                          {voo.passageiro.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-white whitespace-nowrap">{voo.passageiro}</p>
                        <p className="text-xs text-white/40 font-mono">{voo.cpf}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <p className="text-white">{voo.origem}</p>
                    <p className="text-white/60 text-xs mt-1 text-indigo-300">✈ {voo.destino}</p>
                  </td>
                  <td className="py-4">
                    <p className="text-white font-medium">{voo.ida}</p>
                    <p className="text-white/50 text-xs mt-1">Volta: {voo.volta}</p>
                  </td>
                  <td className="py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white border border-white/10">
                      {voo.cia}
                    </span>
                    {voo.tipo === "Pacote" && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-purple-500/20 text-purple-300">
                        PKT
                      </span>
                    )}
                  </td>
                  <td className="py-4">
                    <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 inline-block">
                      <p className="font-mono text-white font-bold tracking-wider">{voo.localizador}</p>
                    </div>
                  </td>
                  <td className="py-4">
                    <Badge 
                      variant="outline" 
                      className={`
                        ${voo.status === 'Concluído' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : ''}
                        ${voo.status === 'Agendado' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : ''}
                        ${voo.status === 'Cancelado' ? 'bg-red-500/20 text-red-400 border-red-500/30' : ''}
                        px-3 py-1
                      `}
                    >
                      {voo.status}
                    </Badge>
                  </td>
                  <td className="py-4 text-right pr-4">
                    <Button variant="ghost" size="icon" className="text-white/40 hover:text-white hover:bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
