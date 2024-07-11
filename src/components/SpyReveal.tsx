import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import SpyHeading from "./typography/SpyHeading";
import { SpyHeadingType } from "./typography/SpyHeadingType";
import SpyButton from "./SpyButton";
import { Color } from "../theme";
import { SpyButtonSize } from "./SpyButtonType";
import { useNavigate } from "react-router-dom";
import ReactConfetti from "react-confetti";
import { resetAllPlayers, resetPlayers } from "../features/PlayerSlice";
import SpyModal from "./SpyModal";
import { setOpen } from "../features/ModalSlice";

export default function SpyReveal() {
  const spyIndex = useSelector(
    (state: RootState) => state.PlayerSlice.spyIndex
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="space-y-4">
      <ReactConfetti recycle={false} numberOfPieces={1000} />
      <SpyHeading
        text={`Chúc mừng bạn đã đoán ra được số ${(spyIndex as number) + 1} chính là điệp viên`}
        type={SpyHeadingType.h1}
        className="m-0"
      />
      <SpyHeading
        text="Nếu chưa đoán ra được thì bạn có muốn thử lại không?"
        type={SpyHeadingType.h2}
        className="m-0"
      />
      <div className="flex gap-4">
        <SpyButton
          color={Color.Primary}
          label="Có"
          size={SpyButtonSize.MD}
          onClick={() => {
            dispatch(setOpen(true));
          }}
          customClass="w-20"
        />
        <SpyButton
          color={Color.Secondary}
          label="Không"
          size={SpyButtonSize.MD}
          onClick={() => {
            navigate("/");
            dispatch(resetAllPlayers());
          }}
          customClass="w-20"
        />
      </div>
      <SpyModal>
        <div className="text-center">
          <SpyHeading
            text={"Bạn có muốn giữ nguyên thiết lập cũ?"}
            type={SpyHeadingType.h2}
            className="mt-0 mb-4"
          />
          <div className="flex gap-4 justify-center">
            <SpyButton
              color={Color.Primary}
              label="Giữ nguyên"
              size={SpyButtonSize.MD}
              onClick={() => {
                dispatch(resetPlayers());
                dispatch(setOpen(false));
                navigate("/lobby");
              }}
              customClass="basis-1/2 px-0"
            />
            <SpyButton
              color={Color.Secondary}
              label="Reset mọi thứ về ban đầu"
              size={SpyButtonSize.MD}
              onClick={() => {
                dispatch(resetAllPlayers());
                dispatch(setOpen(false));
                navigate("/lobby");
              }}
              customClass="basis-1/2 px-0"
            />
          </div>
        </div>
      </SpyModal>
    </div>
  );
}
