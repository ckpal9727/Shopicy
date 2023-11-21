import { apiSlice } from "./apiSlice";
import { PRODUCT_URL } from "../constants";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCT_URL
            }),
            keepUnusedDataFor: 5
        }),
        getProductDetails:builder.query({
            query:(productId)=>({
                url:`${PRODUCT_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5
        })
    })
})

export const { useGetProductsQuery,useGetProductDetailsQuery } = productApiSlice;
