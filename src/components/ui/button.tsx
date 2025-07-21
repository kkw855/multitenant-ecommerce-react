import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

import type { ComponentProps } from 'react'

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md cursor-pointer shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:inline disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border',
        ghost: 'hover:bg-accent',
        elevated:
          'border bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[4px] transition-all',
      },
      size: {
        default: 'h-12 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-10 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-12 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export const Button = ({
  className,
  variant,
  size,
  children,
  asChild = false,
  isLoading = false,
  ...props
}: ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isLoading?: boolean
  }) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading}
      {...props}
    >
      <span>
        {isLoading && (
          <LoaderCircle className="animate-spin mr-2 inline-flex" />
        )}
        {children}
      </span>
    </Comp>
  )
}
