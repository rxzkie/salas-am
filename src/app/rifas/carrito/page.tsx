"use client"

import Image from "next/image"
import Link from "next/link"
import { FormEvent, useEffect, useState } from "react"
import { clearCart, readCart, writeCart, type Cart } from "@/lib/cart"
import { publicApi } from "@/lib/public-api"
import { money } from "@/lib/raffle"

type CheckoutResponse = {
  initPoint: string
  sandboxInitPoint: string
  mode: "sandbox" | "production"
}

export default function CarritoPage() {
  const [cart, setCart] = useState<Cart | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setCart(readCart())
    setReady(true)
  }, [])

  function remove(number: number) {
    if (!cart) return
    const next = { ...cart, numbers: cart.numbers.filter((item) => item !== number) }
    if (!next.numbers.length) {
      clearCart()
      setCart(null)
      return
    }
    writeCart(next)
    setCart(next)
  }

  async function pay(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!cart?.numbers.length) return
    const form = new FormData(event.currentTarget)
    setLoading(true)
    setError("")
    try {
      const result = await publicApi<CheckoutResponse>("/payments/checkout", {
        method: "POST",
        body: JSON.stringify({
          raffleId: cart.raffleId,
          numbers: cart.numbers,
          buyer: {
            name: String(form.get("name")),
            email: String(form.get("email")),
            phone: String(form.get("phone")),
          },
        }),
      })
      const url =
        result.mode === "sandbox"
          ? result.sandboxInitPoint || result.initPoint
          : result.initPoint || result.sandboxInitPoint
      if (!url) throw new Error("No se pudo abrir el pago")
      window.location.href = url
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo pagar")
      setLoading(false)
    }
  }

  if (!ready) {
    return (
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-6">
        <div className="h-44 animate-pulse rounded-[1.5rem] bg-[#e8eef5]" />
      </main>
    )
  }

  if (!cart?.numbers.length) {
    return (
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-10 sm:px-6">
        <h1 className="font-[family-name:var(--font-lora)] text-3xl text-[#c47a2c]">Carrito</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#3d4d6b]">Todavía no eliges números.</p>
        <Link href="/rifas" className="mt-6 inline-flex h-12 items-center rounded-full bg-[#14233a] px-6 text-sm font-semibold text-white">
          Ver rifas
        </Link>
      </main>
    )
  }

  const total = cart.ticketPrice * cart.numbers.length
  const numbers = [...cart.numbers].sort((a, b) => a - b)

  return (
    <main className="mx-auto grid w-full max-w-6xl flex-1 gap-4 px-4 pt-5 pb-10 sm:px-6 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      <section className="overflow-hidden rounded-[1.5rem] border border-[#d7e6f2] bg-white shadow-[0_18px_40px_-28px_rgba(20,35,58,0.45)]">
        <div className="relative h-40 sm:h-48">
          <Image src="/rifa-default.jpg" alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14233a] via-[#14233a]/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="text-xs font-semibold tracking-[0.16em] text-[#f3d2a4] uppercase">Carrito</p>
            <h1 className="mt-1 font-[family-name:var(--font-lora)] text-3xl leading-tight text-white">
              {cart.title}
            </h1>
            <p className="mt-1 text-sm text-white/80">{cart.prize}</p>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm font-medium text-[#5a6d86]">Tus números</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {numbers.map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => remove(number)}
                className="inline-flex h-12 items-center gap-2 rounded-2xl bg-[#14233a] px-3 text-white"
              >
                <span className="min-w-6 text-base font-semibold">{number}</span>
                <span className="text-xs text-white/70">Quitar</span>
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-[#e6eef5] pt-4">
            <span className="text-sm text-[#5a6d86]">{numbers.length} × {money(cart.ticketPrice)}</span>
            <span className="text-xl font-semibold text-[#14233a]">{money(total)}</span>
          </div>
        </div>
      </section>
      <form onSubmit={pay} className="space-y-3 rounded-[1.5rem] border border-[#d7e6f2] bg-white p-4 shadow-[0_18px_40px_-28px_rgba(20,35,58,0.45)] sm:p-6">
        <h2 className="text-lg font-semibold text-[#14233a]">Pagar</h2>
        <p className="text-sm leading-relaxed text-[#5a6d86]">
          Puedes pagar con tarjeta, débito o transferencia. Es simple y seguro: Mercado Pago recibe el pago.
        </p>
        <label className="block text-sm font-medium text-[#14233a]">
          Nombre
          <input name="name" required minLength={2} autoComplete="name" className="mt-1 h-12 w-full rounded-xl border border-[#d5deee] px-3 text-base" />
        </label>
        <label className="block text-sm font-medium text-[#14233a]">
          Correo
          <input name="email" type="email" required autoComplete="email" className="mt-1 h-12 w-full rounded-xl border border-[#d5deee] px-3 text-base" />
        </label>
        <label className="block text-sm font-medium text-[#14233a]">
          Teléfono
          <input name="phone" type="tel" inputMode="tel" required minLength={8} autoComplete="tel" placeholder="9 1234 5678" className="mt-1 h-12 w-full rounded-xl border border-[#d5deee] px-3 text-base" />
        </label>
        {error ? <p className="text-sm text-[#d52b1e]">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-full bg-[#009ee3] text-base font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Un momento…" : `Pagar ${money(total)}`}
        </button>
      </form>
    </main>
  )
}
