import { Suspense } from "react"
import { PaymentResult } from "@/components/rifas/payment-result"

export default function PagoPendientePage() {
  return (
    <Suspense>
      <PaymentResult kind="pendiente" />
    </Suspense>
  )
}
