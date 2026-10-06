import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-[#0039a6] focus-visible:ring-[3px] focus-visible:ring-[#0039a6]/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-[#d52b1e] aria-invalid:ring-[#d52b1e]/20 dark:aria-invalid:ring-[#d52b1e]/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-[#0039a6] text-white [a]:hover:bg-[#0039a6]/80",
        secondary:
          "bg-[#e7eefb] text-[#0039a6] [a]:hover:bg-[#e7eefb]/80",
        destructive:
          "bg-[#d52b1e]/10 text-[#d52b1e] focus-visible:ring-[#d52b1e]/20 dark:bg-[#d52b1e]/20 dark:focus-visible:ring-[#d52b1e]/40 [a]:hover:bg-[#d52b1e]/20",
        outline:
          "border-[#d5deee] text-[#111111] [a]:hover:bg-[#f3f6fb] [a]:hover:text-[#3d4d6b]",
        ghost:
          "hover:bg-[#f3f6fb] hover:text-[#3d4d6b] dark:hover:bg-[#f3f6fb]/50",
        link: "text-[#0039a6] underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
