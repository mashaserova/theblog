import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const loginApi = createApi({
    reducerPath: 'loginApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://blog-platform.kata.academy/api',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/users/login',
                method: 'POST',
                body: { user: user },
            }),
        }),
    }),
});
export const { useLoginUserMutation } = loginApi;
