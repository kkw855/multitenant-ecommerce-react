import {
  FieldWrapper,
  type FieldWrapperPassThroughProps,
} from '@/components/ui/form/field-wrapper'
import { cn } from '@/lib/utils'

import type { ComponentProps } from 'react'

export const Input = ({
  className,
  type,
  label,
  error,
  description,
  registration,
  ...props
}: ComponentProps<'input'> & FieldWrapperPassThroughProps) => {
  return (
    <FieldWrapper label={label} error={error} description={description}>
      <input
        type={type}
        aria-invalid={!!error}
        className={cn(
          'w-full h-12 px-3 py-1 font-medium border bg-white rounded-md text-black',
          'placeholder:text-muted-foreground',
          'outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
          'disabled:pointer-events-none disabled:bg-gray-200 disabled:opacity-50',
          className,
        )}
        {...registration}
        {...props}
      />
    </FieldWrapper>
  )
}
