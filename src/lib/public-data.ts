import type { Raffle } from "@/lib/raffle"

const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api"

export type Board = {
  id: string
  title: string
  description: string | null
  prize: string
  ticketPrice: string
  totalTickets: number
  status: string
  sold: number[]
}

async function read<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${base}${path}`, { next: { revalidate: 20 } })
    if (!response.ok) return null
    return (await response.json()) as T
  } catch {
    return null
  }
}

export async function loadActiveRaffles() {
  const items = await read<Raffle[]>("/raffles")
  return (items ?? []).filter((item) => item.status === "ACTIVE")
}

export async function loadBoard(id: string) {
  return read<Board>(`/raffles/${id}/board`)
}
