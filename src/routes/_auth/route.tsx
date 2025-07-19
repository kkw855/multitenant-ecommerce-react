import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    console.log('_auth route.tsx beforeLoad', context)
    if (context.accessToken) {
      throw redirect({
        to: '/',
      })
    }
  },
})
