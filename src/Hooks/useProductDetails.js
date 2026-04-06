import { useQuery } from '@tanstack/react-query'
import { getProductById } from '../services/products-servic'


export default function useProductDetails(id) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: () => getProductById({ id }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000 // 10 minutes    
  })
  return { productDetails: data?.data?.data, isLoading, isError, error }
}
