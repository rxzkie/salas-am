"use client"

import { usePathname } from "next/navigation"
import { SiteFooter } from "@/components/landing/site-footer"
import { SiteHeader } from "@/components/landing/site-header"
import { WhatsappFab } from "@/components/landing/whatsapp-fab"

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname.startsWith("/admin")) return children
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <WhatsappFab />
    </>
  )
}
