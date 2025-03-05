import { useState, useEffect } from "react";
import api from "../../../services/api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function EditUserPage() {
  const { taiKhoan } = useParams(); // Lấy tài khoản từ URL
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.user; // Lấy dữ liệu user từ state (truyền từ UsersPage)

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDT: "",
    maNhom: "GP07",
    maLoaiNguoiDung: "KhachHang",
    hoTen: "",
  });

  // Khi trang load, nếu có userData thì set vào form
  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  console.log("user: ", user);

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
      console.log("user: ", user);
      await api.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", user);
      toast.success("Cập nhật thành công!", {
        position: "bottom-right",
      });

      setTimeout(() => {
        navigate("/admin/users");
      }, 1500);
    } catch (error) {
      console.log("error: ", error);
      const messageError = error.response?.data?.content || "Lỗi cập nhật!";
      toast.error(messageError, {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-center text-red-500 text-4xl mb-10">
        Chỉnh sửa người dùng
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-5">
          <label htmlFor="taiKhoan" className="block font-medium">
            Tài khoản
          </label>
          <input
            name="taiKhoan"
            type="text"
            value={user.taiKhoan}
            disabled
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="matKhau" className="block font-medium">
            Mật khẩu
          </label>
          <input
            onChange={handleOnChange}
            name="matKhau"
            type="password"
            value={user.matKhau}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            onChange={handleOnChange}
            name="email"
            type="email"
            value={user.email}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="soDT" className="block font-medium">
            Số Điện Thoại
          </label>
          <input
            onChange={handleOnChange}
            name="soDT"
            type="text"
            value={user.soDT}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="hoTen" className="block font-medium">
            Họ tên
          </label>
          <input
            onChange={handleOnChange}
            name="hoTen"
            type="text"
            value={user.hoTen}
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
            name="maLoaiNguoiDung"
            value={user.maLoaiNguoiDung}
            className="w-full p-2 border rounded"
          >
            <option value="KhachHang">KhachHang</option>
            <option value="QuanTri">QuanTri</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 cursor-pointer"
        >
          Cập nhật
        </button>
      </form>

      {/* toast noti */}
      <ToastContainer />
    </div>
  );
}
