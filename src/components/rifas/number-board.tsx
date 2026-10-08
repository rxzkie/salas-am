"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { readCart, writeCart } from "@/lib/cart"
import { money } from "@/lib/raffle"
import type { Board } from "@/lib/public-data"

export function NumberBoard({ board }: { board: Board }) {
  const [picked, setPicked] = useState<number[]>([])
  const sold = new Set(board.sold)
  const numbers = Array.from({ length: board.totalTickets }, (_, index) => index + 1)

  useEffect(() => {
    const cart = readCart()
    if (cart?.raffleId !== board.id) return
    const taken = new Set(board.sold)
    setPicked(cart.numbers.filter((number) => !taken.has(number)))
  }, [board])

  function toggle(number: number) {
    if (board.status !== "ACTIVE") return
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

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-5 pb-28 sm:px-6 sm:py-12">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-[#d7e6f2] shadow-[0_18px_40px_-28px_rgba(20,35,58,0.55)] sm:rounded-[1.75rem]">
        <div className="relative aspect-[16/9] sm:aspect-[21/9]">
          <Image
            src="/rifa-default.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14233a] via-[#14233a]/30 to-[#14233a]/10" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-7">
          <Link href="/rifas" className="inline-flex h-10 items-center text-sm font-medium text-white/80">
            Rifas activas
          </Link>
          <h1 className="font-[family-name:var(--font-lora)] text-3xl leading-tight text-white sm:text-5xl">
            {board.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/85 sm:text-base">
            {board.prize} · {money(board.ticketPrice)} · {board.totalTickets - sold.size} disponibles
          </p>
        </div>
      </div>
      {board.description ? (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#3d4d6b] sm:mt-5 sm:text-base">
          {board.description}
        </p>
      ) : null}
      <div className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
        {numbers.map((number) => {
          const taken = sold.has(number)
          const active = picked.includes(number)
          return (
            <button
              key={number}
              type="button"
              disabled={taken || board.status !== "ACTIVE"}
              onClick={() => toggle(number)}
              className={`h-12 rounded-xl text-sm font-semibold ${
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
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#d7e6f2] bg-white/95 p-3 backdrop-blur sm:static sm:mt-6 sm:rounded-2xl sm:border sm:p-4 sm:shadow-sm">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="truncate text-sm text-[#14233a]">
            {picked.length
              ? `${picked.length} números · ${money(Number(board.ticketPrice) * picked.length)}`
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
      </div>
    </main>
  )
}
