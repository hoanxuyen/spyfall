import { useDispatch, useSelector } from "react-redux";
import { Color } from "../theme";
import Rules from "./Rules";
import SpyButton from "./SpyButton";
import { SpyButtonSize } from "./SpyButtonType";
import SpyLobbyForm from "./SpyLobbyForm";
import SpyModal from "./SpyModal";
import { setOpen } from "../features/ModalSlice";
import { RootState } from "../store/store";
import SpyAvailableLocation from "./SpyAvailableLocation";
import SpyCustomLocation from "./SpyCustomLocation";
import { LocationSource } from "../features/PlayerSlice";

export default function SpyLobby() {
  const dispatch = useDispatch();
  const currentOption = useSelector(
    (state: RootState) => state.PlayerSlice.locationsOption
  );
  return (
    <>
      <div className="flex justify-center items-center">
        <SpyLobbyForm />
        <SpyModal>
          <Rules />
          <div className="Modal-footer flex justify-end">
            <SpyButton
              size={SpyButtonSize.SM}
              color={Color.Secondary}
              label="Đã hiểu"
              onClick={() => dispatch(setOpen(false))}
            />
          </div>
        </SpyModal>
      </div>
      <div>
        {currentOption === LocationSource.DEFAULT ? (
          <SpyAvailableLocation />
        ) : currentOption === LocationSource.CUSTOM ? (
          <SpyCustomLocation />
        ) : currentOption === LocationSource.COMBINE ? (
          <>
            <SpyAvailableLocation />
            <SpyCustomLocation />
          </>
        ) : null}
      </div>
    </>
  );
}
