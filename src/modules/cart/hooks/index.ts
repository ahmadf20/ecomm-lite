import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { apiClient } from "@/helpers/apiClient";
import { AddCartRequest, Cart, CartResponse, CartsResponse } from "../models";

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

export const useAddCart = (
  options?: UseMutationOptions<CartResponse, Error, AddCartRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddCartRequest) => {
      const response = await apiClient.post("/carts", data);
      return response.data;
    },
    onMutate: async (newCart: AddCartRequest) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["carts"] });

      // Snapshot the previous value
      const prevCart = queryClient.getQueryData(["carts"]);

      const newCartData: Cart = {
        ...newCart,
        id: Date.now(),
        date: new Date().toISOString(),
      };

      // Optimistically update to the new value
      queryClient.setQueryData(["carts"], (old: AddCartRequest[]) => [
        newCartData,
        ...old,
      ]);

      // Return a context object with the snapshotted value
      return { prevCart };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newCart, context) => {
      queryClient.setQueryData(
        ["carts"],
        (context as { prevCart: AddCartRequest[] }).prevCart
      );
    },
    ...options,
  });
};
