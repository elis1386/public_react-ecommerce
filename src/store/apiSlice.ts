import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {  ProductItem } from "../types/Product";

import { buildUrl } from "../utils/common";
import { BASE_URL } from "../utils/constants";

export interface SearchQuery {
  title: string;
  price: number;
  price_min: number;
  price_max:number;
  priceRange: [number, number];
  categoryId: number;
  offset: 0,

}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Product", "Products"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ id }) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    getProducts: builder.query<ProductItem[], SearchQuery>({
      query: (params) => buildUrl(`/products`, params),
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductQuery, useGetProductsQuery } = apiSlice;
export default apiSlice.reducer;
