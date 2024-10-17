import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const editArticleApi = createApi({
    reducerPath: 'editArticleApi',
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
        editArticle: builder.mutation({
            query: ({ slug, articleData }) => ({
                url: `/articles/${slug}`,
                method: 'PUT',
                body: articleData,
            }),
        }),
    }),
});
export const { useEditArticleMutation } = editArticleApi;
