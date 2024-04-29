import { createContext, useCallback, useState } from 'react'
import { BankAccount } from '../../../../../app/entities/BankAccount'

type DashboardContextValue = {
  areValuesVisible: boolean
  isNewAccountModalOpen: boolean
  isEditAccountModalOpen: boolean
  isNewTransactionModalOpen: boolean
  newTransactionType: 'INCOME' | 'EXPENSE' | null
  accountBeingEdited: null | BankAccount
  toggleValuesVisibility(): void
  openNewAccountModal(): void
  closeNewAccountModal(): void
  openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void
  closeNewTransactionModal(): void
  openEditAccountModal(bankAccount: BankAccount): void
  closeEditAccountModal(): void
}

export const DashboardContext = createContext({} as DashboardContextValue)

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true)
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false)
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)
  const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null)
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false)
  const [accountBeingEdited, setAccountBeingEdited] = useState<null | BankAccount>(null)

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState)
  }, [])

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true)
  }, [])
  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false)
  }, [])

  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type)
    setIsNewTransactionModalOpen(true)
  }, [])
  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null)
    setIsNewTransactionModalOpen(false)
  }, [])

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdited(bankAccount)
    setIsEditAccountModalOpen(true)
  }, [])
  const closeEditAccountModal = useCallback(() => {
    setIsEditAccountModalOpen(false)
    setAccountBeingEdited(null)
  }, [])

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        newTransactionType,
        isNewAccountModalOpen,
        isNewTransactionModalOpen,
        isEditAccountModalOpen,
        accountBeingEdited,
        toggleValuesVisibility,
        openNewAccountModal,
        closeNewAccountModal,
        openNewTransactionModal,
        closeNewTransactionModal,
        openEditAccountModal,
        closeEditAccountModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
