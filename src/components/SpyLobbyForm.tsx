import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import SpyInput from "./form/SpyInput";
import SpySelect from "./form/SpySelect";
import { useDispatch, useSelector } from "react-redux";
import { setInitialValue } from "../features/TimerSlice";
import {
  assignLocation,
  assignSpy,
  LocationSource,
  resetPlayers,
  setInitialPlayer,
  showOption,
  updateCustomLocations,
} from "../features/PlayerSlice";
import SpyButton from "./SpyButton";
import { Color } from "../theme";
import { SpyButtonSize } from "./SpyButtonType";
import { setOpen } from "../features/ModalSlice";
import { useNavigate } from "react-router-dom";
import SpyRadio from "./SpyRadio";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import SpyInputWithBtn from "./form/SpyInputWithBtn";
import { AnimatePresence, motion } from "framer-motion";

type SpyLobbyFormValues = {
  numberOfPlayers: number;
  timer: number;
  locationOption: string;
  newLocation: string;
};

const timerOptions = {
  5: "5 phút",
  10: "10 phút",
  15: "15 phút",
};

export default function SpyLobbyForm() {
  const [newLocationInput, setNewLocationInput] = useState("");
  const [inputError, setInputError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customLocations = useSelector(
    (state: RootState) => state.PlayerSlice.customLocations
  );
  const timerOption = useSelector(
    (state: RootState) => Math.round(state.TimerSlice.value / 60) // một vài lúc value bé hơn 1 giây ???
  );
  const currentOption = useSelector(
    (state: RootState) => state.PlayerSlice.locationsOption
  );
  const currentPlayers = useSelector(
    (state: RootState) => state.PlayerSlice.value
  );
  const formDefaultValue = {
    numberOfPlayers: currentPlayers,
    timer: timerOption,
    locationOption: currentOption,
    newLocation: "",
  };

  const methods = useForm<SpyLobbyFormValues>({
    defaultValues: formDefaultValue,
  });
  const { setValue, clearErrors } = methods;
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(showOption(event.target.value));
  };
  const handleAddLocation = () => {
    if (newLocationInput.trim() !== "") {
      dispatch(
        updateCustomLocations([...customLocations, newLocationInput.trim()])
      );
      setValue("newLocation", "");
      setNewLocationInput("");
      clearErrors("newLocation");
    }
  };
  const onSubmit: SubmitHandler<SpyLobbyFormValues> = (data) => {
    dispatch(resetPlayers());
    dispatch(setInitialValue(data.timer));
    dispatch(setInitialPlayer(+data.numberOfPlayers));
    dispatch(assignSpy(data.numberOfPlayers));
    dispatch(showOption(data.locationOption));
    dispatch(assignLocation());
    if (
      [LocationSource.COMBINE, LocationSource.CUSTOM].includes(
        data.locationOption as LocationSource
      ) &&
      customLocations.length === 0
    ) {
      setInputError(true);
    } else {
      navigate("/roles");
    }
  };

  useEffect(() => {
    if (customLocations.length > 0) {
      setInputError(false);
    }
  }, [customLocations]);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        data-testid="spyLobbyFormID"
        className="space-y-4 w-full sm:w-1/2 text-sm sm:text-base"
      >
        <div className="form-content border border-dark dark:border-white p-6">
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
        <div className="flex flex-row justify-between flex-wrap">
          <SpyRadio
            label="Có sẵn"
            name="locationOption"
            submitValue={LocationSource.DEFAULT}
            onChange={handleRadioChange}
          />
          <SpyRadio
            label="Tự tạo"
            name="locationOption"
            submitValue={LocationSource.CUSTOM}
            onChange={handleRadioChange}
          />
          <SpyRadio
            label="Cả hai"
            name="locationOption"
            submitValue={LocationSource.COMBINE}
            onChange={handleRadioChange}
          />
          <AnimatePresence>
            {[LocationSource.CUSTOM, LocationSource.COMBINE].includes(
              currentOption
            ) ? (
              <motion.div
                className="basis-full mt-4"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
              >
                <SpyInputWithBtn
                  data-testid="lobbyFormLocationInput"
                  name="newLocation"
                  value={newLocationInput}
                  placeholder="Nhập địa điểm mới"
                  buttonLabel="+"
                  onChange={(e) => {
                    setNewLocationInput(e.target.value);
                    setValue("newLocation", e.target.value);
                  }}
                  onClick={handleAddLocation}
                />
                <AnimatePresence>
                  {inputError && (
                    <motion.p
                      className="m-0 text-red-300 font-bold"
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                    >
                      Không được để trống địa điểm
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <div className="form-buttons flex flex-row gap-4 ">
          <SpyButton
            label="Bắt đầu trò chơi"
            color={Color.Primary}
            size={SpyButtonSize.MD}
            type="submit"
            customClass="basis-1/2"
          />
          <SpyButton
            label="Xem luật chơi"
            type="button"
            color={Color.Secondary}
            size={SpyButtonSize.MD}
            onClick={() => dispatch(setOpen(true))}
            customClass="basis-1/2"
          />
        </div>
      </form>
    </FormProvider>
  );
}
