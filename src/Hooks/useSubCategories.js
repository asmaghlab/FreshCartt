import { useQuery } from "@tanstack/react-query";
import { getSubCategoriesOnCategory } from "../services/Category-Service";

export function useSubCategories(categoryId) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['subCategories', categoryId],
    queryFn: () => getSubCategoriesOnCategory(categoryId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!categoryId,
  });

  return { 
    subCategories: data?.data?.data || [], 
    isLoading, 
    isError, 
    error 
  };
}
