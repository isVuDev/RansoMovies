import { useState } from "react";
import api from "../../../services/api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddUserPage() {
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP07",
    maLoaiNguoiDung: "KhachHang",
    hoTen: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await api.post("/QuanLyNguoiDung/ThemNguoiDung", user);
      setTimeout(() => {
        navigate("/admin/users");
      }, 1500);

      // hiển thị noti
      toast.success(result.data.message, {
        position: "bottom-right",
      });
    } catch (error) {
      console.log("error: ", error);

      const messageError = error.response.data.content;
      console.log("messageError: ", messageError);

      // hiển thị noti
      toast.error(messageError, {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-center text-red-500 text-4xl mb-10">
        Thêm người dùng
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-5">
          <label htmlFor="email" className="block font-medium">
            Tài khoản
          </label>
          <input
            onChange={handleOnChange}
            name="taiKhoan"
            type="text"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block font-medium">
            Mật khẩu
          </label>
          <input
            onChange={handleOnChange}
            name="matKhau"
            type="password"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block font-medium">
            Email
          </label>
          <input
            onChange={handleOnChange}
            name="email"
            type="email"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block font-medium">
            Số Điện Thoại
          </label>
          <input
            onChange={handleOnChange}
            name="soDt"
            type="text"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block font-medium">
            Họ tên
          </label>
          <input
            onChange={handleOnChange}
            name="hoTen"
            type="text"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="maLoaiNguoiDung" className="block font-medium">
            Loại người dùng
          </label>
          <select
            onChange={handleOnChange}
            id="maLoaiNguoiDung"
            name="maLoaiNguoiDung"
            className="w-full p-2 border rounded"
          >
            <option value={"KhachHang"}>KhachHang</option>
            <option value={"QuanTri"}>QuanTri</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 cursor-pointer"
        >
          Thêm người dùng
        </button>
      </form>

      {/* toast noti */}
      <ToastContainer />
    </div>
  );
}
