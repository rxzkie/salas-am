import Image from "next/image";
import { AtSign, Mail, MapPin, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import logo from "@/assets/logo-salas-am.jpg";

const links = [
  { href: "/#mision", label: "Misión" },
  { href: "/#galeria", label: "Galería" },
  { href: "/#actividades", label: "Actividades" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
];

const contacts = [
  {
    icon: Phone,
    label: "Llamar",
    value: "+56 9 3005 5007",
    href: "tel:+56930055007",
  },
  {
    icon: Mail,
    label: "Correo",
    value: "adm.salasam@gmail.com",
    href: "mailto:adm.salasam@gmail.com",
  },
  {
    icon: MapPin,
    label: "Dirección",
    value: "Sargeto Aldea 562, Chillán",
    href: "/#contacto",
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#d7e6f2] bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.8fr)_minmax(0,1.1fr)] lg:gap-12">
          <div className="min-w-0">
            <a href="/" className="flex min-w-0 items-center gap-3">
              <Image
                src={logo}
                alt="Logo Salas AM"
                width={56}
                height={56}
                className="size-14 shrink-0 rounded-full object-cover ring-2 ring-[#3b9fd0]/25"
              />
              <span className="min-w-0">
                <span className="block font-[family-name:var(--font-lora)] text-xl leading-tight font-semibold text-balance text-[#c47a2c] sm:text-2xl">
                  Corporación Salas AM
                </span>
                <span className="mt-1 block text-sm text-pretty text-[#5a6d86]">
                  Apoyo psicosocial al adulto mayor
                </span>
              </span>
            </a>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-pretty text-[#5a6d86] sm:text-base">
              Compañía, actividades y acompañamiento para personas mayores en Chillán y la Región de Ñuble.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="h-7 bg-[#e8f4fb] px-3 text-[#3b9fd0]">
                Región de Ñuble
              </Badge>
              <Badge variant="outline" className="h-7 border-[#ead7c0] bg-[#fff4e8] px-3 text-[#c47a2c]">
                Adulto mayor
              </Badge>
            </div>
          </div>
          <nav aria-label="Secciones" className="min-w-0">
            <p className="text-xs font-bold tracking-[0.18em] text-[#c47a2c] uppercase">Sitio</p>
            <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-1">
              {links.map((link) => (
                <Button
                  key={link.href}
                  asChild
                  variant="ghost"
                  className="h-11 justify-start rounded-xl px-3 text-sm font-semibold text-[#14233a] hover:bg-[#e8f4fb] hover:text-[#3b9fd0]"
                >
                  <a href={link.href}>{link.label}</a>
                </Button>
              ))}
            </div>
          </nav>
          <div className="min-w-0">
            <p className="text-xs font-bold tracking-[0.18em] text-[#c47a2c] uppercase">Contacto</p>
            <ul className="mt-3 grid gap-2">
              {contacts.map((item) => (
                <li key={item.label}>
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto min-h-14 w-full justify-start gap-3 rounded-2xl border-[#d7e6f2] bg-[#f7fbfd] px-3 py-2.5 text-left whitespace-normal hover:bg-[#e8f4fb]"
                  >
                    <a href={item.href}>
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fff4e8] text-[#c47a2c]">
                        <item.icon className="size-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-medium text-[#5a6d86]">{item.label}</span>
                        <span className="block text-sm font-semibold break-all text-[#14233a]">{item.value}</span>
                      </span>
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Separator className="my-8 bg-[#d7e6f2] sm:my-10" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 text-sm leading-relaxed text-[#5a6d86]">
            <p>RUT 65.201.627-8 · Chillán, Región de Ñuble</p>
            <p className="mt-1">© {new Date().getFullYear()} Corporación Salas AM</p>
          </div>
          <div className="flex flex-col gap-2 min-[420px]:flex-row">
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full border-[#d7e6f2] px-4 font-semibold text-[#14233a] hover:bg-[#e8f4fb]"
            >
              <a href="https://www.instagram.com/corp.salasam/" target="_blank" rel="noreferrer">
                <AtSign className="size-4 text-[#c47a2c]" />
                @corp.salasam
              </a>
            </Button>
            <Button asChild className="h-11 rounded-full bg-[#3b9fd0] px-4 font-semibold text-white hover:bg-[#2f8bbc]">
              <a href="https://wa.me/56941985077" target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
