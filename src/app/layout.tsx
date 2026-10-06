import type { Metadata } from "next";
import { Geist, Lora } from "next/font/google";
import { SiteChrome } from "@/components/site-chrome";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Corporación Salas AM · Apoyo al Adulto Mayor en Ñuble",
  description:
    "Corporación de apoyo psicosocial al adulto mayor en la Región de Ñuble. Compañía, actividades y acompañamiento en Chillán.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-CL"
      suppressHydrationWarning
      className={`${geist.variable} ${lora.variable} h-full scroll-smooth antialiased motion-reduce:scroll-auto`}
    >
      <body
        suppressHydrationWarning
        className={`${geist.className} flex min-h-full flex-col overflow-x-hidden text-[#14233a] selection:bg-[#3b9fd0]/25 selection:text-[#14233a]`}
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
