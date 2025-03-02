import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

export const actLogin = createAsyncThunk(
  "auth/actLogin",
  async (user, { rejectWithValue }) => {
    try {
      const result = await api.post("/QuanLyNguoiDung/DangNhap", user);
      /**
       * check permission user
       *  - Nếu là KhachHang => show error
       *  - Nếu là QuanTri => ....
       */
      const userInfo = result.data.content;
      if (userInfo.maLoaiNguoiDung === "KhachHang") {
        return rejectWithValue({
          response: {
            data: {
              content: "Bạn không có quyền truy cập trang này",
            },
          },
        });
      }

      /**
       * 1. Save userInfo to local storage
       */

      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Action logout để xóa user khỏi Redux state và localStorage
export const actLogout = createAsyncThunk("auth/actLogout", async () => {
  localStorage.removeItem("userInfo"); // Xóa thông tin đăng nhập khỏi localStorage
  return null; // Trả về null để cập nhật state
});

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  loading: false,
  data: userInfo,
  error: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(actLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // Xử lý logout
    builder.addCase(actLogout.fulfilled, (state) => {
      state.data = null; // Xóa dữ liệu user khỏi Redux store
    });
  },
});

export default authSlice.reducer;
