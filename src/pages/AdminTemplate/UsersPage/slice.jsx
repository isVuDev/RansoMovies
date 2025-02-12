import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const fetchListUsers = createAsyncThunk(
    "listUsersPage/fetchListUsers",
    async (__dirname, { rejectWithValue }) => {
        try {
            const result = await api.get(
                "/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"
            );

            return result.data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const listUsersPageSlice = createSlice({
    name: "listUsersPageSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchListUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchListUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchListUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default listUsersPageSlice.reducer;
