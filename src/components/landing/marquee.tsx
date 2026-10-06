const words = [
  "Compañía",
  "Dignidad",
  "Ñuble",
  "Apoyo psicosocial",
  "Actividades",
  "Familias",
  "Adulto mayor",
];

export function Marquee() {
  return (
    <div className="bg-[#14233a] py-3.5 text-white">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4">
        {words.map((word) => (
          <li
            key={word}
            className="font-[family-name:var(--font-lora)] text-base tracking-wide sm:text-xl"
          >
            {word}
            <span className="ml-3 text-[#c47a2c]">✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
