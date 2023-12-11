import { apiSlice } from "./apiSlice";
import { PRODUCT_URL, UPLOAD_URL } from "../constants";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({keyword,pageNumber}) => ({
                url: PRODUCT_URL,
                params:{
                    pageNumber,
                    keyword
                },
            }),
            providesTags:['Product'],
            keepUnusedDataFor: 5
        }),
        getProductDetails:builder.query({
            query:(productId)=>({
                url:`${PRODUCT_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5
        }),
        createProduct:builder.mutation({
            query:()=>({
                url:PRODUCT_URL,
                method:'POST'
            }),
            invalidatesTags:['Product'],
        }),
        updateProduct:builder.mutation({
            query:(data)=>({
                url:`${PRODUCT_URL}/${data.productId}`,
                method:'PUT',
                body:data
            }),
            invalidatesTags:['Product'],
        }),
        uploadProductImage:builder.mutation({
            query:(data)=>({
                url:`${UPLOAD_URL}`,
                method:'POST',
                body:data
            }),
            invalidatesTags:['Product'],
        }),
        deleteProduct:builder.mutation({
            query:(productId)=>({
                url:`${PRODUCT_URL}/${productId}`,
                method:'DELETE'
            })
        }),
        createReview:builder.mutation({
            query:(data)=>({
                url:`${PRODUCT_URL}/${data.productId}/reviews`,
                method:'POST',
                body:data
            }),
            invalidatesTags:['Product'],
        }),
        getTopProducts:builder.query({
            query:()=>({
                url:`${PRODUCT_URL}/top`,                
            }),
            keepUnusedDataFor: 5
        }),
    })
})

export const {useGetTopProductsQuery,useCreateReviewMutation,useDeleteProductMutation,useUploadProductImageMutation,useGetProductsQuery,useGetProductDetailsQuery ,useCreateProductMutation,useUpdateProductMutation} = productApiSlice;
