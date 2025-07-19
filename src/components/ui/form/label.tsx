import type { ComponentProps } from 'react'

export const Label = ({
  htmlFor,
  error,
  ...props
}: ComponentProps<'label'> & { error: undefined | string }) => {
  return (
    <label
      htmlFor={htmlFor}
      aria-invalid={!!error}
      className="aria-invalid:text-destructive"
      {...props}
    />
  )
}
