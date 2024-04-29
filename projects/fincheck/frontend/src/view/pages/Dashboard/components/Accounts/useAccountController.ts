import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useWindowWidth } from '../../../../../app/hooks/useWindowWidth'
import { BankAccountsService } from '../../../../../app/service/bankAccountsService'
import { useDashboard } from '../DashboardContext/useDashboard'

export function useAccountController() {
  const windowWidth = useWindowWidth()
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } = useDashboard()
  const [sliderState, setSlideState] = useState({
    isBeginning: true,
    isEnd: false,
  })

  const { data, isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: BankAccountsService.getAll,
  })

  const currentBalance = useMemo(() => {
    return data?.reduce((total, account) => total + account.currentBalance, 0) || 0
  }, [data])

  return {
    sliderState,
    setSlideState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: isFetching,
    accounts: data ?? [],
    openNewAccountModal,
    currentBalance,
  }
}
