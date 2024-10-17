import { configureStore } from '@reduxjs/toolkit';
import { articlesApi } from './apiSlice';
import { registerApi } from './registerSlice';
import authReducer from './authSlice';
import { loginApi } from './loginSlice';
import { currentUserApi } from './currentUserSlice';
import { newArticleApi } from './newArticleSlice';
import { deleteArticleApi } from './deleteArticleSlice';
import { editArticleApi } from './editArticleSlice';

const store = configureStore({
    reducer: {
        [articlesApi.reducerPath]: articlesApi.reducer,
        [registerApi.reducerPath]: registerApi.reducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [currentUserApi.reducerPath]: currentUserApi.reducer,
        [newArticleApi.reducerPath]: newArticleApi.reducer,
        [deleteArticleApi.reducerPath]: deleteArticleApi.reducer,
        [editArticleApi.reducerPath]: editArticleApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            articlesApi.middleware,
            registerApi.middleware,
            loginApi.middleware,
            currentUserApi.middleware,
            newArticleApi.middleware,
            deleteArticleApi.middleware,
            editArticleApi.middleware
        ),
});

export default store;
