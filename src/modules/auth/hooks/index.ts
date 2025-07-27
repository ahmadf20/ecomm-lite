import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { IsAuthResponse, LoginRequest, LoginResponse } from "../models";
import { apiClient } from "@/helpers/apiClient";

export const useLogin = () => {
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
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

export const useIsAuth = (
  options?: Partial<UseQueryOptions<IsAuthResponse>>
) => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await apiClient.get("/api/is_auth", {
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      });
      return response.data;
    },
    ...options,
  });
};
