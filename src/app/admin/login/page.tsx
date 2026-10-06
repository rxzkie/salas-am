"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth"
import { firebaseAuth } from "@/lib/firebase"
import { api } from "@/lib/api"
import type { SessionUser } from "@/lib/raffle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminLoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<"login" | "register">("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setError("")
    setLoading(true)
    try {
      const credential =
        mode === "register"
          ? await createUserWithEmailAndPassword(firebaseAuth, email.trim(), password)
          : await signInWithEmailAndPassword(firebaseAuth, email.trim(), password)
      if (mode === "register" && name.trim()) {
        await updateProfile(credential.user, { displayName: name.trim() })
      }
      const idToken = await credential.user.getIdToken(true)
      const user = await api<SessionUser>("/auth/login", {
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
      const message = err instanceof Error ? err.message : "No se pudo entrar"
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
          {mode === "login" ? "Entrar al panel" : "Crear cuenta admin"}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#5a6d86]">
          La primera cuenta queda como administradora.
        </p>
        <div className="mt-6 space-y-4">
          {mode === "register" ? (
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="h-12 rounded-xl"
                required
              />
            </div>
          ) : null}
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
              autoComplete={mode === "login" ? "current-password" : "new-password"}
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
          {loading ? "Espera" : mode === "login" ? "Entrar" : "Crear cuenta"}
        </Button>
        <button
          type="button"
          className="mt-4 h-11 w-full text-sm font-medium text-[#3b9fd0]"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login")
            setError("")
          }}
        >
          {mode === "login" ? "Crear cuenta" : "Ya tengo cuenta"}
        </button>
        <Link href="/" className="mt-1 block text-center text-sm text-[#5a6d86]">
          Volver al sitio
        </Link>
      </form>
    </div>
  )
}
