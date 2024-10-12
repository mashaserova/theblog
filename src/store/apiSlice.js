import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articlesApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://blog-platform.kata.academy/api',
    }),
    endpoints: (builder) => ({
        getArticles: builder.query({
            query: ({ limit = 5, offset = 0 }) =>
                `articles?limit=${limit}&offset=${offset}`,
        }),
    }),
});

export const { useGetArticlesQuery } = articlesApi;
