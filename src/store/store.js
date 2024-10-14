import { configureStore } from '@reduxjs/toolkit';
import { articlesApi } from './apiSlice';
import { registerApi } from './registerSlice';
import authReducer from './authSlice';
import { loginApi } from './loginSlice';

const store = configureStore({
    reducer: {
        [articlesApi.reducerPath]: articlesApi.reducer,
        [registerApi.reducerPath]: registerApi.reducer,
        [loginApi.reducerPath]: loginApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            articlesApi.middleware,
            registerApi.middleware,
            loginApi.middleware
        ),
});

export default store;
