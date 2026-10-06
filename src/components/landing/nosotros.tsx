import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const facts = [
  { label: "Nombre", value: "Corporación Salas AM" },
  { label: "Razón social", value: "Corporación para el Apoyo Psicosocial del Adulto Mayor Salas" },
  { label: "RUT", value: "65.201.627-8" },
  { label: "Sede", value: "Sargeto Aldea 562, Chillán" },
  { label: "Región", value: "Ñuble, Chile" },
];

export function Nosotros() {
  return (
    <section id="nosotros" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div>
          <Badge className="h-7 rounded-full bg-[#e8f4fb] px-3 text-xs font-bold tracking-[0.16em] text-[#3b9fd0] uppercase">
            Quiénes somos
          </Badge>
          <h2 className="mt-3 font-[family-name:var(--font-lora)] text-4xl leading-[1.05] font-semibold text-balance text-[#14233a] min-[380px]:text-5xl">
            Una corporación hecha para acompañar.
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-pretty text-[#5a6d86] sm:text-lg">
            <p>
              Corporación Salas AM es una organización privada de Chillán dedicada al apoyo psicosocial del adulto mayor. Nuestro trabajo se centra en la tercera edad, con una mirada social, cercana y responsable.
            </p>
            <p>
              Nos encuentras en Instagram como <span className="font-semibold text-[#14233a]">@corp.salasam</span> y en Facebook como Corporación Salas AM. Si necesitas orientarte o sumarte, escríbenos.
            </p>
          </div>
        </div>
        <div className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-[#d7e6f2] sm:p-8">
          <p className="font-[family-name:var(--font-lora)] text-2xl font-semibold text-[#c47a2c]">Datos institucionales</p>
          <Separator className="my-5 bg-[#d7e6f2]" />
          <dl className="grid gap-4">
            {facts.map((fact) => (
              <div key={fact.label} className="grid gap-1 min-[480px]:grid-cols-[8.5rem_1fr] min-[480px]:gap-4">
                <dt className="text-sm font-semibold tracking-wide text-[#3b9fd0] uppercase">{fact.label}</dt>
                <dd className="text-base leading-snug break-words text-[#14233a]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
