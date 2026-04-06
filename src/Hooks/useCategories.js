
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../services/Category-Service';

export default function useCategories() {
const {data, isLoading, isError }=useQuery({
    queryKey: ['categories'],
    queryFn:getAllCategories,
    staleTime: 2 * 60 * 1000, // 5 minutes
    gcTime: 5 * 60 * 1000 // 10 minutes   
})  
return { categories: data?.data?.data, isLoading, isError }
}
