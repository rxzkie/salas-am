"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { api } from "@/lib/api"
import {
  Field,
  PageHeader,
  Panel,
  RaffleBadge,
  Select,
} from "@/components/admin/ui"
import { money, raffleStatusLabel, type Raffle, type RaffleStatus } from "@/lib/raffle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const statuses: RaffleStatus[] = ["DRAFT", "ACTIVE", "CLOSED", "DRAWN"]

export default function RafflesPage() {
  const router = useRouter()
  const [raffles, setRaffles] = useState<Raffle[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  function load() {
    api<Raffle[]>("/raffles")
      .then(setRaffles)
      .catch((err: Error) => setError(err.message))
  }

  useEffect(() => {
    load()
  }, [])

  async function onCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const ticketPrice = Number(form.get("ticketPrice"))
    const totalTickets = Number(form.get("totalTickets"))
    const drawRaw = String(form.get("drawAt") || "")
    const drawAt = drawRaw ? new Date(drawRaw) : null
    if (!Number.isInteger(ticketPrice) || ticketPrice < 1) {
      setError("El precio debe ser un número entero mayor a 0")
      return
    }
    if (!Number.isInteger(totalTickets) || totalTickets < 1 || totalTickets > 5000) {
      setError("La cantidad de números debe estar entre 1 y 5000")
      return
    }
    if (drawAt && Number.isNaN(drawAt.getTime())) {
      setError("La fecha del sorteo no es válida")
      return
    }
    setLoading(true)
    setError("")
    try {
      const raffle = await api<Raffle>("/raffles", {
        method: "POST",
        body: JSON.stringify({
          title: String(form.get("title")).trim(),
          prize: String(form.get("prize")).trim(),
          description: String(form.get("description") || "").trim() || undefined,
          ticketPrice,
          totalTickets,
          status: String(form.get("status")),
          drawAt: drawAt ? drawAt.toISOString() : undefined,
        }),
      })
      router.push(`/admin/rifas/${raffle.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo crear")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Rifas"
        subtitle="Crea sorteos, revisa avance y abre cada grilla."
        action={
          <Button
            className="h-11 rounded-full bg-[#c47a2c] px-5 hover:bg-[#b36b22]"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Cerrar" : "Nueva rifa"}
          </Button>
        }
      />
      {error ? <p className="text-sm text-[#b42318]">{error}</p> : null}
      {open ? (
        <Panel className="p-4 sm:p-6">
          <form onSubmit={onCreate} className="grid gap-4 sm:grid-cols-2">
            <Field className="sm:col-span-2">
              Título
              <Input id="title" name="title" required minLength={3} className="h-11 rounded-xl" />
            </Field>
            <Field>
              Premio
              <Input id="prize" name="prize" required minLength={2} className="h-11 rounded-xl" />
            </Field>
            <Field>
              Estado
              <Select id="status" name="status" defaultValue="ACTIVE">
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {raffleStatusLabel[status]}
                  </option>
                ))}
              </Select>
            </Field>
            <Field>
              Precio del número
              <Input
                id="ticketPrice"
                name="ticketPrice"
                type="number"
                min={1}
                max={100000000}
                step={1}
                required
                className="h-11 rounded-xl"
              />
            </Field>
            <Field>
              Cantidad de números
              <Input
                id="totalTickets"
                name="totalTickets"
                type="number"
                min={1}
                max={5000}
                step={1}
                required
                className="h-11 rounded-xl"
              />
            </Field>
            <Field className="sm:col-span-2">
              Descripción
              <Input id="description" name="description" className="h-11 rounded-xl" />
            </Field>
            <Field>
              Fecha del sorteo
              <Input id="drawAt" name="drawAt" type="datetime-local" className="h-11 rounded-xl" />
            </Field>
            <div className="flex items-end">
              <Button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-full bg-[#14233a] hover:bg-[#0f1b2d]"
              >
                {loading ? "Guardando" : "Crear rifa"}
              </Button>
            </div>
          </form>
        </Panel>
      ) : null}
      <div className="grid gap-3">
        {raffles.map((raffle) => {
          const sold = raffle._count?.tickets ?? 0
          const pct = Math.round((sold / Math.max(raffle.totalTickets, 1)) * 100)
          return (
            <Link
              key={raffle.id}
              href={`/admin/rifas/${raffle.id}`}
              className="rounded-3xl border border-[#d7e6f2] bg-white p-4 shadow-[0_10px_30px_-24px_rgba(20,35,58,0.45)] transition hover:-translate-y-0.5 hover:border-[#3b9fd0] sm:p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold text-[#14233a]">{raffle.title}</p>
                  <p className="mt-1 text-sm text-[#5a6d86]">{raffle.prize}</p>
                </div>
                <RaffleBadge status={raffle.status} />
              </div>
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-[#5a6d86]">
                    {sold}/{raffle.totalTickets} números
                  </span>
                  <span className="font-semibold text-[#14233a]">{money(raffle.ticketPrice)}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#e8eef5]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#3b9fd0,#c47a2c)]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
