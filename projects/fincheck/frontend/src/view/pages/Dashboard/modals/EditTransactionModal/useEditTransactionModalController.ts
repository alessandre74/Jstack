import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { Transaction } from '../../../../../app/entities/Transaction'
import { useBankAccounts } from '../../../../../app/hooks/useBankAccounts'
import { useCategories } from '../../../../../app/hooks/useCategories'
import { TransactionsService } from '../../../../../app/services/transactionsService'
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber'

const schema = z.object({
  value: z.union([z.string().min(1, { message: 'Informe o valor' }), z.number()]),
  name: z.string().min(1, { message: 'Informe o nome' }),
  categoryId: z.string().min(1, { message: 'Informe a categoria' }),
  bankAccountId: z.string().min(1, { message: 'Informe a conta' }),
  date: z.date(),
})

type FormData = z.infer<typeof schema>

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void,
) {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction?.date) : new Date(),
    },
  })

  const queryClient = useQueryClient()
  const { accounts } = useBankAccounts()
  const { categories: categoriesList } = useCategories()
  const { isLoading, mutateAsync: uptadeTransaction } = useMutation(TransactionsService.update)
  const { isLoading: isLoadingDelete, mutateAsync: removeTransaction } = useMutation(
    TransactionsService.remove,
  )

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await uptadeTransaction({
        ...data,
        id: transaction!.id,
        type: transaction!.type,
        value: currencyStringToNumber(data.value),
        date: data.date.toISOString(),
      })

      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success(
        transaction!.type === 'EXPENSE'
          ? 'A Despesa editada com sucesso!'
          : 'A Receita editada com sucesso!',
      )

      onClose()
    } catch (error) {
      toast.success(
        transaction!.type === 'EXPENSE'
          ? 'Errro ao editar a despesa!'
          : 'Errro ao editar a receita!',
      )
    }
  })

  const categories = useMemo(() => {
    return categoriesList.filter((category) => category.type === transaction?.type)
  }, [categoriesList, transaction])

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id)
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success(
        transaction!.type === 'EXPENSE'
          ? 'A despesa foi deletada com sucesso!'
          : 'A receita foi deletada com sucesso!',
      )
      onClose()
    } catch (error) {
      toast.error(
        transaction!.type === 'EXPENSE'
          ? 'Erro ao deletar a despesa!'
          : 'Erro ao deletar a receita!',
      )
    }
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true)
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false)
  }

  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    handleDeleteTransaction,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  }
}
