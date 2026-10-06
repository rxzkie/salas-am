import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import logo from "@/assets/logo-salas-am.jpg";

const links = [
  { href: "/#mision", label: "Misión" },
  { href: "/#actividades", label: "Actividades" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#d7e6f2] bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src={logo}
              alt="Logo Salas AM"
              width={56}
              height={56}
              className="size-14 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="font-[family-name:var(--font-lora)] text-xl leading-tight font-semibold text-[#c47a2c] sm:text-2xl">
                Corporación Salas AM
              </p>
              <p className="mt-1 text-sm text-[#5a6d86]">Apoyo psicosocial al adulto mayor · Ñuble</p>
            </div>
          </div>
          <nav className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex h-11 items-center rounded-full px-3 text-sm font-semibold text-[#3b9fd0] hover:bg-[#e8f4fb]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <Separator className="bg-[#d7e6f2]" />
        <div className="flex flex-col gap-2 text-sm text-[#5a6d86] sm:flex-row sm:items-center sm:justify-between">
          <p>RUT 65.201.627-8 · Chillán, Región de Ñuble</p>
          <p className="font-[family-name:var(--font-lora)] text-base font-semibold text-[#c47a2c]">
            @corp.salasam
          </p>
        </div>
      </div>
    </footer>
  );
}
