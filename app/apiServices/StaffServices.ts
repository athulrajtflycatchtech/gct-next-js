/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { del, get, post } from "./globalService";

// ---------------- Add staff ----------------

export interface AddStaffPayload {
  first_name: string;
  last_name: string;
  email_address: string;
  username: string;
  password: string;
  branch: number;
  contact_number: string;
  street_address_1: string;
  street_address_2: string;
  city: string;
  district: string;
  state: string;
  postal_code: string;
  role: string;
}

export interface AddStaffResponse {
  status: string;
  message: string;
  results: Staff;
  statusCode: number;
}

// ---------------- GET ----------------

export interface Staff {
  id: number;
  full_name: string;
  address: string;
  contact_number: string;
  email_address: string;
  branch: string | null;
  status: string;
  role: string;
  username: string | null;
}

export interface StaffListResponse {
  status: string;
  message: string;
  count: number;
  next: string | null;
  previous: string | null;
  statusCode: number;
  results: Staff[];
}

// ---------------- QUERY ----------------

export const useStaffListQuery = (page: number) => {
  return useQuery<StaffListResponse, any>({
    queryKey: ["staff-list", page],

    queryFn: async () => {
      return get<StaffListResponse>("users/", {
        role: "staff",
        page: page,
      });
    },
  });
};

// ---------------- ADD STAFF -------------------

export const useAddStaffMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AddStaffResponse, any, AddStaffPayload>({
    mutationFn: (payload) => post("users/", payload),

    onSuccess: () => {
      // 🔥 refresh staff list automatically
      queryClient.invalidateQueries({ queryKey: ["staff-list"] });
    },
  });
};

// ---------------- DELETE STAFF ----------------

export const useDeleteStaffMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return del(`/users/${id}/`);
    },

    onSuccess: () => {
      // refetch staff list after delete
      queryClient.invalidateQueries({ queryKey: ["staff-list"] });
    },
  });
};