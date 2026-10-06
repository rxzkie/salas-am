"use client"

import { useEffect, useMemo, useState } from "react"
import { ContactLines } from "@/components/admin/contact"
import { PageHeader, Panel, PurchaseBadge, Select, StatCard } from "@/components/admin/ui"
import { api } from "@/lib/api"
import {
  money,
  purchaseStatusLabel,
  when,
  type Purchase,
  type PurchaseStatus,
} from "@/lib/raffle"

const statuses: PurchaseStatus[] = ["PAID", "PENDING", "CANCELLED", "REFUNDED"]
const filters: Array<"ALL" | PurchaseStatus> = ["ALL", "PAID", "PENDING", "CANCELLED", "REFUNDED"]

const filterLabel: Record<"ALL" | PurchaseStatus, string> = {
  ALL: "Todas",
  PAID: "Pagadas",
  PENDING: "Pendientes",
  CANCELLED: "Canceladas",
  REFUNDED: "Reembolsadas",
}

function rank(status: PurchaseStatus) {
  return statuses.indexOf(status)
}

function PurchaseCard({
  purchase,
  onStatus,
}: {
  purchase: Purchase
  onStatus: (id: string, status: PurchaseStatus) => void
}) {
  const numbers = [...purchase.tickets.map((ticket) => ticket.number)].sort((a, b) => a - b)

  return (
    <Panel
      className={`overflow-hidden p-0 ${
        purchase.status === "PAID" ? "ring-1 ring-[#1f7a4d]/20" : ""
      }`}
    >
      <div
        className={`flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3 sm:px-5 ${
          purchase.status === "PAID"
            ? "border-[#d8efe3] bg-[#f3fbf6]"
            : purchase.status === "PENDING"
              ? "border-[#f3e6c8] bg-[#fffaf0]"
              : "border-[#e6eef5] bg-[#f8fafc]"
        }`}
      >
        <PurchaseBadge status={purchase.status} />
        <p className="text-sm font-semibold text-[#14233a]">{money(purchase.total)}</p>
      </div>
      <div className="space-y-4 p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <ContactLines person={purchase.user} />
          <Select
            value={purchase.status}
            onChange={(event) => onStatus(purchase.id, event.target.value as PurchaseStatus)}
            className="sm:w-48"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {purchaseStatusLabel[status]}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-[#5a6d86] uppercase">
            Números comprados
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {numbers.length ? (
              numbers.map((number) => (
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
              <span className="text-sm text-[#5a6d86]">Sin números asignados</span>
            )}
          </div>
        </div>
        <div className="grid gap-3 rounded-2xl bg-[#f7fafc] p-3 text-sm sm:grid-cols-2">
          <div>
            <p className="text-[#5a6d86]">Rifa</p>
            <p className="mt-1 font-semibold text-[#14233a]">{purchase.raffle?.title}</p>
          </div>
          <div>
            <p className="text-[#5a6d86]">Fecha</p>
            <p className="mt-1 font-semibold text-[#14233a]">{when(purchase.createdAt)}</p>
          </div>
        </div>
      </div>
    </Panel>
  )
}

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [filter, setFilter] = useState<"ALL" | PurchaseStatus>("PAID")
  const [error, setError] = useState("")

  function load() {
    api<Purchase[]>("/purchases")
      .then(setPurchases)
      .catch((err: Error) => setError(err.message))
  }

  useEffect(() => {
    load()
  }, [])

  const ordered = useMemo(
    () =>
      [...purchases].sort((a, b) => {
        const byStatus = rank(a.status) - rank(b.status)
        if (byStatus !== 0) return byStatus
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }),
    [purchases],
  )

  const visible = useMemo(
    () => (filter === "ALL" ? ordered : ordered.filter((item) => item.status === filter)),
    [filter, ordered],
  )

  const paid = ordered.filter((item) => item.status === "PAID")
  const pending = ordered.filter((item) => item.status === "PENDING")
  const paidTotal = paid.reduce((sum, item) => sum + Number(item.total), 0)
  const paidNumbers = paid.reduce((sum, item) => sum + item.tickets.length, 0)

  async function updateStatus(id: string, status: PurchaseStatus) {
    setError("")
    try {
      await api(`/purchases/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      })
      load()
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo actualizar")
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Compras"
        subtitle="Primero las pagadas, con teléfono y números para contactar."
      />
      {error ? <p className="text-sm text-[#b42318]">{error}</p> : null}
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Pagadas" value={String(paid.length)} hint={`${paidNumbers} números`} />
        <StatCard label="Pendientes" value={String(pending.length)} />
        <StatCard label="Recaudado" value={money(paidTotal)} />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((item) => {
          const count =
            item === "ALL" ? purchases.length : purchases.filter((row) => row.status === item).length
          return (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`h-11 shrink-0 rounded-full px-4 text-sm font-medium transition ${
                filter === item
                  ? "bg-[#14233a] text-white"
                  : "border border-[#d7e6f2] bg-white text-[#14233a] hover:border-[#3b9fd0]"
              }`}
            >
              {filterLabel[item]} ({count})
            </button>
          )
        })}
      </div>
      {filter === "ALL" ? (
        <div className="space-y-8">
          {statuses.map((status) => {
            const group = ordered.filter((item) => item.status === status)
            if (!group.length) return null
            return (
              <section key={status} className="space-y-3">
                <div className="flex items-center gap-3">
                  <h2 className="font-[family-name:var(--font-lora)] text-2xl text-[#14233a]">
                    {purchaseStatusLabel[status]}
                  </h2>
                  <PurchaseBadge status={status} />
                  <span className="text-sm text-[#5a6d86]">{group.length}</span>
                </div>
                <div className="grid gap-3">
                  {group.map((purchase) => (
                    <PurchaseCard key={purchase.id} purchase={purchase} onStatus={updateStatus} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      ) : (
        <div className="grid gap-3">
          {visible.map((purchase) => (
            <PurchaseCard key={purchase.id} purchase={purchase} onStatus={updateStatus} />
          ))}
        </div>
      )}
      {!error && visible.length === 0 ? (
        <Panel className="p-6 text-sm text-[#5a6d86]">No hay compras en esta vista.</Panel>
      ) : null}
    </div>
  )
}
