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
    title: "Estamos confirmando el pago",
    text: "Si ya pagaste, tus números quedan a tu nombre en cuanto se confirme.",
  },
  fallo: {
    title: "Pago no realizado",
    text: "No se descontó el dinero. Puedes volver a elegir tus números.",
  },
  pendiente: {
    title: "Pago en proceso",
    text: "El banco todavía está confirmando. Tus números siguen apartados.",
  },
} as const

function clean(value: string | null) {
  if (!value || value === "null" || value === "undefined") return ""
  return value
}

function settled(status: string) {
  if (status === "PAID") {
    return {
      title: "Pago listo",
      text: "Listo. Tus números ya quedaron a tu nombre.",
    }
  }
  if (status === "PENDING") {
    return {
      title: "Pago en proceso",
      text: "Todavía se está confirmando. Los números siguen apartados para ti.",
    }
  }
  if (status === "REFUNDED") {
    return {
      title: "Pago devuelto",
      text: "El dinero se devolvió y los números volvieron a quedar libres.",
    }
  }
  return {
    title: "Pago no realizado",
    text: "No se completó el pago. Los números volvieron a quedar libres.",
  }
}

export function PaymentResult({ kind }: { kind: keyof typeof copy }) {
  const params = useSearchParams()
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState("")
  const info = result ? settled(result.status) : copy[kind]

  useEffect(() => {
    const paymentId = clean(params.get("payment_id")) || clean(params.get("collection_id"))
    const purchaseId = clean(params.get("external_reference"))
    if (!paymentId && !purchaseId) {
      setError("No encontramos el comprobante. Si alcanzaste a pagar, escríbenos con tu correo.")
      return
    }
    publicApi<Result>("/payments/confirm", {
      method: "POST",
      body: JSON.stringify(paymentId ? { paymentId } : { purchaseId }),
    })
      .then((next) => {
        setResult(next)
        if (next.status === "PAID" || next.status === "CANCELLED" || next.status === "REFUNDED" || next.status === "PENDING") {
          clearCart()
        }
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
