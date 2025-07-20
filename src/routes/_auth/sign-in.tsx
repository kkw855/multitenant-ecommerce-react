import { effectTsResolver } from '@hookform/resolvers/effect-ts'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/form/input'
import { useAuth } from '@/components/layouts/auth-provider'
import { type Login, LoginSchema } from '@/features/login/api/login'

export const Route = createFileRoute('/_auth/sign-in')({
  component: SignIn,
})

function SignIn() {
  const { login } = useAuth()

  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<Login>({
    resolver: effectTsResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'all',
  })
  const onSubmit = handleSubmit(async (data) => {
    const response = await login({ data })
    console.log('onSubmit', response)
    await navigate({ to: '/' })
  })

  return (
    <div className="h-screen w-full grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-[#F4F4F0] lg:col-span-3">
        <form onSubmit={onSubmit} className="flex flex-col gap-8 p-4 lg:p-16">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="text-2xl font-semibold font-poppins">
              funroad
            </Link>
            <Button type="button" variant="ghost" className="underline" asChild>
              <Link to="/sign-up">Sign up</Link>
            </Button>
          </div>
          <h1 className="text-4xl font-medium">Welcome back to Funroad.</h1>
          <Input
            label="Username"
            error={errors['username']}
            registration={register('username')}
          />
          <Input
            type="password"
            label="Password"
            error={errors['password']}
            registration={register('password')}
          />
          {/* TODO: isloading */}
          <Button
            type="submit"
            variant="elevated"
            size="lg"
            className="bg-black text-white hover:bg-pink-400 hover:text-primary"
            isLoading={isSubmitting}
          >
            Login
          </Button>
        </form>
      </div>
      <div className="hidden lg:block lg:col-span-2 bg-[url('./assets/images/auth-bg.png')] bg-cover bg-center" />
    </div>
  )
}
