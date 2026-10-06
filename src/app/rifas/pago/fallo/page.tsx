import { Suspense } from "react"
import { PaymentResult } from "@/components/rifas/payment-result"

export default function PagoFalloPage() {
  return (
    <Suspense>
      <PaymentResult kind="fallo" />
    </Suspense>
  )
}
