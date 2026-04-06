import { useQuery } from "@tanstack/react-query";
import { getAllBrands } from "../services/brands-service";

export function useBrands(page = 1, limit = 15) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['brands', page, limit],
    queryFn: () => getAllBrands(page, limit),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return { 
    brands: data?.data?.data, 
    metadata: data?.data?.metadata,
    isLoading, 
    isError, 
    error 
  };
}
