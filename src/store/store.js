import { configureStore } from '@reduxjs/toolkit';
import { articlesApi } from './apiSlice';
import { registerApi } from './registerSlice';
import authReducer from './authSlice';
import { loginApi } from './loginSlice';
import { currentUserApi } from './currentUserSlice';
import { newArticleApi } from './newArticleSlice';

const store = configureStore({
    reducer: {
        [articlesApi.reducerPath]: articlesApi.reducer,
        [registerApi.reducerPath]: registerApi.reducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [currentUserApi.reducerPath]: currentUserApi.reducer,
        [newArticleApi.reducerPath]: newArticleApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            articlesApi.middleware,
            registerApi.middleware,
            loginApi.middleware,
            currentUserApi.middleware,
            newArticleApi.middleware
        ),
});

export default store;
