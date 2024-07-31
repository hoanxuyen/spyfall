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
import { AnimatePresence } from "framer-motion";

export default function SpyLobby() {
  const dispatch = useDispatch();
  const currentOption = useSelector(
    (state: RootState) => state.PlayerSlice.locationsOption
  );
  const renderLocationSource = () => {
    switch (currentOption) {
      case LocationSource.DEFAULT:
        return <SpyAvailableLocation />;
      case LocationSource.CUSTOM:
        return <SpyCustomLocation />;
      case LocationSource.COMBINE:
        return (
          <>
            <SpyAvailableLocation />
            <SpyCustomLocation />
          </>
        );
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <SpyLobbyForm />
        <SpyModal>
          <Rules />
          <div className="Modal-footer flex justify-end">
            <SpyButton
              size={SpyButtonSize.MD}
              color={Color.Secondary}
              label="Đã hiểu"
              onClick={() => dispatch(setOpen(false))}
            />
          </div>
        </SpyModal>
      </div>
      <AnimatePresence>{renderLocationSource()}</AnimatePresence>
    </>
  );
}
