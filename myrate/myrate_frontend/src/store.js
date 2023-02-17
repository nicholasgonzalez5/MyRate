import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
//import storage from 'redux-persist/lib/storage';
import localforage from 'localforage';

/*
* DEVELOPER NOTES:
*
* Redux and Redux-Persist are being used in conjunction to save application state.
* Follow the cookie-cutter pattern in this file to create additional pieces of state.
* IMPORTANT: All reducers MUST be wrapped into the rootReducer.
*/


/*
* Reducer: NYT Trending Book
* Description: Save NYT API Response
* Exports: updateTrendingBooks 
*/
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


/*
* Reducer: User Profile
* Description: Save User Profile Data from Mongo
* Exports: userLogin, userLogout 
*/
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


/*
* Root Reducer & Persisted Reducer Setup Work
*/
const rootReducer = combineReducers({ 
    trendingBooks: trendingBooks.reducer,
    userProfile: userProfile.reducer,
});

const persistConfig = {
    key: 'root',
    storage: localforage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store)