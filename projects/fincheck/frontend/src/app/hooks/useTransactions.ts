import { useQuery } from '@tanstack/react-query'
import { TransactionsService } from '../services/transactionsService'
import { TransactionsFilters } from '../services/transactionsService/getAll'

export function useTransactions(filters: TransactionsFilters) {
  const { data, isFetching, isInitialLoading, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => TransactionsService.getAll(filters),
  })

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading,
    refetchTransactions: refetch,
  }
}
