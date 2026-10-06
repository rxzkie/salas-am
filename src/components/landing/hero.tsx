"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import logo from "@/assets/logo-salas-am.jpg"
import capacitacion from "@/assets/galeria/capacitacion.jpg"
import grupo from "@/assets/galeria/grupo.jpg"
import once from "@/assets/galeria/once.jpg"
import reunion from "@/assets/galeria/reunion.jpg"

const slides = [
  { src: grupo, alt: "Equipo Salas AM en terreno" },
  { src: once, alt: "Once con adultos mayores" },
  { src: reunion, alt: "Reunión comunitaria" },
  { src: capacitacion, alt: "Capacitación del equipo" },
]

export function Hero() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-[#f4f8fb] via-white to-[#e8f4fb]">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#3b9fd0]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[#c47a2c]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#3b9fd0]/25 bg-white/80 px-3 py-1.5 text-xs font-medium text-[#14233a] shadow-sm backdrop-blur">
            <MapPin className="h-3.5 w-3.5 text-[#3b9fd0]" />
            Chillán · Región de Ñuble
          </div>

          <div className="flex items-center gap-4">
            <Image
              src={logo}
              alt="Logo Corporación Salas AM"
              width={72}
              height={72}
              className="h-16 w-16 rounded-full border-2 border-white object-cover shadow-md sm:h-[72px] sm:w-[72px]"
              priority
            />
            <h1 className="font-serif text-4xl leading-[1.1] tracking-tight text-[#c47a2c] sm:text-5xl lg:text-[3.25rem]">
              Corporación Salas AM
            </h1>
          </div>

          <p className="max-w-xl text-lg font-semibold leading-snug text-[#14233a] sm:text-xl">
            Apoyo psicosocial al adulto mayor, con compañía y dignidad
          </p>

          <p className="max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
            Acompañamos a personas mayores y sus familias en Ñuble con cercanía,
            escucha y acciones concretas en terreno.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Button
              asChild
              className="h-11 rounded-full bg-[#3b9fd0] px-6 text-white hover:bg-[#2f8abc]"
            >
              <a href="#contacto">
                Escríbenos
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full border-[#c47a2c]/40 bg-white px-6 text-[#c47a2c] hover:bg-[#c47a2c]/5"
            >
              <a href="#galeria">Ver galería</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/80 shadow-xl sm:aspect-[5/6] lg:aspect-[4/5]">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={slides[i].src}
                  alt={slides[i].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 520px"
                  priority
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#14233a]/55 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
              <div className="rounded-2xl bg-white/95 px-3 py-2 shadow-md backdrop-blur">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#3b9fd0]">
                  @corp.salasam
                </p>
                <p className="text-xs font-medium text-[#14233a]">
                  Actividades reales en Ñuble
                </p>
              </div>
              <div className="flex gap-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setI(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === i ? "w-6 bg-white" : "w-2 bg-white/50"
                    }`}
                    aria-label={`Foto ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
            {slides.slice(0, 3).map((s, idx) => (
              <button
                key={s.alt}
                type="button"
                onClick={() => setI(idx)}
                className={`relative aspect-[4/3] overflow-hidden rounded-2xl border-2 transition ${
                  i === idx ? "border-[#3b9fd0]" : "border-transparent opacity-80 hover:opacity-100"
                }`}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
