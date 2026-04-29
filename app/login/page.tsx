"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Lock, Plane, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  async function handleLogin(e?: React.FormEvent) {
    e?.preventDefault()
    if (!password) return
    
    setLoading(true)
    setError("")

    const result = await signIn("credentials", {
      password,
      redirect: false,
    })

    if (result?.error) {
      setError("Senha incorreta. Tente novamente.")
      setLoading(false)
    } else {
      router.push("/admin")
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2560&auto=format&fit=crop')`,
        }}
      />
      <div className="bg-slate-950/70 absolute inset-0 backdrop-blur-sm" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
          
          {/* Logo / Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 border border-white/20 rounded-2xl mb-4">
              <Plane className="h-8 w-8 text-white" />
            </div>
            <img 
              src="/logo-destino.png" 
              alt="Destinos dos Sonhos" 
              className="w-40 h-auto object-contain mx-auto mb-2 brightness-0 invert drop-shadow-md" 
            />
            <p className="text-white/60 text-sm mt-3">Painel de Gestão — Acesso Restrito</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Senha de Acesso</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError("") }}
                  className="w-full pl-10 pr-12 py-3.5 bg-white/5 border border-white/20 rounded-2xl text-white text-lg placeholder:text-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 animate-in fade-in zoom-in duration-300">
                <p className="text-red-400 text-sm font-medium text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Entrando...
                </span>
              ) : (
                "Acessar Painel"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-white/30 text-xs mt-8">
            Sistema protegido • Destinos dos Sonhos © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  )
}
