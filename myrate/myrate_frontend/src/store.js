import { configureStore, createSlice } from '@reduxjs/toolkit';

let trendingBooks = createSlice({
    name: 'trendingBooks',
    initialState: [],
    reducers: {
        updateTrendingBooks(state, action) {
            state.push(...action.payload);
        }
    }
});

export let { updateTrendingBooks } = trendingBooks.actions;

const userProfile = createSlice({
    name: 'userProfile',
    initialState: {
        firstName: null,
        lastName: null,
        email: null,
        username: null,
        password: null,
    },
    reducers: {
        userLogin(state, action) {
            return action.payload;
        },
        userLogout(state, action) {
            return action.payload
        },
    }
});

export let { userLogin, userLogout } = userProfile.actions;

export default configureStore({
    reducer: {

        trendingBooks: trendingBooks.reducer,
        userProfile: userProfile.reducer,
    }
});