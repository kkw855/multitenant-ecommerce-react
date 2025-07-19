import { effectTsResolver } from '@hookform/resolvers/effect-ts'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useForm, useWatch } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Error } from '@/components/ui/form/error'
import { Input } from '@/components/ui/form/input'
import { useAuth } from '@/features/auth/auth-provider'
import { SignUpSchema, type SignUp } from '@/features/sign-up/api/sign-up'

export const Route = createFileRoute('/_auth/sign-up')({
  component: SignUp,
})

function SignUp() {
  const { signUp } = useAuth()

  const navigate = useNavigate()

  // const signUpMutation = useSignUp({
  //   mutationConfig: {
  //     onSuccess: async () => {
  //       toast.success('Sign up successful')
  //       // await navigate({ to: '/' })
  //     },
  //     onError: (error) => {
  //       console.log('mutation onError', error, error.response?.data)
  //       if (error.status === 400 && error.response?.data) {
  //         setError('root.serverError', {
  //           type: 'server',
  //           message:
  //             (error.response.data as string) ||
  //             'An unexpected error occurred.',
  //         })
  //         toast.error(error.message)
  //       }
  //     },
  //   },
  // })

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUp>({
    resolver: effectTsResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
    mode: 'all',
  })
  const onSubmit = handleSubmit(async (data) => {
    const response = await signUp({ data })
    console.log('onSubmit', response)
    await navigate({ to: '/' })
  })
  const username = useWatch({ control, name: 'username' })

  console.log('Form', errors, isValid)

  return (
    <div className="h-screen w-full grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-[#F4F4F0] lg:col-span-3">
        <form onSubmit={onSubmit} className="flex flex-col gap-8 p-4 lg:p-16">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="text-2xl font-semibold font-poppins">
              funroad
            </Link>
            <Button variant="ghost" className="underline" asChild>
              <Link to="/sign-in">Sign in</Link>
            </Button>
          </div>
          <h1 className="text-4xl font-medium">
            Join over 1,580 creators earning money on Funroad.
          </h1>
          <Input
            label="Username"
            error={errors['username']}
            description={
              username &&
              !errors['username'] && (
                <span>
                  {/* TODO: Use proper method to generate preview url */}
                  Your store will be available at <strong>{username}</strong>
                </span>
              )
            }
            registration={register('username')}
          />
          <Input
            label="Email"
            error={errors['email']}
            registration={register('email')}
          />
          <Input
            label="Password"
            type="password"
            error={errors['password']}
            registration={register('password')}
          />
          <Error error={errors.root?.serverError?.message} />
          <Button
            type="submit"
            variant="elevated"
            size="lg"
            className="bg-black text-white hover:bg-pink-400 hover:text-primary"
            isLoading={isSubmitting}
          >
            Create account
          </Button>
        </form>
      </div>
      <div className="hidden lg:block lg:col-span-2 bg-[url('./assets/images/auth-bg.png')] bg-cover bg-center" />
    </div>
  )
}
