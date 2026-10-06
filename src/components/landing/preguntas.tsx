"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    q: "¿Qué es Corporación Salas AM?",
    a: "Somos una corporación de Chillán dedicada al apoyo psicosocial del adulto mayor en la Región de Ñuble. Trabajamos por el bienestar, la compañía y la dignidad de la tercera edad.",
  },
  {
    q: "¿Dónde están ubicados?",
    a: "Nuestra sede institucional figura en Sargeto Aldea 562, Chillán. Atendemos y nos vinculamos con la comunidad de la Región de Ñuble.",
  },
  {
    q: "¿Cómo puedo contactarlos?",
    a: "Puedes escribirnos por Instagram @corp.salasam, buscar Corporación Salas AM en Facebook o llamar al +56 9 3005 5007.",
  },
  {
    q: "¿Qué tipo de apoyo entregan?",
    a: "Ofrecemos acompañamiento, orientación y actividades de encuentro orientadas al adulto mayor y sus familias, con un enfoque social y cercano.",
  },
];

export function Preguntas() {
  return (
    <section id="preguntas" className="scroll-mt-24 mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="text-xs font-bold tracking-[0.2em] text-[#3b9fd0] uppercase">Preguntas</p>
      <h2 className="mt-2 font-[family-name:var(--font-lora)] text-4xl leading-[1.05] font-semibold text-balance text-[#14233a] min-[380px]:text-5xl">
        Lo que nos consultan
      </h2>
      <Accordion type="single" collapsible className="mt-8 gap-3">
        {items.map((item) => (
          <AccordionItem key={item.q} value={item.q} className="rounded-2xl border border-[#d7e6f2] bg-white px-4 not-last:border-b">
            <AccordionTrigger className="py-4 text-left text-base leading-snug font-semibold hover:no-underline sm:text-lg">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-base leading-relaxed text-pretty text-[#5a6d86]">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
