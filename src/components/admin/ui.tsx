import type { PurchaseStatus, RaffleStatus } from "@/lib/raffle"
import { purchaseStatusLabel, raffleStatusLabel } from "@/lib/raffle"

const raffleTone: Record<RaffleStatus, string> = {
  DRAFT: "bg-[#eef3f8] text-[#3d4d6b]",
  ACTIVE: "bg-[#e6f6ee] text-[#1f7a4d]",
  CLOSED: "bg-[#fff1e8] text-[#b35a1a]",
  DRAWN: "bg-[#e8f3fb] text-[#1f6f9c]",
}

const purchaseTone: Record<PurchaseStatus, string> = {
  PENDING: "bg-[#fff6e5] text-[#9a6700]",
  PAID: "bg-[#e6f6ee] text-[#1f7a4d]",
  CANCELLED: "bg-[#fdecee] text-[#b42318]",
  REFUNDED: "bg-[#eef3f8] text-[#3d4d6b]",
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-[0.18em] text-[#c47a2c] uppercase">
          Panel
        </p>
        <h1 className="mt-1 font-[family-name:var(--font-lora)] text-3xl text-[#14233a] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#5a6d86]">{subtitle}</p>
      </div>
      {action}
    </div>
  )
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string
  value: string
  hint?: string
}) {
  return (
    <div className="rounded-3xl border border-[#d7e6f2] bg-white p-5 shadow-[0_10px_30px_-24px_rgba(20,35,58,0.45)]">
      <p className="text-sm text-[#5a6d86]">{label}</p>
      <p className="mt-3 font-[family-name:var(--font-lora)] text-3xl text-[#14233a]">{value}</p>
      {hint ? <p className="mt-2 text-xs text-[#3b9fd0]">{hint}</p> : null}
    </div>
  )
}

export function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-3xl border border-[#d7e6f2] bg-white shadow-[0_10px_30px_-24px_rgba(20,35,58,0.45)] ${className}`}
    >
      {children}
    </div>
  )
}

export function RaffleBadge({ status }: { status: RaffleStatus }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${raffleTone[status]}`}>
      {raffleStatusLabel[status]}
    </span>
  )
}

export function PurchaseBadge({ status }: { status: PurchaseStatus }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${purchaseTone[status]}`}>
      {purchaseStatusLabel[status]}
    </span>
  )
}

export function Field({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <label className={`block space-y-2 text-sm font-medium text-[#14233a] ${className}`}>
      {children}
    </label>
  )
}

export function Select({ className = "", ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={`h-11 w-full rounded-xl border border-[#d5deee] bg-[#f8fbfe] px-3 text-sm text-[#14233a] outline-none focus:border-[#3b9fd0] focus:ring-3 focus:ring-[#3b9fd0]/20 ${className}`}
      {...props}
    />
  )
}
