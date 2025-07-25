import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { LoginRequest, LoginResponse } from "../models";
import { apiClient } from "@/helpers/apiClient";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (data: LoginRequest) => {
      const response = await apiClient.post("/auth/login", data);

      await apiClient.post(
        "/api/login",
        {
          token: response.data.token,
        },
        {
          baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        }
      );

      return response.data;
    },
  });
};

export const useLogout = (options?: UseMutationOptions<void, Error, void>) => {
  return useMutation({
    mutationFn: async () => {
      await apiClient.post(
        "/api/logout",
        {},
        {
          baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        }
      );
    },
    ...options,
  });
};
