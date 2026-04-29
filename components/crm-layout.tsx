"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  Search,
  Bell,
  Settings,
  Plus,
  Phone,
  Mail,
  Calendar,
  Crown,
  LogOut,
  HelpCircle,
  ChevronRight,
  Plane,
  Calculator,
  LayoutDashboard,
  PlaneTakeoff
} from "lucide-react"

export function CRMLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard Inicial", href: "/admin" },
    { icon: Plane, label: "Cotações do Dia", href: "/admin/cotacoes" },
    { icon: Calculator, label: "Cálculos e Comissões", href: "/admin/calculos" },
    { icon: PlaneTakeoff, label: "Gestão de Emissões", href: "/admin/controle-voos" },
  ]

  return (
    <div className="h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2560&auto=format&fit=crop')`,
        }}
      />
      <div className="bg-slate-950/60 absolute inset-0 backdrop-blur-[2px] fixed" />

      <div className="relative z-10 p-6 grid grid-cols-12 gap-6 h-screen">
        {/* Left Sidebar Card */}
        <Card className="col-span-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 pb-6 h-fit flex flex-col">
          <div className="space-y-6">
            {/* Logo */}
            <div className="text-center flex justify-center items-center flex-col">
              <img 
                src="/logo-destino.png" 
                alt="Destinos dos Sonhos" 
                className="w-32 h-auto object-contain mb-1 drop-shadow-md brightness-0 invert" 
              />
              <p className="text-white/60 text-sm mt-2">Dashboard de Viagens</p>
            </div>

            {/* Main Navigation */}
            <div>
              <h4 className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-3">Painel</h4>
              <nav className="space-y-2">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <Link key={index} href={item.href} passHref>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start text-base transition-all duration-700 ease-out hover:scale-[1.02] h-11 ${
                          isActive 
                            ? "bg-white/20 text-white border border-white/30" 
                            : "text-white/80 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.label}
                      </Button>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>

          <div className="flex-shrink-0 space-y-4 pt-4 border-t border-white/10 mt-6">
            <Card className="backdrop-blur-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-2xl p-4">
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <Crown className="h-8 w-8 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">Xperia AI</h4>
                  <p className="text-white/70 text-sm">Sistema Integrado</p>
                </div>
              </div>
            </Card>

            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-base text-white/80 hover:bg-white/10 hover:text-white transition-all duration-700 ease-out hover:scale-[1.02] h-11"
              >
                <Settings className="mr-3 h-5 w-5" />
                Configurações
              </Button>
              <Button
                variant="ghost"
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full justify-start text-base text-white/80 hover:bg-white/10 hover:text-white transition-all duration-700 ease-out hover:scale-[1.02] h-11"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sair
              </Button>
            </div>
          </div>
        </Card>

        {/* Main Content Area */}
        <div className="col-span-8 space-y-6 h-screen overflow-y-auto pb-24">
          {/* Header Card */}
          <Card className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">Olá Administrador 👋</h2>
                <p className="text-white/60">Sistema dinâmico de precificação e vendas ativo.</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                  <Input
                    placeholder="Buscar reservas..."
                    className="pl-10 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/10"
                  />
                </div>
                <Button size="icon" variant="ghost" className="text-white/80 hover:bg-white/10 hover:text-white">
                  <Bell className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Children Inject Area */}
          {children}
        </div>

        {/* Right Sidebar Card */}
        <Card className="col-span-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 pb-6 h-fit">
          <div className="space-y-6">
            {/* AI Xperia Card */}
            <Card className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4">
              <div className="text-center space-y-3">
                <div className="text-2xl">🤖</div>
                <div>
                  <h4 className="text-white font-semibold">Assistente Gemini</h4>
                  <p className="text-white/70 text-sm">Online</p>
                </div>
                <Button
                  size="sm"
                  className="w-full bg-white/20 hover:bg-white/30 border border-white/30 hover:border-white/40 text-white transition-all duration-700 ease-out hover:scale-[1.02]"
                >
                  Consultar Cotação
                </Button>
              </div>
            </Card>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Ações ⚡</h3>
              <div className="space-y-2">
                {[
                  { icon: Phone, label: "Ligar Cliente" },
                  { icon: Mail, label: "E-mail Voucher" },
                  { icon: Calendar, label: "Agendar Emissão" },
                  { icon: Plus, label: "Anotação" },
                ].map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white transition-all duration-700 ease-out hover:scale-[1.02]"
                  >
                    <action.icon className="mr-3 h-4 w-4" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Atividade 📈</h3>
              <div className="space-y-3">
                {[
                  { action: "Pacote Azul fechado", time: "2 min ago", type: "success" },
                  { action: "Voo Gol Emitido", time: "1 hour ago", type: "success" },
                  { action: "Cotação Latam IA", time: "3 hours ago", type: "info" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "success"
                          ? "bg-green-400"
                          : activity.type === "info"
                            ? "bg-blue-400"
                            : "bg-white/60"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm text-white">{activity.action}</p>
                      <p className="text-xs text-white/60">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
