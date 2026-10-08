import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { RaffleCard } from "@/components/rifas/raffle-card"
import { loadActiveRaffles } from "@/lib/public-data"

export function RifaAnuncioFallback() {
  return (
    <section id="rifas" className="scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="h-4 w-24 animate-pulse rounded-full bg-[#e8eef5]" />
        <div className="mt-3 h-10 w-64 max-w-full animate-pulse rounded-2xl bg-[#e8eef5]" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="h-80 animate-pulse rounded-[1.6rem] bg-white" />
          <div className="h-80 animate-pulse rounded-[1.6rem] bg-white" />
        </div>
      </div>
    </section>
  )
}

export async function RifaAnuncio() {
  let raffles: Awaited<ReturnType<typeof loadActiveRaffles>> = []
  let error = ""

  try {
    raffles = await loadActiveRaffles()
  } catch {
    error = "No pudimos cargar las rifas. Prueba de nuevo en unos segundos."
  }

  const featured = raffles.length === 1
  const cols = featured ? "" : raffles.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"

  return (
    <section id="rifas" className="scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 max-w-2xl">
            <p className="text-xs font-bold tracking-[0.2em] text-[#c47a2c] uppercase">Rifas</p>
            <h2 className="mt-2 font-[family-name:var(--font-lora)] text-3xl leading-tight font-semibold text-balance text-[#14233a] sm:text-5xl">
              Apoya comprando un número
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-pretty text-[#3d4d6b] sm:text-base">
              Cada número ayuda al trabajo de la corporación con personas mayores en Ñuble. Elige, revisa el carrito y paga.
            </p>
          </div>
          <Link
            href="/rifas"
            className="inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 self-start rounded-full border border-[#d7e6f2] bg-white px-5 text-sm font-semibold text-[#14233a] transition-colors duration-200 hover:border-[#3b9fd0]/40 hover:text-[#3b9fd0] sm:self-auto"
          >
            Ver todas
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {error ? <p className="mt-6 text-sm text-[#d52b1e]">{error}</p> : null}

        {!error && raffles.length === 0 ? (
          <div className="mt-8 rounded-[1.6rem] border border-[#d7e6f2] bg-white px-5 py-10 text-center sm:px-8">
            <p className="font-[family-name:var(--font-lora)] text-2xl text-[#14233a]">No hay rifas activas por ahora</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#3d4d6b]">
              Vuelve pronto o escríbenos si quieres sumarte al apoyo.
            </p>
            <Link
              href="/#contacto"
              className="mt-5 inline-flex h-12 cursor-pointer items-center justify-center rounded-full bg-[#c47a2c] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#b36b22]"
            >
              Escríbenos
            </Link>
          </div>
        ) : null}

        {raffles.length > 0 ? (
          <div className={`mt-8 grid gap-4 sm:gap-5 ${cols}`}>
            {raffles.map((raffle, index) => (
              <RaffleCard key={raffle.id} raffle={raffle} featured={featured} priority={index === 0} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
