export type Role = "USER" | "ADMIN"
export type RaffleStatus = "DRAFT" | "ACTIVE" | "CLOSED" | "DRAWN"
export type PurchaseStatus = "PENDING" | "PAID" | "CANCELLED" | "REFUNDED"

export type SessionUser = {
  id: string
  name: string
  email: string
  phone: string | null
  role: Role
}

export type Person = {
  id: string
  name: string
  email: string
  phone: string | null
}

export type Ticket = {
  id: string
  number: number
  user?: Person
}

export type Purchase = {
  id: string
  quantity: number
  total: string
  status: PurchaseStatus
  createdAt: string
  user: Person
  raffle?: { id: string; title: string; prize?: string }
  tickets: { id: string; number: number }[]
}

export type Raffle = {
  id: string
  title: string
  description: string | null
  prize: string
  ticketPrice: string
  totalTickets: number
  status: RaffleStatus
  drawAt: string | null
  createdAt: string
  _count?: { tickets: number; purchases: number }
  tickets?: Ticket[]
  purchases?: Purchase[]
}

export const raffleStatusLabel: Record<RaffleStatus, string> = {
  DRAFT: "Borrador",
  ACTIVE: "Activa",
  CLOSED: "Cerrada",
  DRAWN: "Sorteada",
}

export const purchaseStatusLabel: Record<PurchaseStatus, string> = {
  PENDING: "Pendiente",
  PAID: "Pagada",
  CANCELLED: "Cancelada",
  REFUNDED: "Reembolsada",
}

export function money(value: string | number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(value))
}

export function when(value: string) {
  return new Intl.DateTimeFormat("es-CL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}
