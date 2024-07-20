import { createSlice, current } from "@reduxjs/toolkit";
import { updateUser } from "../../../../api/controllers/user.controllers";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart: (state) => {
            state.loading = true;
        }, 
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        SingOutStart: (state) => {
            state.loading = true;
        }, 
        SingOutSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        SingOutFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { signInStart, signInSuccess, signInFailure, updateUserFailure, updateUserSuccess, updateUserStart, deleteUserFailure,deleteUserStart,deleteUserSuccess, SingOutFailure,SingOutSuccess,SingOutStart} = userSlice.actions;

export default userSlice.reducer;