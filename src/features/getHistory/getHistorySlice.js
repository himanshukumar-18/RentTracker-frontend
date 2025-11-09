import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../index.js"


export const getHistory = createAsyncThunk(
    "history/getHistory",
    async (date, { rejectWithValue }) => {
        try {
            const response = await axios.get("/getHistory", { params: { date } });
            // console.log("getHistory Response Data:", response.data?.message);
            return response.data?.message || []; // ✅ Only return serializable data
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch history");
        }
    }
);


const getHistorySlice = createSlice({
    name: "getHistory",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch history";
            });
    },
});

export default getHistorySlice.reducer;