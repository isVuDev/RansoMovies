import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
export default function FilmsPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách phim từ API
  const fetchMovies = async () => {
    try {
      const response = await api.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
      setMovies(response.data.content);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Xóa phim
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      await api.delete(`/QuanLyPhim/XoaPhim/${id}`);
      setMovies(movies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Movie List</h2>
        <Link
          to="/admin/add-movie"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add Movie
        </Link>
      </div>

      {loading ? (
        <p>Loading movies...</p>
      ) : (
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
              {movies.map((movie, index) => (
                <tr key={movie.id} className="hover:bg-gray-100">
                  <td className="p-3 border">{movie.maPhim}</td>
                  <td className="p-3 border">
                    <img className="w-20" src={movie.hinhAnh} alt="" />
                  </td>
                  <td className="p-3 border">{movie.tenPhim}</td>
                  <td className="p-3 border">{movie.moTa}</td>
                  <td className="p-3 border space-x-2">
                    <Link
                      to={`/admin/edit-movie/${movie.id}`}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
