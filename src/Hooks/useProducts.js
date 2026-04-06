import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services/products-servic";

export function useProducts(params = {}) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', params],
    queryFn: () => getAllProducts(params),
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
  });

  return { 
    products: data?.data?.data || [], 
    metadata: data?.data?.metadata,
    isLoading, 
    isError, 
    error 
  };
}