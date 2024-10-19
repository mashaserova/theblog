import { configureStore } from '@reduxjs/toolkit';
import { articlesApi } from './articlesSlice';
import { registerApi } from './registerSlice';
import authReducer from './authSlice';
import { loginApi } from './loginSlice';
import { currentUserApi } from './currentUserSlice';
import { editProfileApi } from './editProfileSlice';

const store = configureStore({
    reducer: {
        [articlesApi.reducerPath]: articlesApi.reducer,
        [registerApi.reducerPath]: registerApi.reducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [currentUserApi.reducerPath]: currentUserApi.reducer,
        [editProfileApi.reducerPath]: editProfileApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            articlesApi.middleware,
            registerApi.middleware,
            loginApi.middleware,
            currentUserApi.middleware,
            editProfileApi.middleware
        ),
});

export default store;
