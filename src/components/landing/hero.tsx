"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { ArrowRight, MapPin, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import logo from "@/assets/logo-salas-am.jpg"
import { heroSlides } from "@/lib/media"

export function Hero() {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((v) => (v + 1) % heroSlides.length), 4500)
    return () => clearInterval(t)
  }, [reduce])

  const next = heroSlides[(i + 1) % heroSlides.length]

  return (
    <section className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-16 size-72 rounded-full bg-[#3b9fd0]/30 blur-3xl sm:size-[28rem]" />
        <div className="absolute top-10 -right-20 size-72 rounded-full bg-[#c47a2c]/25 blur-3xl sm:size-[26rem]" />
        <div className="absolute bottom-0 left-1/3 size-64 rounded-full bg-white/80 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-14 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:py-16">
        <div className="min-w-0 motion-safe:animate-[hero-rise_0.7s_ease-out]">
          <Badge className="h-8 gap-1.5 rounded-full border border-[#3b9fd0]/20 bg-white/80 px-3 text-xs font-semibold text-[#14233a] shadow-sm backdrop-blur">
            <MapPin className="size-3.5 text-[#3b9fd0]" />
            Chillán · Región de Ñuble
          </Badge>

          <div className="mt-5 flex items-center gap-3">
            <Image
              src={logo}
              alt="Logo Corporación Salas AM"
              width={72}
              height={72}
              priority
              className="size-14 shrink-0 rounded-full object-cover shadow-md ring-4 ring-white sm:size-16"
            />
            <p className="font-[family-name:var(--font-lora)] text-sm font-semibold tracking-[0.16em] text-[#c47a2c] uppercase sm:text-base">
              Corporación
            </p>
          </div>

          <h1 className="mt-3 font-[family-name:var(--font-lora)] text-[2.75rem] leading-[0.92] font-semibold text-balance text-[#14233a] min-[380px]:text-6xl sm:text-7xl lg:text-[5.4rem]">
            Salas <span className="text-[#c47a2c]">AM</span>
          </h1>

          <p className="mt-4 max-w-xl text-lg leading-snug font-semibold text-pretty text-[#14233a] sm:text-2xl">
            Apoyo psicosocial al adulto mayor, con compañía y dignidad.
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-pretty text-[#5a6d86] sm:text-base">
            Acompañamos a personas mayores y sus familias en Ñuble con cercanía, escucha y acciones concretas en terreno.
          </p>

          <div className="mt-6 flex flex-col gap-2.5 min-[420px]:flex-row">
            <Button
              asChild
              className="h-12 rounded-full bg-[#c47a2c] px-6 text-base font-semibold text-white hover:bg-[#b36b22]"
            >
              <a href="#contacto">
                Escríbenos
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-[#d7e6f2] bg-white/80 px-6 text-base font-semibold text-[#14233a] backdrop-blur hover:bg-white"
            >
              <a href="tel:+56930055007">
                <Phone className="size-4 text-[#3b9fd0]" />
                Llamar
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-[#c47a2c]/40 bg-white/80 px-6 text-base font-semibold text-[#c47a2c] hover:bg-white"
            >
              <a href="/rifas">Comprar número</a>
            </Button>
          </div>
        </div>

        <div className="relative min-w-0 motion-safe:animate-[hero-rise_0.8s_ease-out]">
          <div className="pointer-events-none absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-[#3b9fd0]/35 via-white to-[#c47a2c]/40 blur-[2px] sm:-inset-3 sm:rounded-[2.25rem]" />
          <div className="relative aspect-[5/4] overflow-hidden rounded-[1.6rem] shadow-[0_24px_60px_-24px_rgba(20,35,58,0.45)] ring-1 ring-white sm:rounded-[2rem] lg:aspect-[4/5]">
            {heroSlides.map((slide, idx) => (
              <Image
                key={slide.alt}
                src={slide.src}
                alt={idx === i ? slide.alt : ""}
                fill
                priority={idx === 0}
                aria-hidden={idx !== i}
                className={`object-cover transition-opacity duration-700 ${idx === i ? "opacity-100" : "opacity-0"}`}
                sizes="(max-width: 1024px) 100vw, 540px"
              />
            ))}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14233a]/70 via-[#14233a]/10 to-transparent" />
            <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 sm:inset-x-4 sm:bottom-4">
              <div className="min-w-0 rounded-2xl bg-white/95 px-3 py-2 shadow-lg backdrop-blur">
                <p className="text-[10px] font-bold tracking-[0.16em] text-[#3b9fd0] uppercase">@corp.salasam</p>
                <p className="line-clamp-2 text-sm leading-snug font-semibold text-[#14233a]">{heroSlides[i].alt}</p>
              </div>
            </div>
          </div>

          <div className="absolute -top-3 -right-1 hidden w-28 overflow-hidden rounded-2xl shadow-xl ring-4 ring-white sm:block lg:-right-2 lg:w-36">
            <div className="relative aspect-square">
              <Image src={next.src} alt="" fill className="object-cover" sizes="144px" />
            </div>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-2 sm:mt-4 sm:gap-3">
            {heroSlides.map((slide, idx) => (
              <button
                key={slide.alt}
                type="button"
                onClick={() => setI(idx)}
                aria-label={slide.alt}
                className={`relative aspect-[4/3] min-h-14 cursor-pointer overflow-hidden rounded-xl ring-2 transition sm:rounded-2xl ${
                  i === idx ? "ring-[#c47a2c]" : "ring-transparent opacity-80 hover:opacity-100"
                }`}
              >
                <Image src={slide.src} alt="" fill className="object-cover" sizes="140px" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
