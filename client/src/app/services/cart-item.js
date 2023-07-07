import { api } from "./api";

const cartItemApi = api.injectEndpoints({
	endpoints: (build) => ({
		getCartByUser: build.query({
			query: (id) => `/customer/${id}/cart-items`,
			providesTags: (result = [], error, arg) => [
				"Cart Item",
				...result.map(({ id }) => ({ type: "Cart Item", id })),
			],
		}),
		addToCart: build.mutation({
			query: (data) => ({
				url: `/cart-item/create`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Cart Item"],
		}),
		updateCart: build.mutation({
			query: ({ id, data }) => ({
				url: `/cart-item/${id}/update`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Cart Item", id: arg.id },
			],
		}),
		removeToCart: build.mutation({
			query: (id) => ({
				url: `/cart-item/${id}/delete`,
				method: "DELETE",
			}),
			invalidatesTags: ["Cart Item"],
		}),
	}),
});

export const {
	useGetCartByUserQuery,
	useAddToCartMutation,
	useRemoveToCartMutation,
	useUpdateCartMutation,
} = cartItemApi;
