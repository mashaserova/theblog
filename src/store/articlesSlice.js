import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articlesApi = createApi({
    reducerPath: 'articlesApi',
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
    tagTypes: ['Articles'],
    endpoints: (builder) => ({
        getArticles: builder.query({
            query: ({ limit = 5, offset = 0 }) =>
                `articles?limit=${limit}&offset=${offset}`,
            providesTags: ['Articles'],
        }),
        createNewArticle: builder.mutation({
            query: (article) => ({
                url: '/articles',
                method: 'POST',
                body: { article },
            }),
            invalidatesTags: ['Articles'],
        }),
        editArticle: builder.mutation({
            query: ({ slug, articleData }) => ({
                url: `/articles/${slug}`,
                method: 'PUT',
                body: articleData,
            }),
            invalidatesTags: ['Articles'],
        }),
        deleteArticle: builder.mutation({
            query: (slug) => ({
                url: `/articles/${slug}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Articles'],
        }),
    }),
});

export const {
    useGetArticlesQuery,
    useCreateNewArticleMutation,
    useEditArticleMutation,
    useDeleteArticleMutation,
} = articlesApi;
