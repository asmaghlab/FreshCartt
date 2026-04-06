import { useQuery } from "@tanstack/react-query";
import { getSpecificBrand } from "../services/brands-service";

export function useBrandDetails(id) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['brandDetails', id],
    queryFn: () => getSpecificBrand(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!id,
  });

  return { brandDetails: data?.data?.data, isLoading, isError, error };
}
