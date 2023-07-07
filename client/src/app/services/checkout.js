import { api } from "./api";

export const checkoutApi = api.injectEndpoints({
	endpoints: (build) => ({
		getCheckouts: build.query({
			query: () => `/checkouts`,
			providesTags: (result = [], error, arg) => [
				"Checkout",
				...result.map(({ id }) => ({ type: "Order", id })),
			],
		}),
		getCheckout: build.query({
			query: (id) => `/checkouts/${id}`,
			providesTags: (result, error, arg) => [
				{ type: "Checkout", id: arg },
			],
		}),
		getCheckoutsByUser: build.query({
			query: (id) => `/customer/${id}/checkouts`,
			providesTags: (result = [], error, arg) => [
				"Checkout",
				...result.map(({ id }) => ({ type: "Checkout", id })),
			],
		}),
		createCheckout: build.mutation({
			query: (data) => ({
				url: `/checkout/create`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Cart Item", "Checkout"],
		}),
		changeStatusOrder: build.mutation({
			query: ({ id, data }) => ({
				url: `/checkout/${id}/status-change`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Checkout", id: arg.id },
			],
		}),
	}),
});

export const {
	useGetCheckoutsQuery,
	useGetCheckoutQuery,
	useGetCheckoutsByUserQuery,
	useCreateCheckoutMutation,
	useChangeStatusOrderMutation,
} = checkoutApi;
