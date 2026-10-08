"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import logo from "@/assets/logo-salas-am.jpg"
import { heroSlides } from "@/lib/media"

export function Hero() {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((v) => (v + 1) % heroSlides.length), 5000)
    return () => clearInterval(t)
  }, [reduce])

  return (
    <section className="relative isolate min-h-[calc(100dvh-4rem)] overflow-hidden sm:min-h-[calc(100dvh-4.5rem)]">
      <div className="absolute inset-0">
        {heroSlides.map((slide, idx) => (
          <Image
            key={slide.alt}
            src={slide.src}
            alt={idx === i ? slide.alt : ""}
            fill
            priority={idx === 0}
            aria-hidden={idx !== i}
            className={`object-cover transition-opacity duration-1000 ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
            sizes="100vw"
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,35,58,0.35)_0%,rgba(20,35,58,0.2)_38%,rgba(20,35,58,0.78)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(196,122,44,0.28),transparent_45%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-6xl flex-col justify-end px-4 pb-8 pt-10 sm:min-h-[calc(100dvh-4.5rem)] sm:px-6 sm:pb-12 sm:pt-14">
        <div className="max-w-2xl motion-safe:animate-[hero-rise_0.7s_ease-out]">
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt="Logo Corporación Salas AM"
              width={64}
              height={64}
              priority
              className="size-12 rounded-full object-cover ring-2 ring-white/80 sm:size-14"
            />
            <p className="text-xs font-semibold tracking-[0.2em] text-[#f3d2a4] uppercase sm:text-sm">
              Corporación · Ñuble
            </p>
          </div>
          <h1 className="mt-4 font-[family-name:var(--font-lora)] text-5xl leading-[0.92] font-semibold text-white min-[380px]:text-6xl sm:text-7xl lg:text-8xl">
            Salas <span className="text-[#c47a2c]">AM</span>
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/90 sm:text-xl">
            Apoyo psicosocial al adulto mayor, con compañía y dignidad.
          </p>
          <div className="mt-6 flex flex-col gap-2.5 min-[420px]:flex-row">
            <Button
              asChild
              className="h-12 cursor-pointer rounded-full bg-[#c47a2c] px-6 text-base font-semibold text-white hover:bg-[#b36b22]"
            >
              <a href="#contacto">
                Escríbenos
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 cursor-pointer rounded-full border-white/30 bg-white/10 px-6 text-base font-semibold text-white backdrop-blur hover:bg-white/20"
            >
              <a href="tel:+56930055007">
                <Phone className="size-4" />
                Llamar
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 cursor-pointer rounded-full border-white/30 bg-white/10 px-6 text-base font-semibold text-white backdrop-blur hover:bg-white/20"
            >
              <a href="/rifas">Comprar número</a>
            </Button>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="truncate text-xs font-medium tracking-[0.14em] text-white/70 uppercase">
            @corp.salasam · {heroSlides[i].alt}
          </p>
          <div className="flex gap-1.5">
            {heroSlides.map((slide, idx) => (
              <button
                key={slide.alt}
                type="button"
                onClick={() => setI(idx)}
                aria-label={slide.alt}
                className={`h-2.5 cursor-pointer rounded-full transition ${
                  idx === i ? "w-7 bg-[#c47a2c]" : "w-2.5 bg-white/55 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
