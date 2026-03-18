/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { del, get, patch, post } from "./globalService";
import { notifications } from "@mantine/notifications";

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

// For Edit

export interface StaffDetail {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email_address: string;
  contact_number: string;
  street_address_1: string;
  street_address_2: string;
  district: string;
  city: string;
  state: string;
  postal_code: string;
  role: "staff";
}

export interface StaffDetailResponse {
  status: string;
  message: string;
  results: StaffDetail;
  statusCode: number;
}

// ---------------- Get Staff ----------------

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
      notifications.show({
        title: "Success",
        message: "Staff added successfully!",
        color: "green",
      });
    },
    onError: (error: any) => {
      notifications.show({
        title: "Error",
        message: error?.response?.data?.message || "Failed to add staff",
        color: "red",
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
      notifications.show({
        title: "Success",
        message: "Staff deleted successfully!",
        color: "green",
      });
    },
    onError: (error: any) => {
      notifications.show({
        title: "Error",
        message: error?.response?.data?.message || "Failed to delete staff",
        color: "red",
      });
    },
  });
};

// -------------------for Edit----------------------

// ---------------- step 1 GET STAFF BY ID ----------------

export const useStaffDetailQuery = (id: number | null) => {
  return useQuery<StaffDetailResponse>({
    queryKey: ["staff-detail", id],
    queryFn: async () => get(`users/${id}/`),
    enabled: !!id, // important
  });
};

// ---------------- step 2 UPDATE STAFF ----------------

export const useUpdateStaffMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<StaffDetail>;
    }) => patch(`users/${id}/`, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-list"] });

      notifications.show({
        title: "Success",
        message: "Staff updated successfully",
        color: "green",
      });
    },

    onError: () => {
      notifications.show({
        title: "Error",
        message: "Update failed",
        color: "red",
      });
    },
  });
};
