"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { publicApi } from "@/lib/public-api"
import { money, type Raffle } from "@/lib/raffle"

export function RifaAnuncio() {
  const [raffle, setRaffle] = useState<Raffle | null>(null)

  useEffect(() => {
    publicApi<Raffle[]>("/raffles")
      .then((raffles) => setRaffle(raffles.find((item) => item.status === "ACTIVE") ?? null))
      .catch(() => setRaffle(null))
  }, [])

  if (!raffle) return null

  const sold = raffle._count?.tickets ?? 0
  const left = raffle.totalTickets - sold

  return (
    <section className="bg-[#14233a] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between md:py-8">
        <div className="flex min-w-0 items-center gap-4">
          <div className="relative hidden size-20 shrink-0 overflow-hidden rounded-2xl sm:block">
            <Image src="/rifa-default.jpg" alt="" fill sizes="80px" className="object-cover" />
          </div>
          <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.16em] text-[#c47a2c] uppercase">
            Rifa a la venta
          </p>
          <h2 className="mt-1 font-[family-name:var(--font-lora)] text-2xl sm:text-3xl">
            {raffle.title}
          </h2>
          <p className="mt-2 text-sm text-white/80 sm:text-base">
            {raffle.prize} · {money(raffle.ticketPrice)} el número · {left} disponibles
          </p>
          </div>
        </div>
        <Link
          href={`/rifas/${raffle.id}`}
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-[#c47a2c] px-6 text-sm font-semibold text-white hover:bg-[#b36b22]"
        >
          Comprar número
        </Link>
      </div>
    </section>
  )
}
