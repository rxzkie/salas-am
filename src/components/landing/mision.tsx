import { HandHeart, Home, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const pillars = [
  {
    icon: HandHeart,
    title: "Acompañamiento",
    text: "Estamos presentes para escuchar, orientar y acompañar a personas mayores y a quienes cuidan de ellas.",
  },
  {
    icon: Users,
    title: "Comunidad",
    text: "Creamos espacios de encuentro, actividades compartidas y redes de apoyo en Chillán y la Región de Ñuble.",
  },
  {
    icon: Home,
    title: "Cercanía",
    text: "Trabajamos con un enfoque humano y local: ayuda concreta, lenguaje claro y puertas abiertas.",
  },
];

export function Mision() {
  return (
    <section id="mision" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold tracking-[0.2em] text-[#3b9fd0] uppercase">Nuestra misión</p>
        <h2 className="mt-2 max-w-3xl font-[family-name:var(--font-lora)] text-4xl leading-[1.05] font-semibold text-balance text-[#14233a] min-[380px]:text-5xl">
          Ayudar en el ámbito social, con foco en el adulto mayor.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-[#5a6d86] sm:text-lg">
          Somos la Corporación para el Apoyo Psicosocial del Adulto Mayor Salas. Trabajamos para que ninguna persona mayor se sienta sola: promovemos bienestar, participación y vínculos reales.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {pillars.map((pillar) => (
            <Card key={pillar.title} className="h-full rounded-3xl border-0 bg-white shadow-none ring-1 ring-[#d7e6f2]">
              <CardHeader>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#e8f4fb] text-[#3b9fd0]">
                  <pillar.icon className="size-5" />
                </span>
                <CardTitle className="mt-4 font-[family-name:var(--font-lora)] text-2xl text-[#14233a]">
                  {pillar.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-[#5a6d86]">{pillar.text}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
