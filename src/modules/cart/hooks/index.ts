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
      await queryClient.cancelQueries({ queryKey: ["carts"] });

      const prevCart = queryClient.getQueryData(["carts"]);

      const newCartData: Cart = {
        id: Date.now(),
        date: new Date().toISOString(),
        userId: newCart.userId,
        products: newCart.products,
      };

      queryClient.setQueryData(["carts"], (old: AddCartRequest[]) => [
        newCartData,
        ...old,
      ]);

      queryClient.setQueryData(["cart", newCartData.id], newCartData);

      return { prevCart };
    },
    onError: (err, newCart, context) => {
      queryClient.setQueryData(
        ["carts"],
        (context as { prevCart: AddCartRequest[] }).prevCart
      );
    },
    ...options,
  });
};
