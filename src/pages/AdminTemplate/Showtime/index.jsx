import api from "../../../services/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDetailMovie } from "../../HomeTemplate/DetailMoviePage/slice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import dayjs from "dayjs";

export default function CreateShowtimePage() {
  const { id } = useParams();
  const [heThongRap, setHeThongRap] = useState([]);
  const [cumRap, setCumRap] = useState([]);
  const [selectedHeThong, setSelectedHeThong] = useState("");
  const [selectedCumRap, setSelectedCumRap] = useState("");
  const [ngayChieuGioChieu, setNgayChieuGioChieu] = useState("");
  const [giaVe, setGiaVe] = useState("");
  const state = useSelector((state) => state.detailMovieReducer);
  const { data } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDetailMovie(id));
  }, []);

  useEffect(() => {
    const fetchHeThongRap = async () => {
      try {
        const response = await api.get("/QuanLyRap/LayThongTinHeThongRap");
        setHeThongRap(response.data.content);
      } catch (error) {
        console.error("Error fetching cinema systems:", error);
      }
    };

    fetchHeThongRap();
  }, []);

  useEffect(() => {
    if (!selectedHeThong) return;

    const fetchCumRap = async () => {
      try {
        const response = await api.get(
          `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${selectedHeThong}`
        );
        setCumRap(response.data.content);
      } catch (error) {
        console.error("Error fetching cinema clusters:", error);
      }
    };

    fetchCumRap();
  }, [selectedHeThong]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formartedDate = dayjs(ngayChieuGioChieu).format(
      "DD/MM/YYYY hh:mm:ss"
    );

    const payload = {
      maPhim: id, // Lấy từ URL
      ngayChieuGioChieu: formartedDate,
      maRap: selectedCumRap,
      giaVe: Number(giaVe),
    };
    console.log(payload);

    try {
      await api.post("/QuanLyDatVe/TaoLichChieu", payload);
      toast.success("Tạo lịch chiếu thành công!");
      setTimeout(() => {
        navigate("/admin/films");
      }, 1500);
    } catch (error) {
      toast.error("Tạo lịch chiếu không thành công!");
      console.error("Error creating showtime:", error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center mb-10">
      {data && (
        <h2 className="text-2xl font-bold mb-4">
          Tạo lịch chiếu - {data.tenPhim}
        </h2>
      )}
      {data && (
        <img className="rounded-t-lg h-[300px]" src={data.hinhAnh} alt="" />
      )}
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-4 justify-center"
        >
          <div>
            <label>Hệ thống rạp:</label>
            <select
              value={selectedHeThong}
              onChange={(e) => setSelectedHeThong(e.target.value)}
              required
            >
              <option value="">Chọn hệ thống rạp</option>
              {heThongRap.map((rap) => (
                <option key={rap.maHeThongRap} value={rap.maHeThongRap}>
                  {rap.tenHeThongRap}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Cụm rạp:</label>
            <select
              value={selectedCumRap}
              onChange={(e) => setSelectedCumRap(e.target.value)}
              required
            >
              <option value="">Chọn cụm rạp</option>
              {cumRap.map((rap) => (
                <option key={rap.maCumRap} value={rap.maCumRap}>
                  {rap.tenCumRap}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Ngày chiếu - giờ chiếu:</label>
            <input
              type="datetime-local"
              value={ngayChieuGioChieu}
              onChange={(e) => setNgayChieuGioChieu(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 ml-2"
              required
            />
          </div>

          <div>
            <label>Giá vé:</label>
            <input
              type="number"
              value={giaVe}
              onChange={(e) => setGiaVe(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 ml-2"
              required
              placeholder="75.000 - 220.000"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            Tạo lịch chiếu
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
