import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetailMovie } from "../../../HomeTemplate/DetailMoviePage/slice";
import api from "../../../../services/api";
import { toast, ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function EditMoviePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    data: movie,
    loading,
    error,
  } = useSelector((state) => state.detailMovieReducer);

  // State tạm thời để lưu thông tin chỉnh sửa
  const [formData, setFormData] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    maNhom: "GP07",
    ngayKhoiChieu: "",
    dangChieu: false,
    sapChieu: false,
    hot: false,
    danhGia: "",
    maPhim: "",
    hinhAnh: null,
  });

  const navigate = useNavigate();

  // Lấy dữ liệu phim từ Redux store
  useEffect(() => {
    if (!movie || movie.maPhim !== Number(id)) {
      dispatch(fetchDetailMovie(id));
    } else {
      setFormData({
        tenPhim: movie.tenPhim || "",
        trailer: movie.trailer || "",
        moTa: movie.moTa || "",
        maNhom: movie.maNhom || "GP07",
        ngayKhoiChieu: dayjs(movie.ngayKhoiChieu).format("YYYY-MM-DD") || "",
        dangChieu: movie.dangChieu || false,
        sapChieu: movie.sapChieu || false,
        hot: movie.hot || false,
        danhGia: movie.danhGia || "",
        maPhim: movie.maPhim || "",
        hinhAnh: null,
      });
    }
  }, [movie, id, dispatch]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Xử lý thay đổi file ảnh
  const handleFileChange = (e) => {
    setFormData({ ...formData, hinhAnh: e.target.files[0] });
  };

  // Xử lý cập nhật phim
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = dayjs(formData.ngayKhoiChieu).format("DD/MM/YYYY");

    if (!formData.tenPhim || !formData.trailer || !formData.moTa) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const data = new FormData();
    data.append("tenPhim", formData.tenPhim);
    data.append("trailer", formData.trailer);
    data.append("moTa", formData.moTa);
    data.append("maNhom", formData.maNhom);
    data.append("ngayKhoiChieu", formattedDate);
    data.append("sapChieu", formData.sapChieu);
    data.append("dangChieu", formData.dangChieu);
    data.append("hot", formData.hot);
    data.append("danhGia", formData.danhGia);
    data.append("maPhim", formData.maPhim);
    if (formData.hinhAnh) {
      data.append("hinhAnh", formData.hinhAnh);
    }

    try {
      await api.post("/QuanLyPhim/CapNhatPhimUpload", data);
      toast.success("Cập nhật phim thành công!");
      setTimeout(() => {
        navigate("/admin/films");
      }, 1500);
    } catch (error) {
      toast.error("Lỗi khi cập nhật phim!");
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi khi tải dữ liệu phim.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-red-500 text-4xl mb-10">
        Chỉnh sửa phim
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Tên phim:</label>
          <input
            type="text"
            name="tenPhim"
            className="w-full p-2 border rounded"
            value={formData.tenPhim}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium">Trailer:</label>
          <input
            type="text"
            name="trailer"
            className="w-full p-2 border rounded"
            value={formData.trailer}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium">Mô tả:</label>
          <textarea
            name="moTa"
            className="w-full p-2 border rounded"
            value={formData.moTa}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Ngày khởi chiếu:</label>
          <input
            type="date"
            name="ngayKhoiChieu"
            className="w-full p-2 border rounded"
            value={formData.ngayKhoiChieu}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="dangChieu"
              className="mr-2"
              checked={formData.dangChieu}
              onChange={handleChange}
            />
            Đang chiếu
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="sapChieu"
              className="mr-2"
              checked={formData.sapChieu}
              onChange={handleChange}
            />
            Sắp chiếu
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="hot"
              className="mr-2"
              checked={formData.hot}
              onChange={handleChange}
            />
            Hot
          </label>
        </div>

        <div>
          <label className="block font-medium">Số sao:</label>
          <input
            type="number"
            name="danhGia"
            className="w-full p-2 border rounded"
            value={formData.danhGia}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium">Hình ảnh:</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 cursor-pointer"
        >
          Cập nhật phim
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
