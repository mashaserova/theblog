import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const editProfileApi = createApi({
    reducerPath: 'editProfileApi',
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
        editProfile: builder.mutation({
            query: (profileData) => ({
                url: `/user`,
                method: 'PUT',
                body: profileData,
            }),
        }),
    }),
});
export const { useEditProfileMutation } = editProfileApi;
