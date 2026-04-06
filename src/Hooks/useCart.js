import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../services/cart-service";

export function useCart() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartItems,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    select: (res) => res.data
  });

  return { 
    cartInfo: data, 
    isLoading, 
    isError, 
    error,
    refetch
  };
}
