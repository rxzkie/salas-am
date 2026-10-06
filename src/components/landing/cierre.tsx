import { Button } from "@/components/ui/button";

export function Cierre() {
  return (
    <section className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-[#c47a2c] px-4 py-12 text-white sm:rounded-[2rem] sm:px-10 sm:py-16">
        <div className="pointer-events-none absolute -top-16 -right-10 size-56 rounded-full bg-white/20 blur-3xl" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">Salas AM</p>
            <h2 className="mt-3 font-[family-name:var(--font-lora)] text-[2.4rem] leading-[0.95] font-semibold text-balance min-[380px]:text-5xl sm:text-6xl">
              Compañía, dignidad y apoyo en Ñuble.
            </h2>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-56">
            <Button asChild className="h-12 rounded-full bg-white px-6 text-base font-semibold text-[#c47a2c] hover:bg-white/90">
              <a href="tel:+56930055007">Llamar al +56 9 3005 5007</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-white/40 bg-transparent px-6 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
            >
              <a href="https://www.instagram.com/corp.salasam/" target="_blank" rel="noreferrer">
                Seguir en Instagram
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
