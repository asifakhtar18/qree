import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/food-category",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const foodCatagoryApi = createApi({
  reducerPath: "foodCatagoryApi",
  baseQuery: baseQuery,
  tagTypes: ["FoodCatagory"],
  endpoints: (builder) => ({
    getFoodCatagory: builder.query({
      providesTags: ["FoodCatagory"],
      query: (userId) => `/?userId=${userId}`,
    }),
    addFoodCatagory: builder.mutation<any, any>({
      invalidatesTags: ["FoodCatagory"],
      query: (foodCatagory) => ({
        url: "/add",
        method: "POST",
        body: foodCatagory,
      }),
    }),
    updateFoodCatagory: builder.mutation<any, any>({
      invalidatesTags: ["FoodCatagory"],
      query: (foodCatagory) => ({
        url: "/update",
        method: "PUT",
        body: foodCatagory,
      }),
    }),
    deleteFoodCatagory: builder.mutation<any, any>({
      invalidatesTags: ["FoodCatagory"],
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFoodCatagoryQuery,
  useAddFoodCatagoryMutation,
  useUpdateFoodCatagoryMutation,
  useDeleteFoodCatagoryMutation,
} = foodCatagoryApi;
