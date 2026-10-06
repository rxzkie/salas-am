"use client"

import Image, { type StaticImageData } from "next/image"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import capacitacion from "@/assets/galeria/capacitacion.jpg"
import entrega from "@/assets/galeria/entrega.jpg"
import grupo from "@/assets/galeria/grupo.jpg"
import once from "@/assets/galeria/once.jpg"
import reunion from "@/assets/galeria/reunion.jpg"
import voluntario from "@/assets/galeria/voluntario.jpg"

const fotos: { src: StaticImageData; alt: string; titulo: string }[] = [
  { src: grupo, alt: "Equipo Salas AM en terreno", titulo: "Equipo en terreno" },
  { src: once, alt: "Compartiendo once con adultos mayores", titulo: "Once compartida" },
  { src: reunion, alt: "Reunión comunitaria", titulo: "Reunión comunitaria" },
  { src: capacitacion, alt: "Capacitación del equipo", titulo: "Capacitación" },
  { src: voluntario, alt: "Voluntario en actividad", titulo: "Voluntariado" },
  { src: entrega, alt: "Entrega en ELEAM Portezuelo", titulo: "ELEAM Portezuelo" },
]

export function Galeria() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % fotos.length), 4500)
    return () => clearInterval(t)
  }, [])

  const prev = () => setI((v) => (v - 1 + fotos.length) % fotos.length)
  const next = () => setI((v) => (v + 1) % fotos.length)

  return (
    <section id="galeria" className="border-t border-slate-200 bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3b9fd0]">
            Galería
          </p>
          <h2 className="mt-2 font-serif text-3xl text-[#14233a] sm:text-4xl">
            Momentos reales en Ñuble
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Actividades, visitas y acompañamiento desde @corp.salasam.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[#f4f8fb] shadow-sm">
          <div className="relative aspect-[16/10] w-full sm:aspect-[21/10]">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0"
              >
                <Image
                  src={fotos[i].src}
                  alt={fotos[i].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1152px"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14233a]/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                  <p className="font-serif text-xl text-white sm:text-2xl">
                    {fotos[i].titulo}
                  </p>
                  <p className="mt-1 text-sm text-white/80">
                    {i + 1} / {fotos.length}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-3">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={prev}
              className="h-10 w-10 rounded-full bg-white/90 shadow-md backdrop-blur"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={next}
              className="h-10 w-10 rounded-full bg-white/90 shadow-md backdrop-blur"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 sm:mt-5 sm:grid sm:grid-cols-6 sm:gap-3 sm:overflow-visible">
          {fotos.map((f, idx) => (
            <button
              key={f.titulo}
              type="button"
              onClick={() => setI(idx)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition sm:h-20 sm:w-auto ${
                idx === i
                  ? "border-[#3b9fd0] opacity-100"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={f.src}
                alt={f.alt}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
