import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Senha de Acesso",
      credentials: {
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.password === process.env.ADMIN_PASSWORD) {
          return { id: "1", name: "Administrador", email: "admin@destinos.com" }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAdmin = nextUrl.pathname.startsWith("/admin")
      
      if (isOnAdmin) {
        if (isLoggedIn) return true
        return false // Redirect to login
      }
      return true
    },
  },
})
