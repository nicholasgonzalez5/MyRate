import { configureStore, createSlice } from '@reduxjs/toolkit';

let trendingBooks = createSlice({
    name: 'trendingBooks',
    initialState: []
});

export default configureStore({
    reducer: {

        trendingBooks: trendingBooks.reducer

    }
});