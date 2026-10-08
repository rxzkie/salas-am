"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { firebaseAuth } from "@/lib/firebase"
import { publicApi } from "@/lib/public-api"
import type { SessionUser } from "@/lib/raffle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setError("")
    setLoading(true)
    try {
      const credential = await signInWithEmailAndPassword(
        firebaseAuth,
        email.trim(),
        password,
      )
      const idToken = await credential.user.getIdToken(true)
      const user = await publicApi<SessionUser>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ idToken }),
      })
      if (user.role !== "ADMIN") {
        await signOut(firebaseAuth)
        setError("Esta cuenta no administra rifas")
        return
      }
      router.replace("/admin")
    } catch (err) {
      await signOut(firebaseAuth).catch(() => undefined)
      const code =
        err && typeof err === "object" && "code" in err ? String(err.code) : ""
      const message =
        code === "auth/invalid-credential" ||
        code === "auth/wrong-password" ||
        code === "auth/user-not-found" ||
        code === "auth/invalid-email"
          ? "Correo o contraseña incorrectos"
          : code === "auth/too-many-requests"
            ? "Demasiados intentos. Espera un momento"
            : err instanceof Error
              ? err.message
              : "No se pudo entrar"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-[linear-gradient(160deg,#14233a_0%,#1d3554_42%,#3b9fd0_100%)] px-4 py-10">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-[1.75rem] border border-white/15 bg-white p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.55)] sm:p-8"
      >
        <p className="text-xs font-semibold tracking-[0.2em] text-[#c47a2c] uppercase">
          Salas AM
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-lora)] text-3xl text-[#14233a]">
          Entrar al panel
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#5a6d86]">
          Acceso con cuenta Firebase y rol administrador.
        </p>
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 rounded-xl"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-12 rounded-xl"
              minLength={6}
              required
            />
          </div>
        </div>
        {error ? <p className="mt-4 text-sm text-[#b42318]">{error}</p> : null}
        <Button
          type="submit"
          disabled={loading}
          className="mt-6 h-12 w-full rounded-full bg-[#c47a2c] text-base font-semibold hover:bg-[#b36b22]"
        >
          {loading ? "Espera" : "Entrar"}
        </Button>
        <Link href="/" className="mt-4 block text-center text-sm text-[#5a6d86]">
          Volver al sitio
        </Link>
      </form>
    </div>
  )
}
