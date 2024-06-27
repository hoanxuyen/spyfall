import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import PlayerComponent from "./SpyPlayerComponent";
import SpyComponent from "./SpySpyComponent";
import ReadyComponent from "./SpyReadyComponent";
import { AnimatePresence } from "framer-motion";
import SpyButton from "./SpyButton";
import { SpyButtonSize } from "./SpyButtonType";
import { Color } from "../theme";
import { nextPlayer, setReady } from "../features/PlayerSlice";
export default function SpyAnnounceRole() {
  const spyIndex = useSelector(
    (state: RootState) => state.PlayerSlice.spyIndex
  );
  const currentPlayerIndex = useSelector(
    (state: RootState) => state.PlayerSlice.currentPlayerIndex
  );
  const ready = useSelector((state: RootState) => state.PlayerSlice.ready);
  const dispatch = useDispatch();
  const onBtnClick = () => {
    if (ready) {
      dispatch(nextPlayer());
      dispatch(setReady(false));
    } else {
      dispatch(setReady(true));
    }
  };
  return (
    <div className="text-center text-3xl">
      <AnimatePresence>
        <div>
          {!ready ? (
            <ReadyComponent key="ready" />
          ) : currentPlayerIndex === spyIndex ? (
            <SpyComponent key="spy" />
          ) : (
            <PlayerComponent key="player" />
          )}
        </div>
      </AnimatePresence>
      <SpyButton
        label={ready ? "Oke" : "Đã sẵn sàng"}
        size={SpyButtonSize.XL}
        color={ready ? Color.Primary : Color.Secondary}
        onClick={onBtnClick}
      />
    </div>
  );
}
