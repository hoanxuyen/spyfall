import reducer, { decrement, setInitialValue } from "./TimerSlice";
describe("timerSlice reducer", () => {
  it("should handle initial state", () => {
    const initialState = { value: 0 };
    expect(reducer(undefined, { type: "unknow" })).toEqual(initialState);
  });
  describe("Set initial value", () => {
    const initialState = { value: 0 };
    it("should set value by multiply by 60", () => {
      expect(reducer(initialState, setInitialValue(5))).toEqual({ value: 300 });
    });
  });
  describe("decrement the value", () => {
    it("Should decrement the value by 1", () => {
      const initialState = { value: 10 };
      expect(reducer(initialState, decrement())).toEqual({ value: 9 });
    });
    it("Should stop decrement when the value reached 0", () => {
      const initialState = { value: 0 };
      expect(reducer(initialState, decrement())).toEqual(initialState);
    });
  });
});
