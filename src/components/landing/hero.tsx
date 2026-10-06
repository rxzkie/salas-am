import Image from "next/image";
import { ArrowRight, HeartHandshake, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-salas-am.jpg";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#e8f4fb_0%,#fff8ef_48%,#f4f8fb_100%)]" />
      <div className="pointer-events-none absolute -top-24 right-[-10%] size-[28rem] rounded-full bg-[#3b9fd0]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-[-8%] size-[24rem] rounded-full bg-[#c47a2c]/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-20">
        <div className="min-w-0 max-w-2xl">
          <Badge className="h-8 gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-[#3b9fd0] ring-1 ring-[#3b9fd0]/25 sm:text-sm">
            <MapPin className="size-3.5 shrink-0" />
            Chillán · Región de Ñuble
          </Badge>
          <p className="mt-5 font-[family-name:var(--font-lora)] text-4xl leading-[0.95] font-semibold text-balance text-[#c47a2c] min-[380px]:text-5xl sm:text-6xl lg:text-7xl">
            Corporación Salas AM
          </p>
          <h1 className="mt-4 max-w-xl text-2xl leading-tight font-semibold text-pretty text-[#14233a] sm:text-3xl">
            Apoyo psicosocial al adulto mayor, con compañía y dignidad.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-pretty text-[#5a6d86] sm:text-lg">
            Nuestra misión está en ayudar en el ámbito social. Acompañamos a personas mayores y sus familias con actividades, orientación y presencia cercana en Ñuble.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <div className="overflow-hidden rounded-[2rem] bg-white p-6 shadow-[0_24px_60px_-24px_rgba(20,35,58,0.35)] ring-1 ring-[#d7e6f2] sm:p-8">
            <Image
              src={logo}
              alt="Logo oficial Corporación Salas AM"
              priority
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="mx-auto h-auto w-full max-w-sm"
            />
          </div>
          <p className="mt-4 text-center text-sm font-medium tracking-wide text-[#5a6d86] uppercase">
            Corporación de apoyo social al adulto mayor
          </p>
        </div>
      </div>
    </section>
  );
}
