import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../../../services/api";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function AddMoviePage() {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, hinhAnh: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = dayjs(formData.ngayKhoiChieu).format("DD/MM/YYYY");

    console.log(formData);

    if (
      !formData.tenPhim ||
      !formData.trailer ||
      !formData.moTa ||
      !formData.hinhAnh ||
      !formData.ngayKhoiChieu
    ) {
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
    data.append("hinhAnh", formData.hinhAnh);

    try {
      await api.post("/QuanLyPhim/ThemPhimUploadHinh", data);
      toast.success("Thêm phim thành công!");
      setTimeout(() => {
        navigate("/admin/films");
      }, 1500);
    } catch (error) {
      toast.error("Lỗi khi thêm phim!");
      console.error("Error adding movie:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-red-500 text-4xl mb-10">Thêm phim mới</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Tên phim:</label>
          <input
            type="text"
            name="tenPhim"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium">Trailer:</label>
          <input
            type="text"
            name="trailer"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium">Mô tả:</label>
          <textarea
            name="moTa"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Ngày khởi chiếu:</label>
          <input
            type="date"
            name="ngayKhoiChieu"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="dangChieu"
              className="mr-2"
              onChange={handleChange}
            />
            Đang chiếu
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="sapChieu"
              className="mr-2"
              onChange={handleChange}
            />
            Sắp chiếu
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="hot"
              className="mr-2"
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
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium">Hình ảnh:</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded cursor-pointer"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 cursor-pointer"
          onClick={handleSubmit}
        >
          Thêm phim
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
