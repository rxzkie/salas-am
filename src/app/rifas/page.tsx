import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { RaffleCard } from "@/components/rifas/raffle-card"
import { loadActiveRaffles } from "@/lib/public-data"

export const revalidate = 15

export default async function RifasPage() {
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
    <main className="flex-1">
      <section className="border-b border-[#d7e6f2] bg-white/80">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Link
            href="/#rifas"
            className="inline-flex h-11 cursor-pointer items-center gap-2 text-sm font-semibold text-[#3b9fd0] transition-colors duration-200 hover:text-[#14233a]"
          >
            <ArrowLeft className="size-4" />
            Inicio
          </Link>
          <p className="mt-4 text-xs font-bold tracking-[0.2em] text-[#c47a2c] uppercase">Rifas solidarias</p>
          <h1 className="mt-2 max-w-3xl font-[family-name:var(--font-lora)] text-4xl leading-tight font-semibold text-balance text-[#14233a] sm:text-5xl">
            Elige tu número
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-pretty text-[#3d4d6b] sm:text-base">
            Revisa el premio, el valor y los números libres. Luego los confirmas en el carrito y pagas con el medio que prefieras.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {error ? <p className="text-sm text-[#d52b1e]">{error}</p> : null}
        {raffles.length > 0 ? (
          <div className={`grid gap-4 sm:gap-5 ${cols}`}>
            {raffles.map((raffle, index) => (
              <RaffleCard key={raffle.id} raffle={raffle} featured={featured} priority={index === 0} />
            ))}
          </div>
        ) : null}
        {!error && raffles.length === 0 ? (
          <div className="rounded-[1.6rem] border border-[#d7e6f2] bg-white px-5 py-12 text-center">
            <p className="font-[family-name:var(--font-lora)] text-2xl text-[#14233a]">No hay rifas activas por ahora</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#3d4d6b]">
              Cuando haya una nueva, va a aparecer aquí.
            </p>
          </div>
        ) : null}
      </section>
    </main>
  )
}
