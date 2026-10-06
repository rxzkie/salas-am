"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { PageHeader, Panel, RaffleBadge, StatCard } from "@/components/admin/ui"
import { money, type Purchase, type Raffle } from "@/lib/raffle"

export default function AdminHomePage() {
  const [raffles, setRaffles] = useState<Raffle[]>([])
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    Promise.all([api<Raffle[]>("/raffles"), api<Purchase[]>("/purchases")])
      .then(([nextRaffles, nextPurchases]) => {
        setRaffles(nextRaffles)
        setPurchases(nextPurchases)
      })
      .catch((err: Error) => setError(err.message))
  }, [])

  const sold = raffles.reduce((sum, raffle) => sum + (raffle._count?.tickets ?? 0), 0)
  const paid = purchases
    .filter((purchase) => purchase.status === "PAID")
    .reduce((sum, purchase) => sum + Number(purchase.total), 0)
  const active = raffles.filter((raffle) => raffle.status === "ACTIVE").length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Resumen"
        subtitle="Mira rifas activas, números vendidos y lo recaudado."
        action={
          <Link
            href="/admin/rifas"
            className="inline-flex h-11 items-center rounded-full bg-[#c47a2c] px-5 text-sm font-semibold text-white hover:bg-[#b36b22]"
          >
            Nueva rifa
          </Link>
        }
      />
      {error ? <p className="text-sm text-[#b42318]">{error}</p> : null}
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Rifas" value={String(raffles.length)} hint={`${active} activas`} />
        <StatCard label="Números vendidos" value={String(sold)} />
        <StatCard label="Recaudado" value={money(paid)} hint="Solo compras pagadas" />
      </div>
      <Panel>
        <div className="flex items-center justify-between gap-3 border-b border-[#e6eef5] px-4 py-4 sm:px-5">
          <h2 className="font-semibold text-[#14233a]">Rifas recientes</h2>
          <Link href="/admin/rifas" className="text-sm font-medium text-[#3b9fd0]">
            Ver todas
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-[#f7fafc] text-[#5a6d86]">
              <tr>
                <th className="px-4 py-3 font-medium sm:px-5">Título</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Vendidos</th>
                <th className="px-4 py-3 font-medium">Precio</th>
              </tr>
            </thead>
            <tbody>
              {raffles.slice(0, 6).map((raffle) => (
                <tr key={raffle.id} className="border-t border-[#e6eef5]">
                  <td className="px-4 py-3.5 sm:px-5">
                    <Link
                      href={`/admin/rifas/${raffle.id}`}
                      className="font-semibold text-[#14233a] hover:text-[#c47a2c]"
                    >
                      {raffle.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3.5">
                    <RaffleBadge status={raffle.status} />
                  </td>
                  <td className="px-4 py-3.5 text-[#14233a]">
                    {raffle._count?.tickets ?? 0}/{raffle.totalTickets}
                  </td>
                  <td className="px-4 py-3.5 text-[#14233a]">{money(raffle.ticketPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  )
}
