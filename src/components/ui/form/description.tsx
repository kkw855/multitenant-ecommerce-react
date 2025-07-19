import { cn } from '@/lib/utils'

import type { ComponentProps } from 'react'

export const Description = ({ className, ...props }: ComponentProps<'p'>) => {
  return (
    <p className={cn('text-muted-foreground text-sm', className)} {...props} />
  )
}
