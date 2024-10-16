import { createSlice } from '@reduxjs/toolkit';

const storedToken = localStorage.getItem('token');
const initialState = {
    isLoggedIn: !!storedToken,
    token: storedToken,
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
            localStorage.removeItem('token');
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
