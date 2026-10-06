"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, HeartHandshake, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import logo from "@/assets/logo-salas-am.jpg";
import foto1 from "@/assets/galeria/actividad-1.jpg";
import foto2 from "@/assets/galeria/actividad-2.jpg";
import foto3 from "@/assets/galeria/actividad-3.jpg";
import foto4 from "@/assets/galeria/actividad-4.jpg";
import foto5 from "@/assets/galeria/actividad-5.jpg";
import foto6 from "@/assets/galeria/actividad-6.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const collage = [
  { src: foto1, className: "col-span-2 row-span-2", alt: "Actividad Corporación Salas AM" },
  { src: foto2, className: "col-span-1 row-span-1", alt: "Encuentro comunitario Salas AM" },
  { src: foto3, className: "col-span-1 row-span-1", alt: "Acompañamiento adulto mayor" },
  { src: foto4, className: "col-span-1 row-span-1", alt: "Jornada social en Ñuble" },
  { src: foto5, className: "col-span-1 row-span-1", alt: "Talleres Salas AM" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#e8f4fb_0%,#fff8ef_45%,#f4f8fb_100%)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] size-[18rem] rounded-full bg-[#3b9fd0]/25 blur-3xl sm:size-[28rem]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 left-[-8%] size-[16rem] rounded-full bg-[#c47a2c]/20 blur-3xl sm:size-[24rem]"
        animate={{ scale: [1.05, 1, 1.05], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-20">
        <div className="min-w-0 max-w-2xl">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
            <Badge className="h-8 max-w-full gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-[#3b9fd0] ring-1 ring-[#3b9fd0]/25 sm:text-sm">
              <MapPin className="size-3.5 shrink-0" />
              <span className="truncate">Chillán · Región de Ñuble</span>
            </Badge>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-5 flex min-w-0 flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center"
          >
            <Image
              src={logo}
              alt="Logo Corporación Salas AM"
              width={56}
              height={56}
              priority
              className="size-12 shrink-0 rounded-full object-cover ring-2 ring-[#c47a2c]/35 sm:size-14"
            />
            <p className="min-w-0 font-[family-name:var(--font-lora)] text-[2rem] leading-[0.95] font-semibold text-balance text-[#c47a2c] min-[380px]:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
              Corporación Salas AM
            </p>
          </motion.div>

          <motion.h1
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 max-w-xl text-xl leading-tight font-semibold text-pretty text-[#14233a] sm:text-3xl"
          >
            Apoyo psicosocial al adulto mayor, con compañía y dignidad.
          </motion.h1>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 max-w-lg text-base leading-relaxed text-pretty text-[#5a6d86] sm:text-lg"
          >
            Nuestra misión está en ayudar en el ámbito social. Acompañamos a personas mayores y sus familias con actividades, orientación y presencia cercana en Ñuble.
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex w-full flex-col gap-3 sm:flex-row"
          >
            <Button
              asChild
              className="h-12 w-full rounded-full bg-[#3b9fd0] px-6 text-base font-semibold text-white hover:bg-[#2f8bbc] sm:w-auto"
            >
              <a href="/#contacto">
                Escríbenos
                <ArrowRight />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 w-full rounded-full border-[#c47a2c]/40 bg-white px-6 text-base font-semibold text-[#c47a2c] hover:bg-[#fff4e8] sm:w-auto"
            >
              <a href="/#actividades">
                <HeartHandshake className="size-4" />
                Ver actividades
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-lg pb-14 sm:pb-10"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="overflow-hidden rounded-[1.5rem] border-0 bg-white/80 p-2.5 shadow-[0_24px_60px_-24px_rgba(20,35,58,0.35)] ring-1 ring-[#d7e6f2] backdrop-blur-sm sm:rounded-[1.75rem] sm:p-4">
            <div className="grid h-[18rem] grid-cols-2 grid-rows-3 gap-1.5 min-[400px]:h-[20rem] sm:h-[26rem] sm:gap-3">
              {collage.map((item, index) => (
                <motion.div
                  key={item.alt + index}
                  className={`relative min-h-0 overflow-hidden rounded-xl sm:rounded-2xl ${item.className}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 + index * 0.08, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 20rem, 45vw"
                    className="object-cover"
                    priority={index < 2}
                  />
                </motion.div>
              ))}
            </div>
          </Card>

          <motion.div
            className="absolute bottom-0 left-2 right-2 sm:-left-3 sm:right-auto sm:bottom-2 sm:w-64"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.45 }}
          >
            <Card className="rounded-2xl border-0 bg-[#14233a] p-3 text-white shadow-lg ring-0 sm:p-4">
              <div className="flex min-w-0 items-center gap-3">
                <Image
                  src={foto6}
                  alt="Momento Salas AM"
                  width={52}
                  height={52}
                  className="size-11 shrink-0 rounded-xl object-cover sm:size-12"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">Desde @corp.salasam</p>
                  <p className="truncate text-xs text-white/70">Actividades reales en Ñuble</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
