import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "@/lib/contants";

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_API_URL}/api/auth`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["user-deatils"],
  endpoints: (builder) => ({
    register: builder.mutation({
      invalidatesTags: ["user-deatils"],
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),

    verifyEmail: builder.mutation({
      query: (verificationData) => ({
        url: "/verify-email",
        method: "POST",
        body: verificationData,
      }),
    }),

    login: builder.mutation({
      invalidatesTags: ["user-deatils"],
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),

    updateUser: builder.mutation({
      invalidatesTags: ["user-deatils"],
      query: (userData) => ({
        url: "/update-user",
        method: "PATCH",
        body: userData,
      }),
    }),

    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: "/reset-password",
        method: "POST",
        body: resetData,
      }),
    }),

    getUserDeatails: builder.query({
      providesTags: ["user-deatils"],
      query: () => ({
        url: "/me",
        method: "GET",
        onSuccess: (response: { data: { user: any } }) => {
          console.log(response.data.user);
          // setUser(response.data.user);
        },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyEmailMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useUpdateUserMutation,
  useResetPasswordMutation,
  useGetUserDeatailsQuery,
} = authApi;

export const { reducer: authApiReducer } = authApi;
