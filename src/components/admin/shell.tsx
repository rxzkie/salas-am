"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import {
  LayoutDashboard,
  LogOut,
  ShoppingBag,
  Ticket,
  Users,
} from "lucide-react"
import { firebaseAuth } from "@/lib/firebase"
import { api } from "@/lib/api"
import type { SessionUser } from "@/lib/raffle"

const links = [
  { href: "/admin", label: "Resumen", icon: LayoutDashboard },
  { href: "/admin/rifas", label: "Rifas", icon: Ticket },
  { href: "/admin/compras", label: "Compras", icon: ShoppingBag },
  { href: "/admin/usuarios", label: "Usuarios", icon: Users },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<SessionUser | null>(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, async (account) => {
      if (!account) {
        setUser(null)
        router.replace("/admin/login")
        return
      }
      try {
        const me = await api<SessionUser>("/auth/me")
        if (me.role !== "ADMIN") {
          await signOut(firebaseAuth)
          router.replace("/admin/login")
          return
        }
        setUser(me)
      } catch {
        await signOut(firebaseAuth)
        router.replace("/admin/login")
      }
    })
    return () => unsub()
  }, [router])

  if (!user) {
    return (
      <div className="grid min-h-screen place-items-center bg-[linear-gradient(180deg,#f4f8fb_0%,#eaf3f9_100%)] px-4 text-sm text-[#5a6d86]">
        Cargando panel
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f8fb_0%,#eaf3f9_55%,#f7fafc_100%)]">
      <aside className="border-b border-[#d7e6f2]/80 bg-[#14233a] text-white lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-b-0 lg:border-white/10">
        <div className="px-4 py-4 lg:px-5 lg:pt-6">
          <Link href="/admin" className="block">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#c47a2c] uppercase">
              Salas AM
            </p>
            <p className="mt-1 font-[family-name:var(--font-lora)] text-2xl">Rifas</p>
          </Link>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:gap-1.5 lg:px-3 lg:pb-0">
          {links.map((link) => {
            const active =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href)
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-[#c47a2c] text-white shadow-[0_10px_24px_-12px_rgba(196,122,44,0.9)]"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="size-4" />
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-white/10 px-3 py-3 lg:mt-auto lg:px-4 lg:py-4">
          <p className="hidden truncate px-1 text-xs text-white/50 lg:block">Sesión</p>
          <p className="mb-2 hidden truncate px-1 text-sm text-white/85 lg:block">{user.email}</p>
          <button
            type="button"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-3 text-sm text-white/80 hover:bg-white/10 hover:text-white lg:justify-start"
            onClick={() => signOut(firebaseAuth)}
          >
            <LogOut className="size-4" />
            Salir
          </button>
        </div>
      </aside>
      <div className="lg:pl-64">
        <main className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  )
}
