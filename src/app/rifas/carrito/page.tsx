"use client"

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
      if (!url) throw new Error("Mercado Pago no devolvió el pago")
      window.location.href = url
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo pagar")
      setLoading(false)
    }
  }

  if (!ready) return <main className="flex-1" />

  if (!cart?.numbers.length) {
    return (
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
        <h1 className="font-[family-name:var(--font-lora)] text-3xl text-[#c47a2c]">Carrito</h1>
        <p className="mt-3 text-sm text-[#3d4d6b]">Todavía no eliges números.</p>
        <Link href="/rifas" className="mt-6 inline-flex h-12 items-center rounded-full bg-[#14233a] px-6 text-sm font-semibold text-white">
          Ver rifas
        </Link>
      </main>
    )
  }

  const total = cart.ticketPrice * cart.numbers.length

  return (
    <main className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[1fr_0.9fr]">
      <section>
        <h1 className="font-[family-name:var(--font-lora)] text-3xl text-[#c47a2c]">Carrito</h1>
        <p className="mt-2 text-sm text-[#3d4d6b]">{cart.title}</p>
        <ul className="mt-5 divide-y divide-[#e6eef5] rounded-2xl border border-[#d7e6f2] bg-white">
          {[...cart.numbers].sort((a, b) => a - b).map((number) => (
            <li key={number} className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="font-medium">Número {number}</span>
              <span className="text-sm">{money(cart.ticketPrice)}</span>
              <button type="button" className="h-11 px-2 text-sm text-[#d52b1e]" onClick={() => remove(number)}>
                Quitar
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-lg font-semibold">Total {money(total)}</p>
      </section>
      <form onSubmit={pay} className="h-fit space-y-4 rounded-2xl border border-[#d7e6f2] bg-white p-4 sm:p-6">
        <h2 className="text-lg font-semibold">Pagar con Mercado Pago</h2>
        <label className="block text-sm">
          Nombre
          <input name="name" required minLength={2} className="mt-1 h-12 w-full rounded-xl border border-[#d5deee] px-3" />
        </label>
        <label className="block text-sm">
          Correo
          <input name="email" type="email" required className="mt-1 h-12 w-full rounded-xl border border-[#d5deee] px-3" />
        </label>
        <label className="block text-sm">
          Teléfono
          <input name="phone" type="tel" inputMode="tel" required minLength={8} placeholder="9 1234 5678" className="mt-1 h-12 w-full rounded-xl border border-[#d5deee] px-3" />
        </label>
        {error ? <p className="text-sm text-[#d52b1e]">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-full bg-[#009ee3] text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Redirigiendo" : "Pagar"}
        </button>
      </form>
    </main>
  )
}
