import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getMenuApi = createApi({
  reducerPath: "getMenuApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/get-menu",
  }),
  endpoints: (builder) => ({
    getUserMenu: builder.query({
      query: (userId) => `/${userId}`,
    }),
  }),
});

export const { useGetUserMenuQuery } = getMenuApi;
