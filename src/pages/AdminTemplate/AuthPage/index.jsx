import { useState } from "react";
import { actLogin } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AuthPage() {
  const state = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(actLogin(user));
  };

  if (state.data) {
    //redirect to dashboard
    return <Navigate to="/admin/dashboard" />;
  }

  const handleErrorMessage = () => {
    const { error } = state;

    if (!error) return "";

    return (
      <div
        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <span className="font-medium">{error.response.data.content}</span>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-center text-4xl mt-10 text-red-600 mb-10">
        ĐĂNG NHẬP
      </h1>

      <form onSubmit={handleLogin} className="max-w-sm mx-auto">
        {handleErrorMessage()}
        <div className="mb-5">
          <label htmlFor="email" className="block font-medium">
            Username
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
            Your password
          </label>
          <input
            onChange={handleOnChange}
            name="matKhau"
            type="password"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
        >
          ĐĂNG NHẬP
        </button>
      </form>
    </div>
  );
}
