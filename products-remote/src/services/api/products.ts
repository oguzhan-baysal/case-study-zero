import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://fakestoreapi.com'
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
      providesTags: ['Products'],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Products', id }],
    }),
    getCategories: builder.query<string[], void>({
      query: () => 'products/categories',
    }),
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) => `products/category/${category}`,
      providesTags: (_result, _error, category) => [{ type: 'Products', id: category }],
    }),
    searchProducts: builder.query<Product[], string>({
      query: (term) => `products/search?q=${term}`,
      providesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useSearchProductsQuery,
} = productsApi;