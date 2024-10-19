import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const likeArticleApi = createApi({
    reducerPath: 'likeArticleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://blog-platform.kata.academy/api',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Token ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        likeArticle: builder.mutation({
            query: (slug) => ({
                url: `/articles/${slug}/favorite`,
                method: 'POST',
            }),
        }),
        dislikeArticle: builder.mutation({
            query: (slug) => ({
                url: `/articles/${slug}/favorite`,
                method: 'DELETE',
            }),
        }),
    }),
});
export const { useLikeArticleMutation, useDislikeArticleMutation } =
    likeArticleApi;
