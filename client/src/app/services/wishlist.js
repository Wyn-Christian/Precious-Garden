import { api } from "./api";

const wishListApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWishlistByUser: build.query({
      query: (id) => `/customer/${id}/wishlist`,
      providesTags: (result = [], error, arg) => [
        "Wishlist",
        ...result.map(({ id }) => ({ type: "Wishlist", id })),
      ],
    }),
    addToWishList: build.mutation({
      query: (data) => ({
        url: "/customer/add-to-wishlist",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wishlist"],
    }),
    removeToWishList: build.mutation({
      query: (data) => ({
        url: "/customer/remove-to-wishlist",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetWishlistByUserQuery,
  useAddToWishListMutation,
  useRemoveToWishListMutation,
} = wishListApi;
