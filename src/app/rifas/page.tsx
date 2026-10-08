import Image from "next/image"
import Link from "next/link"
import { loadActiveRaffles } from "@/lib/public-data"
import { money } from "@/lib/raffle"

export const revalidate = 20

export default async function RifasPage() {
  const raffles = await loadActiveRaffles()

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-12">
      <p className="text-xs font-semibold tracking-[0.18em] text-[#c47a2c] uppercase">Salas AM</p>
      <h1 className="mt-2 font-[family-name:var(--font-lora)] text-3xl text-[#14233a] sm:text-5xl">
        Rifas activas
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#3d4d6b] sm:text-base">
        Elige tus números, revísalos en el carrito y paga con el medio que prefieras.
      </p>
      <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5">
        {raffles.map((raffle) => {
          const sold = raffle._count?.tickets ?? 0
          const left = Math.max(raffle.totalTickets - sold, 0)
          const pct = Math.round((sold / Math.max(raffle.totalTickets, 1)) * 100)
          return (
            <Link
              key={raffle.id}
              href={`/rifas/${raffle.id}`}
              className="group overflow-hidden rounded-[1.5rem] border border-[#d7e6f2] bg-white shadow-[0_18px_40px_-28px_rgba(20,35,58,0.55)] sm:rounded-[1.75rem]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src="/rifa-default.jpg"
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14233a] via-[#14233a]/20 to-transparent" />
                <div className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#c47a2c]">
                  A la venta
                </div>
                <h2 className="absolute right-3 bottom-3 left-3 font-[family-name:var(--font-lora)] text-2xl leading-tight text-white">
                  {raffle.title}
                </h2>
              </div>
              <div className="space-y-3 p-4">
                <p className="line-clamp-2 text-sm leading-relaxed text-[#3d4d6b]">{raffle.prize}</p>
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold text-[#14233a]">{money(raffle.ticketPrice)}</span>
                    <span className="text-[#5a6d86]">{left} libres</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#e8eef5]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,#3b9fd0,#c47a2c)]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <span className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#14233a] text-sm font-semibold text-white">
                  Elegir números
                </span>
              </div>
            </Link>
          )
        })}
      </div>
      {raffles.length === 0 ? (
        <p className="mt-8 text-sm text-[#3d4d6b]">No hay rifas activas por ahora.</p>
      ) : null}
    </main>
  )
}
