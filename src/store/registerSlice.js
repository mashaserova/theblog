import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const registerApi = createApi({
    reducerPath: 'registerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://blog-platform.kata.academy/api',
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (user) => ({
                url: 'users',
                method: 'POST',
                body: { user },
            }),
        }),
    }),
});
export const { useRegisterUserMutation } = registerApi;
