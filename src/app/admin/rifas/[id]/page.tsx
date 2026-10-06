"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { FormEvent, useEffect, useMemo, useState } from "react"
import { ContactLines } from "@/components/admin/contact"
import {
  Field,
  PageHeader,
  Panel,
  PurchaseBadge,
  RaffleBadge,
} from "@/components/admin/ui"
import { api } from "@/lib/api"
import {
  money,
  raffleStatusLabel,
  when,
  type Raffle,
  type RaffleStatus,
} from "@/lib/raffle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const statuses: RaffleStatus[] = ["DRAFT", "ACTIVE", "CLOSED", "DRAWN"]

export default function RaffleDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [raffle, setRaffle] = useState<Raffle | null>(null)
  const [selected, setSelected] = useState<number[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function load() {
    api<Raffle>(`/raffles/${params.id}`)
      .then((next) => {
        setRaffle(next)
        setSelected([])
      })
      .catch((err: Error) => setError(err.message))
  }

  useEffect(() => {
    if (params.id) load()
  }, [params.id])

  const sold = useMemo(() => {
    const map = new Map<number, string>()
    raffle?.tickets?.forEach((ticket) => {
      const phone = ticket.user?.phone ? ` · ${ticket.user.phone}` : ""
      const email = ticket.user?.email ? ` · ${ticket.user.email}` : ""
      map.set(ticket.number, `${ticket.user?.name ?? "Vendido"}${phone}${email}`)
    })
    return map
  }, [raffle])

  async function setStatus(status: RaffleStatus) {
    setError("")
    try {
      await api(`/raffles/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      })
      load()
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo actualizar")
    }
  }

  async function sell(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selected.length) {
      setError("Elige al menos un número")
      return
    }
    const form = new FormData(event.currentTarget)
    setLoading(true)
    setError("")
    try {
      await api("/purchases", {
        method: "POST",
        body: JSON.stringify({
          raffleId: params.id,
          numbers: selected,
          status: "PAID",
          buyer: {
            name: String(form.get("name")),
            email: String(form.get("email")),
            phone: String(form.get("phone")),
          },
        }),
      })
      ;(event.target as HTMLFormElement).reset()
      load()
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo registrar")
    } finally {
      setLoading(false)
    }
  }

  async function remove() {
    if (!confirm("¿Eliminar esta rifa?")) return
    try {
      await api(`/raffles/${params.id}`, { method: "DELETE" })
      router.replace("/admin/rifas")
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo eliminar")
    }
  }

  if (!raffle) {
    return <p className="text-sm text-[#5a6d86]">{error || "Cargando rifa"}</p>
  }

  const numbers = Array.from({ length: raffle.totalTickets }, (_, index) => index + 1)
  const showGrid = raffle.totalTickets <= 400
  const pct = Math.round((sold.size / Math.max(raffle.totalTickets, 1)) * 100)

  return (
    <div className="space-y-6">
      <PageHeader
        title={raffle.title}
        subtitle={`${raffle.prize} · ${money(raffle.ticketPrice)} · ${sold.size}/${raffle.totalTickets}`}
        action={
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/rifas" className="inline-flex h-11 items-center rounded-full border border-[#d7e6f2] bg-white px-4 text-sm font-medium text-[#14233a]">
              Volver
            </Link>
            <Button variant="destructive" className="h-11 rounded-full px-4" onClick={remove}>
              Eliminar
            </Button>
          </div>
        }
      />
      <div className="flex flex-wrap items-center gap-3">
        <RaffleBadge status={raffle.status} />
        <div className="min-w-[12rem] flex-1">
          <div className="mb-1 flex justify-between text-xs text-[#5a6d86]">
            <span>Avance</span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#e8eef5]">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#3b9fd0,#c47a2c)]"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
      {error ? <p className="text-sm text-[#b42318]">{error}</p> : null}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {statuses.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatus(status)}
            className={`h-11 shrink-0 rounded-full px-4 text-sm font-medium transition ${
              raffle.status === status
                ? "bg-[#14233a] text-white"
                : "border border-[#d7e6f2] bg-white text-[#14233a] hover:border-[#3b9fd0]"
            }`}
          >
            {raffleStatusLabel[status]}
          </button>
        ))}
      </div>
      <Panel className="p-4 sm:p-6">
        <form onSubmit={sell} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <h2 className="font-semibold text-[#14233a]">Registrar compra</h2>
            <p className="mt-1 text-sm text-[#5a6d86]">
              {selected.length
                ? `${[...selected].sort((a, b) => a - b).join(", ")} · ${money(Number(raffle.ticketPrice) * selected.length)}`
                : "Toca los números libres"}
            </p>
          </div>
          <Field>
            Nombre
            <Input id="buyer-name" name="name" required minLength={2} className="h-11 rounded-xl" />
          </Field>
          <Field>
            Correo
            <Input id="buyer-email" name="email" type="email" required className="h-11 rounded-xl" />
          </Field>
          <Field>
            Teléfono
            <Input
              id="buyer-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              required
              minLength={8}
              className="h-11 rounded-xl"
            />
          </Field>
          <div className="flex items-end">
            <Button
              type="submit"
              disabled={loading || raffle.status !== "ACTIVE"}
              className="h-11 w-full rounded-full bg-[#c47a2c] hover:bg-[#b36b22]"
            >
              {raffle.status === "ACTIVE"
                ? loading
                  ? "Guardando"
                  : "Marcar pagada"
                : "Activa la rifa para vender"}
            </Button>
          </div>
        </form>
      </Panel>
      {showGrid ? (
        <Panel className="p-3 sm:p-4">
          <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-8 md:grid-cols-10">
            {numbers.map((number) => {
              const owner = sold.get(number)
              const active = selected.includes(number)
              return (
                <button
                  key={number}
                  type="button"
                  disabled={Boolean(owner)}
                  title={owner}
                  onClick={() =>
                    setSelected((current) =>
                      current.includes(number)
                        ? current.filter((item) => item !== number)
                        : [...current, number]
                    )
                  }
                  className={`h-11 rounded-xl text-sm font-semibold transition ${
                    owner
                      ? "bg-[#14233a] text-white"
                      : active
                        ? "bg-[#c47a2c] text-white shadow-[0_8px_18px_-10px_rgba(196,122,44,0.9)]"
                        : "border border-[#d7e6f2] bg-[#f8fbfe] text-[#14233a] hover:border-[#3b9fd0]"
                  }`}
                >
                  {number}
                </button>
              )
            })}
          </div>
        </Panel>
      ) : (
        <Panel className="p-4 text-sm text-[#5a6d86]">
          Números vendidos:{" "}
          {sold.size ? [...sold.keys()].sort((a, b) => a - b).join(", ") : "ninguno"}
        </Panel>
      )}
      <div className="space-y-3">
        <h2 className="font-semibold text-[#14233a]">Compradores</h2>
        {[...(raffle.purchases ?? [])]
          .sort((a, b) => {
            const order = { PAID: 0, PENDING: 1, CANCELLED: 2, REFUNDED: 3 } as const
            const byStatus = order[a.status] - order[b.status]
            if (byStatus !== 0) return byStatus
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          })
          .map((purchase) => {
            const nums = [...purchase.tickets.map((ticket) => ticket.number)].sort((a, b) => a - b)
            return (
              <Panel
                key={purchase.id}
                className={`overflow-hidden p-0 ${
                  purchase.status === "PAID" ? "ring-1 ring-[#1f7a4d]/20" : ""
                }`}
              >
                <div
                  className={`flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3 ${
                    purchase.status === "PAID" ? "border-[#d8efe3] bg-[#f3fbf6]" : "border-[#e6eef5] bg-[#f8fafc]"
                  }`}
                >
                  <PurchaseBadge status={purchase.status} />
                  <p className="text-sm font-semibold text-[#14233a]">{money(purchase.total)}</p>
                </div>
                <div className="space-y-3 p-4 sm:p-5">
                  <ContactLines person={purchase.user} />
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-[#5a6d86] uppercase">
                      Números
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {nums.length ? (
                        nums.map((number) => (
                          <span
                            key={number}
                            className={`inline-flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold ${
                              purchase.status === "PAID"
                                ? "bg-[#14233a] text-white"
                                : "border border-[#d7e6f2] bg-[#f8fbfe] text-[#14233a]"
                            }`}
                          >
                            {number}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-[#5a6d86]">Sin números</span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#5a6d86]">{when(purchase.createdAt)}</p>
                </div>
              </Panel>
            )
          })}
      </div>
    </div>
  )
}
