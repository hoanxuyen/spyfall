import { createSlice } from "@reduxjs/toolkit";
type PlayerStateType = {
  value: null | number;
  spyIndex: null | number;
  location: null | string;
  currentPlayerIndex: number;
  ready: boolean;
};
const initialState: PlayerStateType = {
  value: null,
  spyIndex: null,
  location: null,
  currentPlayerIndex: 0,
  ready: false,
};
export const locationList = [
  "Vòng xoay Lăng Cha Cả",
  "Maximark Cộng Hoà",
  "Hồ Con Rùa",
  "Nhà thờ Đức Bà",
  "Bưu điện Trung tâm Sài Gòn",
  "Chợ Bến Thành",
  "Dinh Độc Lập",
  "Phố đi bộ Nguyễn Huệ",
  "Cầu Ánh Sao",
  "Công viên 23/9",
  "Thảo Cầm Viên",
  "Cầu Sài Gòn",
  "Cầu Phú Mỹ",
  "Bến Bạch Đằng",
  "Chợ Lớn",
  "Chùa Vĩnh Nghiêm",
  "Bitexco Financial Tower",
  "Bảo tàng Chứng tích Chiến tranh",
  "Công viên Tao Đàn",
  "Bến Nhà Rồng",
  "Nhà hát Thành phố",
  "Công viên Văn hóa Đầm Sen",
  "Khu du lịch Suối Tiên",
  "Đường sách Nguyễn Văn Bình",
  "Công viên Hoàng Văn Thụ",
  "Khu phố Tây Bùi Viện",
  "Chùa Giác Lâm",
  "Chợ An Đông",
  "Đại học Quốc gia TP.HCM",
  "Công viên Lê Thị Riêng",
];
export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setInitialPlayer: (state, action) => {
      state.value = action.payload;
    },
    assignSpy: (state, action) => {
      state.spyIndex = Math.floor(Math.random() * action.payload);
    },
    assignLocation: (state) => {
      state.location =
        locationList[Math.floor(Math.random() * locationList.length)];
    },
    nextPlayer: (state) => {
      if (state.value !== null && state.currentPlayerIndex < state.value - 1) {
        state.currentPlayerIndex += 1;
        state.ready = false;
      }
    },
    setReady: (state, action) => {
      state.ready = action.payload;
    },
    resetPlayers: () => {
      return initialState;
    },
  },
});
export const {
  setInitialPlayer,
  assignSpy,
  assignLocation,
  nextPlayer,
  setReady,
  resetPlayers,
} = playerSlice.actions;
export default playerSlice.reducer;
