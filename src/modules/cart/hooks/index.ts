import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "@/helpers/apiClient";
import { CartResponse, CartsResponse } from "../models";

export const useCarts = (options?: UseQueryOptions<CartsResponse>) => {
  return useQuery({
    queryKey: ["carts"],
    queryFn: async () => {
      const response = await apiClient.get("/carts");
      return response.data;
    },
    ...options,
  });
};

export const useCart = (
  cartId: number,
  options?: Partial<UseQueryOptions<CartResponse>>
) => {
  return useQuery({
    queryKey: ["cart", cartId],
    queryFn: async () => {
      const response = await apiClient.get(`/carts/${cartId}`);
      return response.data;
    },
    ...options,
  });
};
