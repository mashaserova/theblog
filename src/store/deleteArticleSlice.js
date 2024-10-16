import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const deleteArticleApi = createApi({
    reducerPath: 'deleteArticleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://blog-platform.kata.academy/api',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        deleteArticle: builder.mutation({
            query: (slug) => ({
                url: `/articles/${slug}`,
                method: 'DELETE',
            }),
        }),
    }),
});
export const { useDeleteArticleMutation } = deleteArticleApi;
