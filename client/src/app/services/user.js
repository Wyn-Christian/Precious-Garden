import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCustomers: build.query({
      query: () => `/customers`,
      providesTags: (result = [], error, arg) => [
        "User",
        ...result.map(({ id }) => ({ type: "User", id })),
      ],
    }),
    getUser: build.query({
      query: (id) => `/user/${id}`,
      providesTags: (result, error, arg) => [{ type: "User", id: arg }],
    }),
    loginUser: build.mutation({
      query: (input) => ({
        url: "/login",
        method: "POST",
        body: input,
      }),
      invalidatesTags: ["User", "Wishlist"],
    }),
    signUpUser: build.mutation({
      query: (data) => ({
        url: `/customer/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: build.mutation({
      query: ({ id, user }) => ({
        url: `/customer/${id}/update`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "User", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetUserQuery,
  useLoginUserMutation,
  useSignUpUserMutation,
  useUpdateUserMutation,
} = userApi;
