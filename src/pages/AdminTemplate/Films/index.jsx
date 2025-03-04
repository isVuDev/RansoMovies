import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { fetchListMovie } from "../../HomeTemplate/ListMoviePage/slice";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export default function FilmsPage() {
  const state = useSelector((state) => state.listMovieReducer);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchListMovie());
  }, [dispatch]);

  const { data } = state;

  // Lọc danh sách phim dựa trên từ khóa tìm kiếm
  const filteredMovies = data?.filter((movie) =>
    movie.tenPhim.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xóa phim
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      await api.delete(`/QuanLyPhim/XoaPhim?MaPhim=${id}`);
      toast.success("Xoá phim thành công");
      dispatch(fetchListMovie()); // Cập nhật danh sách phim sau khi xóa
    } catch (error) {
      console.error("Error deleting movie:", error);
      toast.error("Xoá phim thất bại");
    }
  };

  if (!data || data.length === 0) {
    return <p>Loading movies...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-center text-red-500 text-4xl mb-10">
          Danh sách phim
        </h2>
        <Link
          to="/admin/add-movie"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add Movie
        </Link>
      </div>

      {/* Ô tìm kiếm */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">Code</th>
              <th className="p-3 border">Poster</th>
              <th className="p-3 border">Movie Name</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie) => (
              <tr key={movie.maPhim} className="hover:bg-gray-100">
                <td className="p-3 border">{movie.maPhim}</td>
                <td className="p-3 border">
                  <img className="w-20" src={movie.hinhAnh} alt="" />
                </td>
                <td className="p-3 border">{movie.tenPhim}</td>
                <td className="p-3 border">
                  <p className="line-clamp-4">{movie.moTa}</p>
                </td>
                <td className="p-3 border space-x-2">
                  <Link
                    to={`/admin/edit/${movie.maPhim}`}
                    className="bg-green-500 text-white px-2 py-1 rounded mb-2 mt-2 hover:bg-green-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(movie.maPhim)}
                    className="bg-red-500 text-white px-2 py-1 rounded mb-2 mt-2 hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/admin/showtime/${movie.maPhim}`}
                    className="bg-blue-500 text-white px-2 py-1 rounded mb-2 mt-2 hover:bg-blue-600"
                  >
                    Showtime
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}
