import { api } from "./api";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => `/products`,
      providesTags: (result = [], error, arg) => [
        "Product",
        ...result.map(({ id }) => ({ type: "Prodcut", id })),
      ],
    }),
    getProduct: build.query({
      query: (id) => `/product/${id}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
    }),
    createProduct: build.mutation({
      query: (data) => ({
        url: "/product/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: build.mutation({
      query: ({ id, product }) => ({
        url: `/product/${id}/update`,
        method: "PATCH",
        body: product,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
    createPlantProduct: build.mutation({
      query: (data) => ({
        url: "/plant-product/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updatePlantProduct: build.mutation({
      query: ({ id, product }) => ({
        url: `/plant-product/${id}/update`,
        method: "PATCH",
        body: product,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/product/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    viewProduct: build.mutation({
      query: (data) => ({
        url: `/view-product`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useCreatePlantProductMutation,
  useUpdatePlantProductMutation,
  useDeleteProductMutation,
  useViewProductMutation,
} = productApi;
