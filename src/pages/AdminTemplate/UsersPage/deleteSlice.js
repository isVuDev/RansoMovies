import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

// API xóa người dùng
export const deleteUser = createAsyncThunk(
  "listUsersPage/deleteUser",
  async (taiKhoan, { rejectWithValue }) => {
    try {
      await api.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
      return taiKhoan;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const deleteUserSlice = createSlice({
    name: "deleteUser",
    initialState: { loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(deleteUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteUser.fulfilled, (state) => {
          state.loading = false;
        })
        .addCase(deleteUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default deleteUserSlice.reducer;
