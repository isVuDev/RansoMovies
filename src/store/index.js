import { configureStore } from "@reduxjs/toolkit";
import bookingTicketReducer from "./../pages/HomeTemplate/HomePage/slice";
import listMovieReducer from "./../pages/HomeTemplate/ListMoviePage/slice";
import detailMovieReducer from "./../pages/HomeTemplate/DetailMoviePage/slice";
import authReducer from "./../pages/AdminTemplate/AuthPage/slice";
import listUsersReducer from "./../pages/AdminTemplate/UsersPage/slice";

export const store = configureStore({
    reducer: {
        // Add your child reducers here
        bookingTicketReducer,
        listMovieReducer,
        detailMovieReducer,
        authReducer,
        listUsersReducer,
    },
});
