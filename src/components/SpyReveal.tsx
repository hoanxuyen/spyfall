import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import SpyHeading from "./typography/SpyHeading";
import { SpyHeadingType } from "./typography/SpyHeadingType";
import SpyButton from "./SpyButton";
import { Color } from "../theme";
import { SpyButtonSize } from "./SpyButtonType";
import { useNavigate } from "react-router-dom";
import ReactConfetti from "react-confetti";

export default function SpyReveal() {
  const spyIndex = useSelector(
    (state: RootState) => state.PlayerSlice.spyIndex
  );
  const navigate = useNavigate();
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
            navigate("/lobby");
          }}
          customClass="w-20"
        />
        <SpyButton
          color={Color.Secondary}
          label="Không"
          size={SpyButtonSize.MD}
          onClick={() => {
            navigate("/");
          }}
          customClass="w-20"
        />
      </div>
    </div>
  );
}
