import playerReducer, {
  setInitialPlayer,
  assignSpy,
  assignLocation,
  nextPlayer,
  setReady,
  resetPlayers,
  showOption,
  updateCustomLocations,
  updateLocations,
  LocationSource,
} from "./PlayerSlice";
describe("PlayerSlice's Reducer", () => {
  const initialState = {
    value: 4,
    spyIndex: null,
    location: null,
    currentPlayerIndex: 0,
    ready: false,
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
    locationsOption: LocationSource.DEFAULT,
  };

  it("Should handle initial state", () => {
    expect(playerReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  describe("setInitialPlayer reducer", () => {
    it("Should set initial players by amount", () => {
      expect(playerReducer(initialState, setInitialPlayer(4))).toEqual({
        ...initialState,
        value: 4,
      });
    });
  });

  describe("assignSpy reducer", () => {
    it("Should assign a spy", () => {
      vi.spyOn(global.Math, "random").mockReturnValueOnce(0.1);
      const state = { ...initialState, value: 4 };
      const newState = playerReducer(state, assignSpy(4));
      expect(newState.spyIndex).toBe(0);
    });
  });

  describe("assignLocation reducer", () => {
    it("Should assign a random location from predefined list", () => {
      vi.spyOn(global.Math, "random").mockReturnValueOnce(0.01);
      const state = { ...initialState, locationsOption: LocationSource.DEFAULT };
      const newState = playerReducer(state, assignLocation());
      expect(newState.location).toBe(initialState.locations[0]);
    });

    it("Should assign a random location from custom list", () => {
      const customLocations = ["Custom Location 1", "Custom Location 2"];
      const state = {
        ...initialState,
        customLocations,
        locationsOption: LocationSource.CUSTOM,
      };
      vi.spyOn(global.Math, "random").mockReturnValueOnce(0.5);
      const newState = playerReducer(state, assignLocation());
      expect(newState.location).toBe(customLocations[1]);
    });

    it("Should assign a random location from both lists", () => {
      const customLocations = ["Custom Location 1", "Custom Location 2"];
      const state = {
        ...initialState,
        customLocations,
        locationsOption: LocationSource.COMBINE,
      };
      vi.spyOn(global.Math, "random").mockReturnValueOnce(0.96);
      const newState = playerReducer(state, assignLocation());
      expect(newState.location).toBe(customLocations[0]);
    });
  });

  describe("nextPlayer reducer", () => {
    it("Should move to next player", () => {
      const state = { ...initialState, value: 4, currentPlayerIndex: 2 };
      const newState = playerReducer(state, nextPlayer());
      expect(newState.currentPlayerIndex).toBe(3);
      expect(newState.ready).toBe(false);
    });

    it("Should stop at the last player and not wrap around", () => {
      const state = { ...initialState, value: 4, currentPlayerIndex: 3 };
      const newState = playerReducer(state, nextPlayer());
      expect(newState.currentPlayerIndex).toBe(3);
      expect(newState.ready).toBe(false);
    });
  });

  describe("setReady reducer", () => {
    it("Should set the ready state", () => {
      const state = { ...initialState, ready: false };
      const newState = playerReducer(state, setReady(true));
      expect(newState.ready).toBe(true);
    });
  });

  describe("resetPlayers reducer", () => {
    it("Should reset the playerSlice to initialState", () => {
      const modifiedState = {
        ...initialState,
        currentPlayerIndex: 3,
        ready: true,
      };
      expect(playerReducer(modifiedState, resetPlayers())).toEqual(
        initialState
      );
    });
  });

  describe("updateLocations reducer", () => {
    it("Should update the predefined locations list", () => {
      const newLocations = ["Location 1", "Location 2"];
      const newState = playerReducer(
        initialState,
        updateLocations(newLocations)
      );
      expect(newState.locations).toEqual(newLocations);
    });
  });

  describe("updateCustomLocations reducer", () => {
    it("Should update the custom locations list", () => {
      const newCustomLocations = ["Custom 1", "Custom 2"];
      const newState = playerReducer(
        initialState,
        updateCustomLocations(newCustomLocations)
      );
      expect(newState.customLocations).toEqual(newCustomLocations);
    });
  });

  describe("showOption reducer", () => {
    it("Should set the locations option", () => {
      const newState = playerReducer(initialState, showOption(LocationSource.CUSTOM));
      expect(newState.locationsOption).toBe(LocationSource.CUSTOM);
    });
  });
});
