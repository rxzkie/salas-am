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

async function read<T>(path: string): Promise<T> {
  const response = await fetch(`${base}${path}`, {
    next: { revalidate: 15 },
  })
  if (!response.ok) {
    throw new Error(`API ${response.status}`)
  }
  return (await response.json()) as T
}

export async function loadActiveRaffles() {
  const items = await read<Raffle[]>("/raffles")
  return items.filter((item) => item.status === "ACTIVE")
}

export async function loadBoard(id: string) {
  return read<Board>(`/raffles/${id}/board`)
}
