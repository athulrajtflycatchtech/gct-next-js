/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { post } from "./globalService";

// ---------------- TYPES ----------------

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  results: {
    refresh: string;
    access: string;
    user_id: number;
    role: string;
    full_name: string;
  };
  statusCode: number;
}

// ---------------- COMBINED MUTATION ----------------

export const useLoginMutation = () => {
  return useMutation<LoginResponse, any, LoginPayload>({
    mutationFn: async (payload: LoginPayload) => {
      return post<LoginResponse, LoginPayload>("/login/", payload);
    },
  });
};