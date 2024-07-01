import modalReducer, { setOpen } from "../features/ModalSlice";
describe("ModalSlice's Reducer", () => {
  const initialState = {
    isOpen: false,
  };
  it("Should handle initial state", () => {
    expect(modalReducer(undefined, { type: "unknow" })).toEqual(initialState);
  });
  describe("setOpen reducer", () => {
    it("Should change the state by payload", () => {
      expect(modalReducer(initialState, setOpen(true))).toEqual({
        isOpen: true,
      });
    });
  });
});
