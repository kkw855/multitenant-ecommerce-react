import { cn } from '@/lib/utils'

import type { ComponentProps } from 'react'

export const Error = ({
  className,
  error,
  ...props
}: ComponentProps<'p'> & { error: undefined | string }) => {
  return (
    !!error && (
      <p className={cn('text-destructive text-sm', className)} {...props}>
        {error}
      </p>
    )
  )
}
