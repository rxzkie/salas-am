"use client";

import Image from "next/image";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/assets/logo-salas-am.jpg";

const links = [
  { href: "/#mision", label: "Misión" },
  { href: "/#galeria", label: "Galería" },
  { href: "/#actividades", label: "Actividades" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#d7e6f2] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:h-[4.5rem] sm:px-6">
        <a href="/" className="flex min-w-0 items-center gap-2.5">
          <Image
            src={logo}
            alt="Logo Corporación Salas AM"
            width={48}
            height={48}
            priority
            className="size-10 shrink-0 rounded-full object-cover ring-2 ring-[#3b9fd0]/30 sm:size-11"
          />
          <span className="min-w-0 leading-none">
            <span className="block font-[family-name:var(--font-lora)] text-lg font-semibold tracking-wide text-[#c47a2c] sm:text-xl">
              Salas AM
            </span>
            <span className="hidden truncate text-[0.68rem] font-medium text-[#5a6d86] min-[420px]:block">
              Apoyo al adulto mayor · Ñuble
            </span>
          </span>
        </a>
        <NavigationMenu viewport={false} className="hidden lg:flex">
          <NavigationMenuList className="gap-0.5">
            {links.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink href={link.href} className="h-11 px-3 font-medium text-[#14233a]">
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            asChild
            className="h-11 rounded-full bg-[#c47a2c] px-3.5 font-semibold text-white hover:bg-[#b36b22] sm:px-5"
          >
            <a href="tel:+56930055007">
              <Phone className="size-4" />
              <span className="hidden sm:inline">Llamar</span>
            </a>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="size-11 border-[#d7e6f2] lg:hidden" aria-label="Abrir menú">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,22rem)] gap-0">
              <SheetHeader>
                <SheetTitle className="font-[family-name:var(--font-lora)] text-2xl text-[#c47a2c]">
                  Menú
                </SheetTitle>
                <SheetDescription>Corporación Salas AM</SheetDescription>
              </SheetHeader>
              <nav className="grid gap-1 px-4 pb-6">
                {links.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <a
                      href={link.href}
                      className="flex h-12 items-center rounded-xl px-3 text-base font-medium hover:bg-[#eef5fb]"
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
