import { Outlet, NavLink, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actLogout } from "../AdminTemplate/AuthPage/slice";
export default function AdminTemplate() {
  const { data } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Nếu chưa login => redirect về trang /dangnhap
  if (!data) {
    return <Navigate to="/dangnhap" />;
  }

  const handleLogout = () => {
    dispatch(actLogout()).then(() => {
      navigate("/dangnhap");
    });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 h-screen sticky top-0 left-0">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/admin/add-user"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
            }
          >
            Add User
          </NavLink>
          <NavLink
            to="/admin/films"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
            }
          >
            Films
          </NavLink>
          <NavLink
            to="/admin/add-movie"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-gray-700" : "hover:bg-gray-800"}`
            }
          >
            Add Movie
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div>
              Xin chào, <span className="font-bold">{data.taiKhoan}</span>
            </div>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Nội dung động thay đổi dựa vào route */}
        <main className="flex-1 p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
