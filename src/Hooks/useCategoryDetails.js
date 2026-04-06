import { useQuery } from "@tanstack/react-query";
import { getSpecificCategory } from "../services/Category-Service";

export function useCategoryDetails(id) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['categoryDetails', id],
    queryFn: () => getSpecificCategory(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!id,
  });

  return { 
    categoryDetails: data?.data?.data, 
    isLoading, 
    isError, 
    error 
  };
}
