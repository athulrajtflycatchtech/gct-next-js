/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { del, get } from "./globalService";

// ---------------- TYPES ----------------

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