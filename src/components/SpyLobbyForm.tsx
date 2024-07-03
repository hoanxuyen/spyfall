import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import SpyInput from "./form/SpyInput";
import SpySelect from "./form/SpySelect";
import { useDispatch } from "react-redux";
import { setInitialValue } from "../features/TimerSlice";
import {
  assignLocation,
  assignSpy,
  resetPlayers,
  setInitialPlayer,
} from "../features/PlayerSlice";
import SpyButton from "./SpyButton";
import { Color } from "../theme";
import { SpyButtonSize } from "./SpyButtonType";
import { setOpen } from "../features/ModalSlice";
import { useNavigate } from "react-router-dom";
type SpyLobbyFormValues = {
  numberOfPlayers: number;
  timer: number;
};
const timerOptions = {
  5: "5 phút",
  10: "10 phút",
  15: "15 phút",
};

export default function SpyLobbyForm() {
  const navigate = useNavigate();
  const methods = useForm<SpyLobbyFormValues>({
    defaultValues: { numberOfPlayers: 4, timer: 5 },
  });

  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<SpyLobbyFormValues> = (data) => {
    dispatch(resetPlayers());
    dispatch(setInitialValue(data.timer));
    dispatch(setInitialPlayer(+data.numberOfPlayers));
    dispatch(assignSpy(data.numberOfPlayers));
    dispatch(assignLocation());
    navigate("/roles");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        data-testid="spyLobbyFormID"
        className="space-y-4"
      >
        <div className="form-content border border-white p-6">
          <SpyInput
            name="numberOfPlayers"
            label="Số lượng người chơi"
            type="number"
            rules={{
              required: "Yêu cầu nhập số lượng người chơi",
              min: {
                value: 3,
                message: "Yêu cầu danh sách người chơi tối thiểu hai 3 người",
              },
            }}
          />
          <SpySelect
            name="timer"
            label="Chọn thời gian chơi"
            list={timerOptions}
          />
        </div>
        <div className="form-butons flex flex-row gap-2 ">
          <SpyButton
            label="Bắt đầu trò chơi"
            color={Color.Primary}
            size={SpyButtonSize.MD}
            type="submit"
            customClass="basis-full"
          />
          <SpyButton
            label="?"
            type="button"
            color={Color.Secondary}
            size={SpyButtonSize.MD}
            onClick={() => dispatch(setOpen(true))}
          />
        </div>
      </form>
    </FormProvider>
  );
}
