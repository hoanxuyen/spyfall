import { useNavigate } from "react-router-dom";
import CountDownTimer from "./CountDownTimer";
import SpyButton from "./SpyButton";
import { SpyButtonSize } from "./SpyButtonType";
import SpyHeading from "./typography/SpyHeading";
import { SpyHeadingType } from "./typography/SpyHeadingType";
import { Color } from "../theme";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";

export default function SpyDiscuss() {
  const navigate = useNavigate();
  const time = useSelector((state: RootState) => state.TimerSlice.value * 1000);
  useEffect(() => {
    const timer = setTimeout(() => navigate("/reveal"), time);
    return () => clearTimeout(timer);
  }, [time, navigate]);
  return (
    <div className="flex justify-center flex-col gap-4 flex-auto">
      <SpyHeading
        text="Trong thời gian đếm ngược hãy cùng nhau bàn luận để đoán xem ai là điệp viên nhé!"
        type={SpyHeadingType.h3}
        className="mt-auto"
      />
      <div className="flex flex-col w-full sm:w-1/2 gap-4 mb-auto mx-auto">
        <CountDownTimer />
      </div>
      <SpyButton
        color={Color.Secondary}
        label="Đã tìm ra!!"
        size={SpyButtonSize.MD}
        onClick={() => navigate("/reveal")}
      />
    </div>
  );
}
