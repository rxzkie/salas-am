"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { readCart, writeCart } from "@/lib/cart"
import { publicApi } from "@/lib/public-api"
import { money } from "@/lib/raffle"

type Board = {
  id: string
  title: string
  description: string | null
  prize: string
  ticketPrice: string
  totalTickets: number
  status: string
  sold: number[]
}

export default function RifaPage() {
  const params = useParams<{ id: string }>()
  const [board, setBoard] = useState<Board | null>(null)
  const [picked, setPicked] = useState<number[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    if (!params.id) return
    publicApi<Board>(`/raffles/${params.id}/board`)
      .then((next) => {
        setBoard(next)
        const cart = readCart()
        setPicked(cart?.raffleId === next.id ? cart.numbers.filter((number) => !next.sold.includes(number)) : [])
      })
      .catch((err: Error) => setError(err.message))
  }, [params.id])

  function toggle(number: number) {
    if (!board || board.status !== "ACTIVE") return
    const next = picked.includes(number)
      ? picked.filter((item) => item !== number)
      : [...picked, number]
    setPicked(next)
    writeCart({
      raffleId: board.id,
      title: board.title,
      prize: board.prize,
      ticketPrice: Number(board.ticketPrice),
      numbers: next,
    })
  }

  if (!board) {
    return <main className="flex-1 px-4 py-10 text-sm text-[#3d4d6b]">{error || "Cargando rifa"}</main>
  }

  const numbers = Array.from({ length: board.totalTickets }, (_, index) => index + 1)
  const sold = new Set(board.sold)

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-[#d7e6f2] shadow-[0_18px_40px_-28px_rgba(20,35,58,0.55)]">
        <div className="relative aspect-[16/10] sm:aspect-[21/9]">
          <Image
            src="/rifa-default.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14233a] via-[#14233a]/35 to-[#14233a]/10" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-7">
          <Link href="/rifas" className="text-sm font-medium text-white/80">
            Rifas activas
          </Link>
          <h1 className="mt-1 font-[family-name:var(--font-lora)] text-3xl text-white sm:text-5xl">
            {board.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/85 sm:text-base">
            {board.prize} · {money(board.ticketPrice)} el número · {board.totalTickets - sold.size} disponibles
          </p>
        </div>
      </div>
      {board.description ? (
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#3d4d6b] sm:text-base">{board.description}</p>
      ) : null}
      {error ? <p className="mt-4 text-sm text-[#d52b1e]">{error}</p> : null}
      <div className="mt-6 grid grid-cols-5 gap-1.5 sm:grid-cols-8 md:grid-cols-10">
        {numbers.map((number) => {
          const taken = sold.has(number)
          const active = picked.includes(number)
          return (
            <button
              key={number}
              type="button"
              disabled={taken || board.status !== "ACTIVE"}
              onClick={() => toggle(number)}
              className={`h-11 rounded-lg text-sm font-medium ${
                taken
                  ? "bg-[#d7e0ea] text-[#5a6d86]"
                  : active
                    ? "bg-[#c47a2c] text-white"
                    : "border border-[#d7e6f2] bg-white"
              }`}
            >
              {number}
            </button>
          )
        })}
      </div>
      <div className="sticky bottom-3 mt-6 flex flex-col gap-3 rounded-2xl border border-[#d7e6f2] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          {picked.length
            ? `${[...picked].sort((a, b) => a - b).join(", ")} · ${money(Number(board.ticketPrice) * picked.length)}`
            : "Toca los números libres"}
        </p>
        <Link
          href="/rifas/carrito"
          className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold text-white ${
            picked.length ? "bg-[#14233a]" : "pointer-events-none bg-[#14233a]/40"
          }`}
        >
          Ir al carrito
        </Link>
      </div>
    </main>
  )
}
