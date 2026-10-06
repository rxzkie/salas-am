"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { clearCart } from "@/lib/cart"
import { publicApi } from "@/lib/public-api"
import { money } from "@/lib/raffle"

type Result = {
  status: string
  title: string
  numbers: number[]
  total: string
}

const copy = {
  exito: {
    title: "Pago recibido",
    text: "Si Mercado Pago aprobó el cobro, tus números quedan reservados.",
  },
  fallo: {
    title: "Pago no realizado",
    text: "Los números volvieron a estar disponibles.",
  },
  pendiente: {
    title: "Pago pendiente",
    text: "Mercado Pago todavía está confirmando. Tus números siguen reservados.",
  },
} as const

export function PaymentResult({ kind }: { kind: keyof typeof copy }) {
  const params = useSearchParams()
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState("")
  const info = copy[kind]

  useEffect(() => {
    const paymentId = params.get("payment_id") || params.get("collection_id")
    if (!paymentId) return
    publicApi<Result>("/payments/confirm", {
      method: "POST",
      body: JSON.stringify({ paymentId }),
    })
      .then((next) => {
        setResult(next)
        if (next.status === "PAID" || next.status === "CANCELLED") clearCart()
      })
      .catch((err: Error) => setError(err.message))
  }, [params])

  return (
    <main className="mx-auto w-full max-w-xl flex-1 px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-lora)] text-3xl text-[#c47a2c]">{info.title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-[#3d4d6b] sm:text-base">{info.text}</p>
      {result ? (
        <div className="mt-6 rounded-2xl border border-[#d7e6f2] bg-white p-4 text-sm">
          <p className="font-semibold">{result.title}</p>
          <p className="mt-1">Números {result.numbers.join(", ") || "—"}</p>
          <p className="mt-1">{money(result.total)}</p>
        </div>
      ) : null}
      {error ? <p className="mt-4 text-sm text-[#d52b1e]">{error}</p> : null}
      <Link href="/rifas" className="mt-8 inline-flex h-12 items-center rounded-full bg-[#14233a] px-6 text-sm font-semibold text-white">
        Volver a las rifas
      </Link>
    </main>
  )
}
