import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "../../index.js";

// Async thunk to send payment details
export const sendDetails = createAsyncThunk(
    "details/sendDetails",
    async (formData, { rejectWithValue }) => {
        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }

        try {
            const res = await axios.post(
                "/rentDetailsRegister-form",
                formData,
            );
            return res.data;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || "Failed to send details";
            return rejectWithValue(message);
        }
    }
);


const detailSlice = createSlice({
    name: "details",
    initialState: {
        data: [] || null,
        loading: false,
        error: null,
        success : false,
    },
    reducers: {
        resetDetails: (state) => {
            state.data = null;
            state.error = null;
            state.loading = false;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(sendDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.success = true;
            })
            .addCase(sendDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { resetDetails } = detailSlice.actions;
export default detailSlice.reducer;
