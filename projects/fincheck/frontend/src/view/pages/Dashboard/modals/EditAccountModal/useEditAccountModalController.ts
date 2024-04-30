import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { BankAccountsService } from '../../../../../app/service/bankAccountsService'
import { currencyStringToNumber } from '../../../../../app/utils/currencyStringToNumber'
import { useDashboard } from '../../components/DashboardContext/useDashboard'

const schema = z.object({
  initialBalance: z.union([
    z.string().min(1, { message: 'Saldo inicial é obrigatório' }),
    z.number(),
  ]),
  name: z.string().min(1, { message: 'Nome da conta é obrigatório' }),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, { message: 'Cor é obrigatória' }),
})

type FormData = z.infer<typeof schema>

export function useEditAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } = useDashboard()

  const {
    control,
    formState: { errors },
    handleSubmit: hookFormSubmit,
    register,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
      type: accountBeingEdited?.type,
      initialBalance: accountBeingEdited?.initialBalance,
    },
  })

  const queryClient = useQueryClient()
  const { isLoading, mutateAsync } = useMutation(BankAccountsService.update)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(true)

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id,
      })

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
      toast.success('Conta editada com sucesso!')
      closeEditAccountModal()
    } catch (error) {
      toast.error('Erro ao salvar as alterações!')
    }
  })

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true)
  }
  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false)
  }

  return {
    errors,
    control,
    isLoading,
    isDeleteModalOpen,
    isEditAccountModalOpen,
    register,
    handleSubmit,
    closeEditAccountModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  }
}
