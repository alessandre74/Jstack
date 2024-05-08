import { useQuery } from '@tanstack/react-query'
import { BankAccountsService } from '../services/bankAccountsService'

export function useBankAccounts() {
  const { data, isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: BankAccountsService.getAll,
    staleTime: Infinity,
  })

  return { accounts: data ?? [], isFetching }
}
