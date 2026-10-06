import * as React from "react"
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-[#d5deee] bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-[#3d4d6b] focus-visible:border-[#0039a6] focus-visible:ring-3 focus-visible:ring-[#0039a6]/50 disabled:cursor-not-allowed disabled:bg-white/50 disabled:opacity-50 aria-invalid:border-[#d52b1e] aria-invalid:ring-3 aria-invalid:ring-[#d52b1e]/20 md:text-sm dark:bg-white/30 dark:disabled:bg-white/80 dark:aria-invalid:border-[#d52b1e]/50 dark:aria-invalid:ring-[#d52b1e]/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
