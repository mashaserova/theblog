import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    token: null,
    user: null,
    email: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.email = action.payload.email;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
            state.user = null;
            state.email = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
