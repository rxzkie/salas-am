import { Actividades } from "@/components/landing/actividades";
import { Cierre } from "@/components/landing/cierre";
import { Contacto } from "@/components/landing/contacto";
import { Hero } from "@/components/landing/hero";
import { Marquee } from "@/components/landing/marquee";
import { Mision } from "@/components/landing/mision";
import { Preguntas } from "@/components/landing/preguntas";
import { Nosotros } from "@/components/landing/nosotros";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Marquee />
      <Mision />
      <Actividades />
      <Nosotros />
      <Preguntas />
      <Contacto />
      <Cierre />
    </main>
  );
}
