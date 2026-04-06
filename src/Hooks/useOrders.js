import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../services/payment-service";

export function useOrders(userId) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['orders', userId],
    queryFn: () => getUserOrders(userId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!userId,
  });

  return { 
    orders: data, 
    isLoading, 
    isError, 
    error 
  };
}
