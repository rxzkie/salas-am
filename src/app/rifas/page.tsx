"use client"

import Image from "next/image"
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
      <p className="text-xs font-semibold tracking-[0.18em] text-[#c47a2c] uppercase">Salas AM</p>
      <h1 className="mt-2 font-[family-name:var(--font-lora)] text-3xl text-[#14233a] sm:text-5xl">
        Rifas activas
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#3d4d6b] sm:text-base">
        Elige tus números, revísalos en el carrito y paga con Mercado Pago.
      </p>
      {error ? <p className="mt-4 text-sm text-[#d52b1e]">{error}</p> : null}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {raffles.map((raffle) => {
          const sold = raffle._count?.tickets ?? 0
          const left = Math.max(raffle.totalTickets - sold, 0)
          const pct = Math.round((sold / Math.max(raffle.totalTickets, 1)) * 100)
          return (
            <Link
              key={raffle.id}
              href={`/rifas/${raffle.id}`}
              className="group overflow-hidden rounded-[1.75rem] border border-[#d7e6f2] bg-white shadow-[0_18px_40px_-28px_rgba(20,35,58,0.55)] transition hover:-translate-y-0.5 hover:border-[#c47a2c]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/rifa-default.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14233a] via-[#14233a]/25 to-transparent" />
                <div className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#c47a2c]">
                  A la venta
                </div>
                <div className="absolute right-3 bottom-3 left-3">
                  <h2 className="font-[family-name:var(--font-lora)] text-2xl leading-tight text-white sm:text-3xl">
                    {raffle.title}
                  </h2>
                </div>
              </div>
              <div className="space-y-4 p-4 sm:p-5">
                <p className="text-sm leading-relaxed text-[#3d4d6b] sm:text-base">{raffle.prize}</p>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-semibold text-[#14233a]">{money(raffle.ticketPrice)} el número</span>
                    <span className="text-[#5a6d86]">{left} disponibles</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#e8eef5]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#3b9fd0,#c47a2c)]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <span className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#14233a] text-sm font-semibold text-white group-hover:bg-[#c47a2c]">
                  Elegir números
                </span>
              </div>
            </Link>
          )
        })}
      </div>
      {!error && raffles.length === 0 ? (
        <p className="mt-8 text-sm text-[#3d4d6b]">No hay rifas activas por ahora.</p>
      ) : null}
    </main>
  )
}
