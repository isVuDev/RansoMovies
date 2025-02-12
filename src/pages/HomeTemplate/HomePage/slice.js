import { createSlice } from "@reduxjs/toolkit";
import data from "./danhSachGhe.json";

const initialState = {
  listSeats: data,
  listSeatsSelected: [],
};

const findIndexSeat = (data, numberSeat) => {
  return data.findIndex((seat) => seat.soGhe === numberSeat);
};

const bookingTicketSlice = createSlice({
  name: "bookingTicketSlice",
  initialState,
  reducers: {
    setSeatSelected: (state, action) => {
      const { payload } = action;
      const index = findIndexSeat(state.listSeatsSelected, payload.soGhe);
      const listSeatsSelectedClone = [...state.listSeatsSelected];
      if (index !== -1) {
        // remove seat
        listSeatsSelectedClone.splice(index, 1);
      } else {
        // push seat
        listSeatsSelectedClone.push(payload);
      }
      state.listSeatsSelected = listSeatsSelectedClone;
    },
  },
});

export const { setSeatSelected } = bookingTicketSlice.actions;

export default bookingTicketSlice.reducer;
