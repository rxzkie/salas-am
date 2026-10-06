"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { publicApi } from "@/lib/public-api"
import { money, type Raffle } from "@/lib/raffle"

export default function RifasPage() {
  const [raffles, setRaffles] = useState<Raffle[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    publicApi<Raffle[]>("/raffles")
      .then((items) => setRaffles(items.filter((item) => item.status === "ACTIVE")))
      .catch((err: Error) => setError(err.message))
  }, [])

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="font-[family-name:var(--font-lora)] text-3xl text-[#c47a2c] sm:text-4xl">
        Rifas activas
      </h1>
      <p className="mt-2 max-w-xl text-sm text-[#3d4d6b] sm:text-base">
        Elige tus números, revísalos en el carrito y paga con Mercado Pago.
      </p>
      {error ? <p className="mt-4 text-sm text-[#d52b1e]">{error}</p> : null}
      <div className="mt-6 grid gap-4">
        {raffles.map((raffle) => {
          const left = raffle.totalTickets - (raffle._count?.tickets ?? 0)
          return (
            <Link
              key={raffle.id}
              href={`/rifas/${raffle.id}`}
              className="rounded-2xl border border-[#d7e6f2] bg-white p-4 sm:p-6"
            >
              <p className="text-lg font-semibold text-[#14233a]">{raffle.title}</p>
              <p className="mt-1 text-sm text-[#3d4d6b]">{raffle.prize}</p>
              <p className="mt-3 text-sm">
                {money(raffle.ticketPrice)} · {left} números disponibles
              </p>
            </Link>
          )
        })}
        {!error && raffles.length === 0 ? (
          <p className="text-sm text-[#3d4d6b]">No hay rifas activas por ahora.</p>
        ) : null}
      </div>
    </main>
  )
}
