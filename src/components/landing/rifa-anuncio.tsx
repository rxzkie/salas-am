import Image from "next/image"
import Link from "next/link"
import { loadActiveRaffles } from "@/lib/public-data"
import { money } from "@/lib/raffle"

export async function RifaAnuncio() {
  const raffles = await loadActiveRaffles()
  const raffle = raffles[0]
  if (!raffle) return null

  const sold = raffle._count?.tickets ?? 0
  const left = raffle.totalTickets - sold

  return (
    <section className="bg-[#14233a] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between md:py-8">
        <div className="flex min-w-0 items-center gap-4">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl sm:size-20">
            <Image src="/rifa-default.jpg" alt="" fill sizes="80px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.16em] text-[#c47a2c] uppercase">
              Rifa a la venta
            </p>
            <h2 className="mt-1 truncate font-[family-name:var(--font-lora)] text-2xl sm:text-3xl">
              {raffle.title}
            </h2>
            <p className="mt-1 line-clamp-2 text-sm text-white/80 sm:text-base">
              {raffle.prize} · {money(raffle.ticketPrice)} · {left} disponibles
            </p>
          </div>
        </div>
        <Link
          href={`/rifas/${raffle.id}`}
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-[#c47a2c] px-6 text-sm font-semibold text-white"
        >
          Comprar número
        </Link>
      </div>
    </section>
  )
}
