import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { BankAccountsService } from '../../../../../app/services/bankAccountsService'
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber'
import { useDashboard } from '../../components/DashboardContext/useDashboard'

const schema = z.object({
  initialBalance: z.string().min(1, { message: 'Saldo inicial é obrigatório' }),
  name: z.string().min(1, { message: 'Nome da conta é obrigatório' }),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, { message: 'Cor é obrigatória' }),
})

type FormData = z.infer<typeof schema>

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard()

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const queryClient = useQueryClient()
  const { isLoading, mutateAsync } = useMutation(BankAccountsService.create)

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({ ...data, initialBalance: currencyStringToNumber(data.initialBalance) })

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success('Conta foi cadastrada com sucesso!')
      reset({
        initialBalance: '0',
        name: '',
        type: 'CHECKING',
        color: '',
      })
      closeNewAccountModal()
    } catch (error) {
      toast.error('Erro ao cadastrar a conta!')
    }
  })

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
  }
}
