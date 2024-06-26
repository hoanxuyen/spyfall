import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import PlayerComponent from "./PreviewPlayer/Player";
import SpyComponent from "./PreviewPlayerSpy";
import ReadyComponent from "./PreviewPlayerReady";
import { AnimatePresence } from "framer-motion";
import SpyButton from "./SpyButton";
import { SpyButtonSize } from "./SpyButtonType";
import { Color } from "../theme";
import { nextPlayer, setReady } from "../features/PlayerSlice";
export default function PreviewPlayer() {
  const spyIndex = useSelector(
    (state: RootState) => state.PlayerSlice.spyIndex
  );
  const currentPlayerIndex = useSelector(
    (state: RootState) => state.PlayerSlice.currentPlayerIndex
  );
  const ready = useSelector((state: RootState) => state.PlayerSlice.ready);
  const dispatch = useDispatch();
  return (
    <div>
      <AnimatePresence>
        {ready ? (
          <div className="text-center text-3xl">
            {currentPlayerIndex === spyIndex ? (
              <SpyComponent />
            ) : (
              <PlayerComponent />
            )}
            <SpyButton
              label="Oke"
              size={SpyButtonSize.XL}
              color={Color.Primary}
              onClick={() => {
                dispatch(nextPlayer());
                dispatch(setReady(false));
              }}
            />
          </div>
        ) : (
          <div className="text-center text-3xl">
            <ReadyComponent />
            <SpyButton
              label="Đã sẵn sàng"
              size={SpyButtonSize.XL}
              color={Color.Secondary}
              onClick={() => dispatch(setReady(true))}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
