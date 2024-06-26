import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import SpyInput from "./form/SpyInput";
import SpySelect from "./form/SpySelect";
import { useDispatch } from "react-redux";
import { setInitialValue } from "../features/TimerSlice";
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
  const methods = useForm<SpyLobbyFormValues>({
    defaultValues: { numberOfPlayers: 4, timer: 5 },
  });

  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<SpyLobbyFormValues> = (data) => {
    dispatch(setInitialValue(data.timer));
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        data-testid="spyLobbyFormID"
        className="space-y-4"
      >
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
        <button type="submit">Start Game</button>
      </form>
    </FormProvider>
  );
}
