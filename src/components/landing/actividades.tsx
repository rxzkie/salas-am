"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarHeart, Lightbulb, Palette, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import foto1 from "@/assets/galeria/actividad-1.jpg";
import foto2 from "@/assets/galeria/actividad-2.jpg";
import foto4 from "@/assets/galeria/actividad-4.jpg";
import foto5 from "@/assets/galeria/actividad-5.jpg";

const items = [
  {
    icon: Palette,
    title: "Talleres y manualidades",
    text: "Espacios creativos para compartir, estimular memoria y fortalecer la autoestima en comunidad.",
    image: foto1,
  },
  {
    icon: CalendarHeart,
    title: "Actividades de encuentro",
    text: "Jornadas, celebraciones y momentos de compañía para el adulto mayor y sus familias.",
    image: foto2,
  },
  {
    icon: Lightbulb,
    title: "Orientación y apoyo",
    text: "Información clara y acompañamiento psicosocial para resolver dudas y abrir caminos de ayuda.",
    image: foto4,
  },
  {
    icon: Sparkles,
    title: "Presente en Ñuble",
    text: "Acción local en Chillán, con mirada social y compromiso permanente con la tercera edad.",
    image: foto5,
  },
];

export function Actividades() {
  return (
    <section id="actividades" className="scroll-mt-24 bg-[#14233a] px-4 py-16 text-white sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Badge className="h-7 rounded-full bg-[#c47a2c] px-3 text-xs font-bold tracking-[0.16em] text-white uppercase">
          Actividades
        </Badge>
        <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-lora)] text-4xl leading-[1.05] font-semibold text-balance min-[380px]:text-5xl">
          Lo que hacemos, juntos.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
          Fotos reales desde Instagram @corp.salasam: talleres, encuentros y acompañamiento en Ñuble.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
            >
              <Card className="overflow-hidden rounded-3xl border-0 bg-white/10 text-white shadow-none ring-1 ring-white/15">
                <div className="relative h-44 w-full sm:h-52">
                  <Image src={item.image} alt={item.title} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                <CardHeader>
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-[#c47a2c] text-white">
                    <item.icon className="size-5" />
                  </span>
                  <CardTitle className="mt-4 font-[family-name:var(--font-lora)] text-2xl text-white">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-white/75">{item.text}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
