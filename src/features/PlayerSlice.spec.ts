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
      const state = { ...initialState, value: 4 };
      const newState = playerReducer(state, assignSpy(4));
      expect(newState.spyIndex).toBeGreaterThanOrEqual(0);
      expect(newState.spyIndex).toBeLessThan(4);
    });
  });
  describe("assignLocation reducer", () => {
    it("Should assign a random location in list", () => {
      const state = { ...initialState };
      const newState = playerReducer(state, assignLocation());
      expect(locationList).toContain(newState.location);
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
