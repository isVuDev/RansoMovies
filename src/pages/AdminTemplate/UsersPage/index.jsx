import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListUsers } from "./slice";
import { deleteUser } from "./deleteSlice";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function UsersPage() {
  const state = useSelector((state) => state.listUsersReducer);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListUsers());
  }, []);

  const handleDeleteUser = (taiKhoan) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      dispatch(deleteUser(taiKhoan))
        .unwrap()
        .then(() => toast.success("Xóa người dùng thành công!"))
        .catch(() => toast.error("Xóa người dùng thất bại!"));
      dispatch(fetchListUsers());
    }
  };

  const filteredUsers = state?.data?.filter(
    (user) =>
      user.taiKhoan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.hoTen.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderListUsers = () => {
    if (state.loading) {
      return (
        <tr>
          <td colSpan="6" className="text-center p-4 text-gray-500">
            Loading...
          </td>
        </tr>
      );
    }

    if (!filteredUsers || filteredUsers.length === 0) {
      return (
        <tr>
          <td colSpan="6" className="text-center p-4 text-gray-500">
            Không tìm thấy người dùng nào.
          </td>
        </tr>
      );
    }

    return filteredUsers?.map((user) => {
      return (
        <tr key={user.taiKhoan}>
          <th scope="row" className="p-3 border">
            {user.taiKhoan}
          </th>
          <td className="p-3 border">{user.hoTen}</td>
          <td className="p-3 border">{user.email}</td>
          <td className="p-3 border">{user.soDT}</td>
          <td className="p-3 border">
            <span
              className={
                user.maLoaiNguoiDung === "KhachHang"
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {user.maLoaiNguoiDung}
            </span>
          </td>
          <td className="p-3 border">
            <Link
              to={`/admin/edit-user/${user.taiKhoan}`}
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDeleteUser(user.taiKhoan)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mt-2 cursor-pointer"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-center text-red-500 text-4xl mb-10">
          Danh sách người dùng
        </h1>
        <Link
          to="/admin/add-user"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add User
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4"
        />

        <table className="w-full text-left border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th scope="col" className="p-3 border">
                Tài khoản
              </th>
              <th scope="col" className="p-3 border">
                Họ tên
              </th>
              <th scope="col" className="p-3 border">
                Email
              </th>
              <th scope="col" className="p-3 border">
                SĐT
              </th>
              <th scope="col" className="p-3 border">
                Loại người dùng
              </th>
              <th scope="col" className="p-3 border">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{renderListUsers()}</tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}
