import Seat from "./Seat";
import { useSelector } from "react-redux";

export default function HomePage() {
  const props = useSelector((state) => state.bookingTicketReducer);
  const { listSeats, listSeatsSelected } = props;

  const renderRowIndex = () => {
    const data = listSeats[0];
    return (
      <div className="space-x-12">
        <span></span>
        {data.danhSachGhe.map((item) => {
          return <span key={item.soGhe}>{item.soGhe}</span>;
        })}
      </div>
    );
  };

  const renderListSeats = () => {
    return listSeats.map((row, index) => {
      if (index === 0) return;

      return (
        <div className="space-x-10 space-y-10" key={row.hang}>
          <span>{row.hang}</span>
          {row.danhSachGhe.map((seat) => (
            <Seat key={seat.soGhe} seat={seat} />
          ))}
        </div>
      );
    });
  };

  const totalPrice = () => {
    return listSeatsSelected.reduce((total, seat) => (total += seat.gia), 0);
  };

  return (
    <div className="container mx-auto">
      <h1>Booking Ticket Online</h1>
      <div className="flex">
        <div className="w-3/5">
          {/* render ra số thứ tự ghế */}
          {renderRowIndex()}
          {renderListSeats()}
        </div>
        <div className="w-2/5">
          <h1>Danh sách ghế đang chọn</h1>
          {listSeatsSelected.map((seat) => (
            <div key={seat.soGhe}>
              Ghế {seat.soGhe} - Giá: {seat.gia}
            </div>
          ))}
          <div>Total: {totalPrice()}</div>
        </div>
      </div>
    </div>
  );
}
