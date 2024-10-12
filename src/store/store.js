import { configureStore } from '@reduxjs/toolkit';
import { articlesApi } from './apiSlice';

const store = configureStore({
    reducer: {
        [articlesApi.reducerPath]: articlesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(articlesApi.middleware),
});

export default store;
