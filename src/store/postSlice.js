import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userPostData: null,
    allPostData: null
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        userPosts: (state, action) => {
            state.userPostData = action.payload
        },

        allPosts: (state, action) => {
            state.allPostData = action.payload
        },

        logoutPost: (state) => {
            state.allPostData = null,
                state.userPostData = null
        }
    }
})


export const { userPosts, allPosts, logoutPost } = postSlice.actions;

export const postReducer = postSlice.reducer;