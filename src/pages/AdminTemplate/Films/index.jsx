import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { fetchListMovie } from "../../HomeTemplate/ListMoviePage/slice";
import { useSelector, useDispatch } from "react-redux";
export default function FilmsPage() {
  const state = useSelector((state) => state.listMovieReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListMovie());
  }, [dispatch]);

  const { data } = state;
  console.log(data);

  // Xóa phim
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      await api.delete(`/QuanLyPhim/XoaPhim?MaPhim=${id}`);
      dispatch(fetchListMovie()); // Cập nhật danh sách phim sau khi xóa
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  if (!data || data.length === 0) {
    return <p>Loading movies...</p>;
  }

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
            {data.map((movie) => (
              <tr key={movie.maPhim} className="hover:bg-gray-100">
                <td className="p-3 border">{movie.maPhim}</td>
                <td className="p-3 border">
                  <img className="w-20" src={movie.hinhAnh} alt="" />
                </td>
                <td className="p-3 border">{movie.tenPhim}</td>
                <td className="p-3 border">{movie.moTa}</td>
                <td className="p-3 border space-x-2">
                  <Link
                    to={`/admin/edit/${movie.maPhim}`}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(movie.maPhim)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/admin/showtime/${movie.maPhim}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Showtime
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
