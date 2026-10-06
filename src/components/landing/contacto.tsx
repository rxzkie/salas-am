import { AtSign, MapPin, Phone, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const channels = [
  {
    icon: Phone,
    title: "Teléfono",
    text: "+56 9 3005 5007",
    href: "tel:+56930055007",
    cta: "Llamar ahora",
  },
  {
    icon: AtSign,
    title: "Instagram",
    text: "@corp.salasam",
    href: "https://www.instagram.com/corp.salasam/",
    cta: "Ver perfil",
  },
  {
    icon: Share2,
    title: "Facebook",
    text: "Corporación Salas AM",
    href: "https://www.facebook.com/search/top?q=Corporaci%C3%B3n%20Salas%20AM",
    cta: "Buscar página",
  },
];

export function Contacto() {
  return (
    <section id="contacto" className="scroll-mt-24 bg-[#e8f4fb] px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold tracking-[0.2em] text-[#c47a2c] uppercase">Contacto</p>
        <h2 className="mt-2 font-[family-name:var(--font-lora)] text-4xl leading-[1.05] font-semibold text-balance text-[#14233a] min-[380px]:text-5xl">
          Escríbenos. Estamos para ayudar.
        </h2>
        <p className="mt-4 flex max-w-xl items-start gap-2 text-base leading-relaxed text-[#5a6d86] sm:text-lg">
          <MapPin className="mt-1 size-4 shrink-0 text-[#3b9fd0]" />
          Sargeto Aldea 562, Chillán · Región de Ñuble
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => (
            <Card key={channel.title} className="rounded-3xl border-0 bg-white shadow-none ring-1 ring-[#d7e6f2]">
              <CardHeader>
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#fff4e8] text-[#c47a2c]">
                  <channel.icon className="size-5" />
                </span>
                <CardTitle className="mt-4 font-[family-name:var(--font-lora)] text-2xl text-[#14233a]">
                  {channel.title}
                </CardTitle>
                <CardDescription className="text-base text-[#5a6d86]">{channel.text}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  className="h-11 w-full rounded-full bg-[#3b9fd0] font-semibold text-white hover:bg-[#2f8bbc]"
                >
                  <a href={channel.href} target={channel.href.startsWith("http") ? "_blank" : undefined} rel={channel.href.startsWith("http") ? "noreferrer" : undefined}>
                    {channel.cta}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
