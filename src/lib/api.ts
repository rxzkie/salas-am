import { firebaseAuth } from "@/lib/firebase"

const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api"

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = firebaseAuth.currentUser
    ? await firebaseAuth.currentUser.getIdToken()
    : null
  const headers = new Headers(init.headers)
  if (init.body) headers.set("Content-Type", "application/json")
  if (token) headers.set("Authorization", `Bearer ${token}`)
  const response = await fetch(`${base}${path}`, { ...init, headers })
  const payload = await response.json().catch(() => null)
  if (!response.ok) {
    const message = payload?.message
    throw new Error(
      Array.isArray(message) ? message.join(", ") : message || "Error de servidor"
    )
  }
  return payload as T
}
