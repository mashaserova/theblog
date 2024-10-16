import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const newArticleApi = createApi({
    reducerPath: 'newArticleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://blog-platform.kata.academy/api',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
                headers.set('Content-Type', 'application/json');
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createNewArticle: builder.mutation({
            query: (article) => ({
                url: '/articles',
                method: 'POST',
                body: { article },
            }),
        }),
    }),
});
export const { useCreateNewArticleMutation } = newArticleApi;
