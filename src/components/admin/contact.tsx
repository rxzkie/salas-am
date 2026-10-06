function digits(phone?: string | null) {
  const raw = (phone ?? "").replace(/\D/g, "")
  if (!raw) return ""
  if (raw.startsWith("569") || raw.startsWith("56")) return raw
  if (raw.startsWith("9") && raw.length === 9) return `56${raw}`
  return raw
}

export function ContactLines({
  person,
}: {
  person: { name: string; email: string; phone: string | null }
}) {
  const phone = digits(person.phone)
  return (
    <div className="min-w-0 space-y-1.5">
      <p className="font-semibold text-[#14233a]">{person.name}</p>
      <a
        href={`mailto:${person.email}`}
        className="block truncate text-sm text-[#3b9fd0] hover:text-[#2f8abc]"
      >
        {person.email}
      </a>
      {phone ? (
        <div className="flex flex-wrap gap-2 pt-1">
          <a
            href={`tel:+${phone}`}
            className="inline-flex h-10 items-center rounded-full bg-[#14233a] px-3.5 text-sm font-semibold text-white"
          >
            +{phone}
          </a>
          <a
            href={`https://wa.me/${phone}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center rounded-full bg-[#128C7E] px-3.5 text-sm font-semibold text-white"
          >
            WhatsApp
          </a>
        </div>
      ) : (
        <p className="text-sm font-medium text-[#b42318]">Sin teléfono</p>
      )}
    </div>
  )
}
