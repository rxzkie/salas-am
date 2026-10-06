import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-[#0039a6] focus-visible:ring-3 focus-visible:ring-[#0039a6]/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-[#d52b1e] aria-invalid:ring-3 aria-invalid:ring-[#d52b1e]/20 dark:aria-invalid:border-[#d52b1e]/50 dark:aria-invalid:ring-[#d52b1e]/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-[#0039a6] text-white hover:bg-[#0039a6]/80",
        outline:
          "border-[#d5deee] bg-[#f7f9fc] hover:bg-[#f3f6fb] hover:text-[#111111] aria-expanded:bg-[#f3f6fb] aria-expanded:text-[#111111] dark:border-[#d5deee] dark:bg-white/30 dark:hover:bg-white/50",
        secondary:
          "bg-[#e7eefb] text-[#0039a6] hover:bg-[#d5e2f8] aria-expanded:bg-[#e7eefb] aria-expanded:text-[#0039a6]",
        ghost:
          "hover:bg-[#f3f6fb] hover:text-[#111111] aria-expanded:bg-[#f3f6fb] aria-expanded:text-[#111111] dark:hover:bg-[#f3f6fb]/50",
        destructive:
          "bg-[#d52b1e]/10 text-[#d52b1e] hover:bg-[#d52b1e]/20 focus-visible:border-[#d52b1e]/40 focus-visible:ring-[#d52b1e]/20 dark:bg-[#d52b1e]/20 dark:hover:bg-[#d52b1e]/30 dark:focus-visible:ring-[#d52b1e]/40",
        link: "text-[#0039a6] underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
