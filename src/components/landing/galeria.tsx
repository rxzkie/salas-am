"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { galleryPhotos } from "@/lib/media"

export function Galeria() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % galleryPhotos.length), 4500)
    return () => clearInterval(t)
  }, [])

  const prev = () => setI((v) => (v - 1 + galleryPhotos.length) % galleryPhotos.length)
  const next = () => setI((v) => (v + 1) % galleryPhotos.length)

  return (
    <section id="galeria" className="scroll-mt-24 border-t border-[#d7e6f2] bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#3b9fd0] uppercase">Galería</p>
          <h2 className="mt-2 font-[family-name:var(--font-lora)] text-3xl text-[#14233a] sm:text-4xl">
            Momentos reales en Ñuble
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5a6d86] sm:text-base">
            Actividades, visitas y acompañamiento inspirados en @corp.salasam.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[1.5rem] border border-[#d7e6f2] bg-[#f4f8fb] shadow-[0_18px_40px_-28px_rgba(20,35,58,0.45)] sm:rounded-[1.75rem]">
          <div className="relative aspect-[4/5] w-full sm:aspect-[21/10]">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={galleryPhotos[i].src}
                  alt={galleryPhotos[i].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1152px"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14233a]/75 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                  <p className="font-[family-name:var(--font-lora)] text-xl text-white sm:text-2xl">
                    {galleryPhotos[i].titulo}
                  </p>
                  <p className="mt-1 text-sm text-white/80">
                    {i + 1} / {galleryPhotos.length}
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
              className="h-11 w-11 cursor-pointer rounded-full bg-white/90 shadow-md backdrop-blur"
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
              className="h-11 w-11 cursor-pointer rounded-full bg-white/90 shadow-md backdrop-blur"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:grid-cols-4 md:grid-cols-6 sm:gap-3">
          {galleryPhotos.map((foto, idx) => (
            <button
              key={`${foto.titulo}-${idx}`}
              type="button"
              onClick={() => setI(idx)}
              className={`relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border-2 transition ${
                idx === i
                  ? "border-[#c47a2c] opacity-100"
                  : "border-transparent opacity-75 hover:opacity-100"
              }`}
            >
              <Image src={foto.src} alt={foto.alt} fill className="object-cover" sizes="160px" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
