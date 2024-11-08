import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Dish } from "@/types/types";
export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/menu",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Menu"],
  endpoints: (builder) => ({
    getMenuItems: builder.query<Dish[], string>({
      providesTags: ["Menu"],
      query: (query) => `/?userId=${query}`,
    }),
    addMenuItem: builder.mutation<Dish, Dish>({
      invalidatesTags: ["Menu"],
      query: (item) => ({
        url: "/add-item",
        method: "POST",
        body: item,
      }),
    }),
    updateMenuItem: builder.mutation<Dish, Dish>({
      invalidatesTags: ["Menu"],
      query: (item) => ({
        url: "/update-item",
        method: "PATCH",
        body: item,
      }),
    }),
    toggleIsBestSeller: builder.mutation<Dish, string>({
      invalidatesTags: ["Menu"],
      query: (id) => ({
        url: `/toggle-isBestSeller/${id}`,
        method: "PATCH",
      }),
    }),
    deleteMenuItem: builder.mutation<Dish, string>({
      invalidatesTags: ["Menu"],
      query: (id) => ({
        url: `/delete-item/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMenuItemsQuery,
  useAddMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
  useToggleIsBestSellerMutation,
} = menuApi;
