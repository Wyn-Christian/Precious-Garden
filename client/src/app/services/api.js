import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://precious-garden-server-production.up.railway.app",
	}),
	tagTypes: ["Product", "User", "Cart Item", "Checkout", "Wishlist"],

	endpoints: () => ({}),
});
