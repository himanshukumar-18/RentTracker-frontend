import { configureStore } from "@reduxjs/toolkit";
import detailsReducer from "../features/details/detailSlice.js";
import getHistory from "../features/getHistory/getHistorySlice.js"

const store = configureStore({
    reducer: {
        details: detailsReducer,
        history: getHistory
    },
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
