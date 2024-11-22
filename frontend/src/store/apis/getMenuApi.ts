import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "@/lib/contants";

export const getMenuApi = createApi({
  reducerPath: "getMenuApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_API_URL}/api/get-menu`,
  }),
  endpoints: (builder) => ({
    getUserMenu: builder.query({
      query: (userId) => `/${userId}`,
    }),
  }),
});

export const { useGetUserMenuQuery } = getMenuApi;
