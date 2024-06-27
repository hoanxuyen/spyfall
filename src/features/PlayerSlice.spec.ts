import playerReducer, {
  setInitialPlayer,
  assignSpy,
  assignLocation,
  nextPlayer,
  setReady,
  locationList,
} from "./PlayerSlice";
describe("PlayerSlice's Reducer", () => {
  const initialState = {
    value: null,
    spyIndex: null,
    location: null,
    currentPlayerIndex: 0,
    ready: false,
  };
  it("Should handle initial state", () => {
    expect(playerReducer(undefined, { type: "unknow" })).toEqual(initialState);
  });
  describe("setInitial Player reducer", () => {
    it("Should set initial players by ammount", () => {
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
    it("Should assign a random location in list", () => {
      vi.spyOn(global.Math, "random").mockReturnValueOnce(0.01);
      const state = { ...initialState };
      const newState = playerReducer(state, assignLocation());
      expect(newState.location).toBe(locationList[0])

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
});
