/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../utils/functions/axios";
import { type AxiosResponse } from "axios";

const handleResponse = async (response: AxiosResponse) => {
  if (response.status === 401) {
    localStorage.clear();
    return Promise.reject(response.data);
  }
  if (response.status === 200 || response.status === 201 || response.status === 204) {
    return response.data;
  }
  return Promise.reject(response.data);
};

// GET
// export const get = async <T>(url: string, params?: object): Promise<T> => {
//   try {
//     const resp = await axiosInstance.get<T>(url, { params });
//     return handleResponse(resp);
//   } catch (err: any) {
//     return Promise.reject(err.response || err);
//   }
// };
export const get = async <T>(url: string, params?: object, config: object = {}): Promise<T> => {
  try {
    const isBlob = (config as any).responseType === "blob";
    const resp = await axiosInstance.get<T>(url, {params,...config,});
    if (isBlob) {
      return resp.data;
    }
    return handleResponse(resp);
  } catch (err: any) {
    return Promise.reject(err.response || err);
  }
};


//POST (JSON)
export const post = async <T, B = unknown>(url: string, body: B): Promise<T> => {
  try {
    const resp = await axiosInstance.post<T>(url, body);
    return handleResponse(resp);
  } catch (err: any) {
    return Promise.reject(err.response || err);
  }
};

//POST (multipart/form-data)
export const postImage = async <T>(url: string, formData: FormData): Promise<T> => {
  try {
    const resp = await axiosInstance.post<T>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return handleResponse(resp);
  } catch (err: any) {
    return Promise.reject(err.response || err);
  }
};
export const patchImage = async <T>(url: string, formData: FormData): Promise<T> => {
  try {
    const resp = await axiosInstance.patch<T>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return handleResponse(resp);
  } catch (err: any) {
    return Promise.reject(err.response || err);
  }
};
// PUT
export const put = async <T, B = unknown>(url: string, body: B): Promise<T> => {
  try {
    const resp = await axiosInstance.put<T>(url, body);
    return handleResponse(resp);
  } catch (err: any) {
    return Promise.reject(err.response || err);
  }
};

// PATCH
export const patch = async <T, B = unknown>(url: string, body: B): Promise<T> => {
  try {
    const resp = await axiosInstance.patch<T>(url, body);
    return handleResponse(resp);
  } catch (err: any) {
    return Promise.reject(err.response || err);
  }
};

//DELETE
export const del = async <T>(url: string): Promise<T> => {
  try {
    const resp = await axiosInstance.delete<T>(url);
    return handleResponse(resp);
  } catch (err: any) {
    return Promise.reject(err.response || err);
  }
};