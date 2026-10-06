export type Cart = {
  raffleId: string
  title: string
  prize: string
  ticketPrice: number
  numbers: number[]
}

const KEY = "salas-cart"

export function readCart(): Cart | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Cart) : null
  } catch {
    return null
  }
}

export function writeCart(cart: Cart) {
  localStorage.setItem(KEY, JSON.stringify(cart))
  window.dispatchEvent(new Event("salas-cart"))
}

export function clearCart() {
  localStorage.removeItem(KEY)
  window.dispatchEvent(new Event("salas-cart"))
}
