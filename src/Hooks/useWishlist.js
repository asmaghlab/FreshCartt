import { useQuery } from "@tanstack/react-query";
import { getLoggedUserWishlist } from "../services/wishlist-service";

export function useWishlist() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['wishlist'],
    queryFn: getLoggedUserWishlist,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    select: (res) => res.data?.data || []
  });

  return { 
    wishlist: data, 
    isLoading, 
    isError, 
    error,
    refetch
  };
}
