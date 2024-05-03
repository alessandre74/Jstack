import { useQuery } from '@tanstack/react-query'
import { CategoriesService } from '../services/categoriesService'

export function useCategories() {
  const { data, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: CategoriesService.getAll,
  })

  return { categories: data ?? [], isFetching }
}
