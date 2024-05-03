import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { useAuth } from '../../../app/hooks/useAuth'
import { authService } from '../../../app/services/authService'
import { SignupParams } from '../../../app/services/authService/signup'

const schema = z.object({
  name: z.string().nonempty('Nome é obrigatório.'),
  email: z.string().nonempty('Email é obrigatório.').email('Informe um e-mail válido'),
  password: z
    .string()
    .nonempty('Senha é obrigatória.')
    .min(8, 'Senha deve conter pelo menos 8 digitos'),
})

type FormData = z.infer<typeof schema>

export function useRegisterController() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data)
    },
  })

  const { signin } = useAuth()

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data)

      signin(accessToken)

      toast.success(accessToken)
    } catch {
      toast.error('Ocorreu um erro ao criar a sua conta!')
    }
  })

  return { handleSubmit, register, errors, isLoading }
}
