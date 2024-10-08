import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { AnimatePresence } from "framer-motion";
import SpyButton from "./SpyButton";
import { SpyButtonSize } from "./SpyButtonType";
import { Color } from "../theme";
import { nextPlayer, setReady } from "../features/PlayerSlice";
import SpyReady from "./SpyReady";
import SpySpy from "./SpySpy";
import SpyPlayer from "./SpyPlayer";
import { useNavigate } from "react-router-dom";
export default function SpyAnnounceRole() {
  const spyIndex = useSelector(
    (state: RootState) => state.PlayerSlice.spyIndex
  );
  const totalPlayer = useSelector(
    (state: RootState) => state.PlayerSlice.value
  );
  const currentPlayerIndex = useSelector(
    (state: RootState) => state.PlayerSlice.currentPlayerIndex
  );
  const ready = useSelector((state: RootState) => state.PlayerSlice.ready);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onBtnClick = () => {
    if (ready) {
      if (currentPlayerIndex + 1 === totalPlayer) {
        navigate("/discuss");
      } else {
        dispatch(nextPlayer());
      }
    } else {
      dispatch(setReady(true));
    }
  };
  return (
    <div className="flex flex-col flex-auto justify-center items-center">
      <AnimatePresence>
        <div className="text-3xl my-auto">
          {!ready ? (
            <SpyReady key="ready" />
          ) : currentPlayerIndex === spyIndex ? (
            <SpySpy key="spy" />
          ) : (
            <SpyPlayer key="player" />
          )}
        </div>
      </AnimatePresence>
      <SpyButton
        label={ready ? "Oke" : "Đã sẵn sàng"}
        size={SpyButtonSize.XL}
        color={ready ? Color.Primary : Color.Secondary}
        onClick={onBtnClick}
        customClass="text-xl w-full sm:w-1/2"
      />
    </div>
  );
}
