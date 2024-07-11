import { createSlice } from "@reduxjs/toolkit";

export enum LocationSource {
  DEFAULT = "DEFAULT",
  COMBINE = "COMBINE",
  CUSTOM = "CUSTOM",
}

type PlayerStateType = {
  value: number;
  spyIndex: null | number;
  location: null | string;
  currentPlayerIndex: number;
  ready: boolean;
  locations: string[];
  customLocations: string[];
  locationsOption: LocationSource;
};

const initialNonCustomState = {
  spyIndex: null,
  location: null,
  currentPlayerIndex: 0,
  ready: false,
  locationsOption: LocationSource.DEFAULT,
};

const initialState: PlayerStateType = {
  ...initialNonCustomState,
  value: 4,
  locations: [
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
  ],
  customLocations: [],
};

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
    nextPlayer: (state) => {
      if (state.value !== null && state.currentPlayerIndex < state.value - 1) {
        state.currentPlayerIndex += 1;
        state.ready = false;
      }
    },
    setReady: (state, action) => {
      state.ready = action.payload;
    },
    resetPlayers: (state) => {
      return {
        ...initialNonCustomState,
        customLocations: state.customLocations,
        locations: state.locations,
        value: state.value,
      };
    },
    resetAllPlayers: () => {
      return initialState;
    },
    updateLocations: (state, action) => {
      state.locations = action.payload;
    },
    updateCustomLocations: (state, action) => {
      state.customLocations = action.payload;
    },
    showOption: (state, action) => {
      state.locationsOption = action.payload;
    },
    assignLocation: (state) => {
      switch (state.locationsOption) {
        case LocationSource.DEFAULT:
          state.location =
            state.locations[Math.floor(Math.random() * state.locations.length)];
          break;
        case LocationSource.COMBINE: {
          const allLocation = [...state.locations, ...state.customLocations];
          state.location =
            allLocation[Math.floor(Math.random() * allLocation.length)];
          break;
        }
        case LocationSource.CUSTOM:
          state.location =
            state.customLocations[
              Math.floor(Math.random() * state.customLocations.length)
            ];
          break;
      }
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
  resetAllPlayers,
  updateLocations,
  updateCustomLocations,
  showOption,
} = playerSlice.actions;

export default playerSlice.reducer;
