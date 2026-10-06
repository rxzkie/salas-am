import { Actividades } from "@/components/landing/actividades"
import { Cierre } from "@/components/landing/cierre"
import { Contacto } from "@/components/landing/contacto"
import { Galeria } from "@/components/landing/galeria"
import { Hero } from "@/components/landing/hero"
import { Marquee } from "@/components/landing/marquee"
import { Mision } from "@/components/landing/mision"
import { Preguntas } from "@/components/landing/preguntas"
import { Nosotros } from "@/components/landing/nosotros"

import { RifaAnuncio } from "@/components/landing/rifa-anuncio"

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <RifaAnuncio />
      <Marquee />
      <Mision />
      <Galeria />
      <Actividades />
      <Nosotros />
      <Preguntas />
      <Contacto />
      <Cierre />
    </main>
  )
}
