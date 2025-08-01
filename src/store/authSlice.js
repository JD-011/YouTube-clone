import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false,
    userData: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.loggedIn = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.loggedIn = false;
            state.userData = null;
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;