import { Suspense } from "react"
import { PaymentResult } from "@/components/rifas/payment-result"

export default function PagoExitoPage() {
  return (
    <Suspense>
      <PaymentResult kind="exito" />
    </Suspense>
  )
}
