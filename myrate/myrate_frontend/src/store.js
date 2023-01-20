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

export default configureStore({
    reducer: {

        trendingBooks: trendingBooks.reducer

    }
});