"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  Filter,
  Download,
  Settings,
  Crown,
  ChevronRight,
} from "lucide-react"

export function DashboardHome() {
  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { title: "Dashboard Visitas", value: "2,847", change: "+12%", icon: Users, color: "text-blue-400" },
          { title: "Vendas Ativas", value: "156", change: "+8%", icon: TrendingUp, color: "text-green-400" },
          { title: "Receita", value: "R$ 89.2K", change: "+23%", icon: DollarSign, color: "text-yellow-400" },
          { title: "Cotações IA", value: "24", change: "+5%", icon: Calendar, color: "text-purple-400" },
        ].map((stat, index) => (
          <Card
            key={index}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 transition-all duration-700 ease-out hover:scale-[1.02] hover:bg-white/15"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className={`text-sm ${stat.color}`}>{stat.change}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Contacts and Sales Target Cards */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Vendas Recentes 👥</h3>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost" className="text-white/80 hover:bg-white/10">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
              <Button size="sm" variant="ghost" className="text-white/80 hover:bg-white/10">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                name: "Sarah Johnson",
                phone: "+55 (11) 91234-5678",
                company: "Pacote Azul Viagens",
                status: "Emitido",
                value: "R$ 12.500",
                avatar: "SJ",
              },
              {
                name: "Michael Chen",
                phone: "+55 (11) 98765-4321",
                company: "Passagem Latam",
                status: "Pendente",
                value: "R$ 8.200",
                avatar: "MC",
              },
              {
                name: "Emily Rodriguez",
                phone: "+55 (21) 94567-8901",
                company: "Cruzeiro Agaxtur",
                status: "Emitido",
                value: "R$ 15.700",
                avatar: "ER",
              },
            ].map((contact, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-white/20 text-white text-sm font-medium">
                      {contact.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm">{contact.name}</p>
                        <p className="text-xs text-white/60">
                          {contact.company} • {contact.phone}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-bold text-white text-sm">{contact.value}</p>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            contact.status === "Emitido"
                              ? "bg-green-500/20 text-green-400 border-green-400/30"
                              : "bg-blue-500/20 text-blue-400 border-blue-400/30"
                          }`}
                        >
                          {contact.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Meta de Vendas 🎯</h3>
            <Button size="sm" variant="ghost" className="text-white/80 hover:bg-white/10">
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Monthly Target Progress */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">Meta Mensal de Vendas</span>
                <span className="text-white font-semibold">R$ 125K</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full"
                  style={{ width: "68%" }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-400">R$ 85K alcançados</span>
                <span className="text-white/60">68%</span>
              </div>
            </div>

            {/* Quarterly Target Progress */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/80 text-sm">Meta de Milhas</span>
                <span className="text-white font-semibold">1M Milhas</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-yellow-400">450K acumuladas</span>
                <span className="text-white/60">45%</span>
              </div>
            </div>

            {/* Days Remaining */}
            <div className="bg-white/5 rounded-xl p-4 text-center mt-6">
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-white/60 text-sm">Dias para fechar o mês</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Full-width Premium Upgrade Banner */}
      <Card className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center justify-center w-16 h-16 bg-white/20 border border-white/30 rounded-2xl">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Desbloqueie o Gemini Advanced</h3>
              <p className="text-white/80 text-lg mb-3">
                Preencha tarifas de milhas e consolide vendas automaticamente pelo Whatsapp.
              </p>
            </div>
          </div>
          <div className="text-right space-y-4">
            <Button
              size="lg"
              className="bg-white/20 hover:bg-white/30 border border-white/30 hover:border-white/40 text-white transition-all duration-700 ease-out hover:scale-[1.02] px-8 py-3 text-lg font-semibold"
            >
              Integrar Agora
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    </>
  )
}
