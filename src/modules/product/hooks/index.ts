import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "@/helpers/apiClient";
import { ProductResponse, ProductsResponse } from "../models";

export const useProducts = (
  options?: Partial<UseQueryOptions<ProductsResponse>>
) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await apiClient.get("/products");
      return response.data;
    },
    ...options,
  });
};

export const useProductsByIds = (
  productIds: number[],
  options?: Partial<UseQueryOptions<ProductsResponse>>
) => {
  return useQuery({
    queryKey: ["products", productIds],
    queryFn: async () => {
      const response = await apiClient.get<ProductsResponse>("/products");
      const filteredProducts = response.data?.filter((product) =>
        productIds.includes(product?.id || 0)
      );

      return filteredProducts;
    },
    ...options,
  });
};

export const useProduct = (
  productId: number,
  options?: Partial<UseQueryOptions<ProductResponse>>
) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await apiClient.get(`/products/${productId}`);
      return response.data;
    },
    ...options,
  });
};
