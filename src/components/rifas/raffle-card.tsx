import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { money, when, type Raffle } from "@/lib/raffle"

export function RaffleCard({
  raffle,
  featured = false,
  priority = false,
}: {
  raffle: Raffle
  featured?: boolean
  priority?: boolean
}) {
  const sold = raffle._count?.tickets ?? 0
  const left = Math.max(raffle.totalTickets - sold, 0)
  const pct = Math.min(100, Math.round((sold / Math.max(raffle.totalTickets, 1)) * 100))

  return (
    <Link
      href={`/rifas/${raffle.id}`}
      className={`group flex h-full cursor-pointer overflow-hidden rounded-[1.6rem] border border-[#d7e6f2] bg-white shadow-[0_18px_40px_-28px_rgba(20,35,58,0.45)] transition duration-200 hover:border-[#3b9fd0]/45 hover:shadow-[0_22px_48px_-24px_rgba(20,35,58,0.38)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b9fd0] ${
        featured ? "flex-col md:flex-row" : "flex-col"
      }`}
    >
      <div className={`relative shrink-0 overflow-hidden ${featured ? "aspect-[16/10] md:aspect-auto md:min-h-80 md:w-[46%]" : "aspect-[16/10]"}`}>
        <Image
          src="/rifa-default.jpg"
          alt=""
          fill
          priority={priority}
          sizes={featured ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14233a]/80 via-[#14233a]/15 to-transparent" />
        <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#c47a2c]">
          {left > 0 ? "A la venta" : "Agotada"}
        </span>
        <p className="absolute right-3 bottom-3 left-3 font-[family-name:var(--font-lora)] text-2xl leading-tight text-white sm:text-[1.7rem]">
          {raffle.title}
        </p>
      </div>
      <div className={`flex min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5 ${featured ? "md:justify-center md:p-8" : ""}`}>
        <p className={`line-clamp-3 text-sm leading-relaxed text-[#3d4d6b] ${featured ? "sm:text-base" : ""}`}>
          {raffle.prize}
        </p>
        <div className="mt-auto space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <p className="font-[family-name:var(--font-lora)] text-2xl font-semibold text-[#14233a]">
              {money(raffle.ticketPrice)}
            </p>
            <p className="text-sm font-medium text-[#5a6d86]">
              {left} libres · {sold} de {raffle.totalTickets}
            </p>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-[#e8eef5]"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${pct}% de números vendidos`}
          >
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#3b9fd0,#c47a2c)]"
              style={{ width: `${pct}%` }}
            />
          </div>
          {raffle.drawAt ? (
            <p className="text-xs font-medium text-[#5a6d86]">Sorteo {when(raffle.drawAt)}</p>
          ) : null}
          <span className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#14233a] text-sm font-semibold text-white transition-colors duration-200 group-hover:bg-[#c47a2c]">
            Elegir números
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
