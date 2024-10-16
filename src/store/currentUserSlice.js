import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const currentUserApi = createApi({
    reducerPath: 'currentUserApi',
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
        getCurrentUser: builder.query({
            query: () => '/user',
        }),
    }),
});
export const { useGetCurrentUserQuery } = currentUserApi;
