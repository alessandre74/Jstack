import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts'
import { useCategories } from '../../../../../app/hooks/useCategories'
import { TransactionsService } from '../../../../../app/services/transactionsService'
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber'
import { useDashboard } from '../../components/DashboardContext/useDashboard'

const schema = z.object({
  value: z.string().min(1, { message: 'Informe o valor' }),
  name: z.string().min(1, { message: 'Informe o nome' }),
  categoryId: z.string().min(1, { message: 'Informe a categoria' }),
  bankAccountId: z.string().min(1, { message: 'Informe a conta' }),
  date: z.date(),
})

type FormData = z.infer<typeof schema>

export function useNewTransactionModalController() {
  const { isNewTransactionModalOpen, closeNewTransactionModal, newTransactionType } = useDashboard()

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
  const { accounts } = useBankAccounts()
  const { categories: categoriesList } = useCategories()
  const { isLoading, mutateAsync } = useMutation(TransactionsService.create)

  const categories = useMemo(() => {
    return categoriesList.filter((category) => category.type === newTransactionType)
  }, [categoriesList, newTransactionType])

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      })

      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      toast.success(
        newTransactionType === 'EXPENSE'
          ? 'Despesa cadastrada com sucesso!'
          : 'Receita cadastrada com sucesso!',
      )
      reset({
        bankAccountId: '',
        categoryId: '',
        date: new Date(),
        name: '',
        value: '',
      })
      closeNewTransactionModal()
    } catch (error) {
      toast.success(
        newTransactionType === 'EXPENSE'
          ? 'Errro ao cadastrar a despesa!'
          : 'Errro ao cadastrar a receita!',
      )
    }
  })

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading,
  }
}
