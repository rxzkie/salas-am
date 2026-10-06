"use client"

import { useEffect, useState } from "react"
import { ContactLines } from "@/components/admin/contact"
import { PageHeader, Panel, Select } from "@/components/admin/ui"
import { api } from "@/lib/api"
import type { Role, SessionUser } from "@/lib/raffle"

type UserRow = SessionUser & {
  phone: string | null
  createdAt: string
  _count?: { purchases: number; tickets: number }
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([])
  const [error, setError] = useState("")

  function load() {
    api<UserRow[]>("/users")
      .then(setUsers)
      .catch((err: Error) => setError(err.message))
  }

  useEffect(() => {
    load()
  }, [])

  async function setRole(id: string, role: Role) {
    setError("")
    try {
      await api(`/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ role }),
      })
      load()
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo actualizar")
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Usuarios"
        subtitle="Cuentas admin y compradores con datos de contacto."
      />
      {error ? <p className="text-sm text-[#b42318]">{error}</p> : null}
      <div className="grid gap-3">
        {users.map((user) => (
          <Panel key={user.id} className="p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <ContactLines person={user} />
              <div className="grid w-full gap-3 sm:grid-cols-3 lg:w-[28rem]">
                <div className="rounded-2xl bg-[#f7fafc] p-3">
                  <p className="text-xs text-[#5a6d86]">Compras</p>
                  <p className="mt-1 text-lg font-semibold text-[#14233a]">
                    {user._count?.purchases ?? 0}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#f7fafc] p-3">
                  <p className="text-xs text-[#5a6d86]">Números</p>
                  <p className="mt-1 text-lg font-semibold text-[#14233a]">
                    {user._count?.tickets ?? 0}
                  </p>
                </div>
                <Select
                  value={user.role}
                  onChange={(event) => setRole(user.id, event.target.value as Role)}
                >
                  <option value="ADMIN">Admin</option>
                  <option value="USER">Usuario</option>
                </Select>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  )
}
