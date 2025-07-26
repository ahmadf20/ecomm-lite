import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "@/helpers/apiClient";
import { UserResponse, UsersResponse } from "../models";

export const useUsers = (options?: Partial<UseQueryOptions<UsersResponse>>) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await apiClient.get("/users");
      return response.data;
    },
    ...options,
  });
};

export const useUser = (
  userId: number,
  options?: Partial<UseQueryOptions<UserResponse>>
) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    },
    ...options,
  });
};
