import { Description } from '@/components/ui/form/description'
import { Error } from '@/components/ui/form/error'
import { Label } from '@/components/ui/form/label'

import type { ReactNode } from 'react'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

type FieldWrapperProps = {
  label: undefined | string
  error: undefined | FieldError
  description?: ReactNode
  children: ReactNode
}

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  'children'
> & { registration: Partial<UseFormRegisterReturn> }

export const FieldWrapper = ({
  label,
  error,
  description,
  children,
}: FieldWrapperProps) => {
  return (
    <div>
      <Label error={error?.message}>
        {label}
        <div className="mt-1">{children}</div>
      </Label>
      <Description>{description}</Description>
      <Error error={error?.message} />
    </div>
  )
}
