import { useDispatch } from "react-redux";
import { Color } from "../theme";
import Rules from "./Rules";
import SpyButton from "./SpyButton";
import { SpyButtonSize } from "./SpyButtonType";
import SpyLobbyForm from "./SpyLobbyForm";
import SpyModal from "./SpyModal";
import { setOpen } from "../features/ModalSlice";

export default function SpyLobby() {
  const dispatch = useDispatch();
  return (
    <div className="flex h-full justify-center items-center">
      <SpyLobbyForm />
      <SpyModal>
        <Rules />
        <div className="Modal-footer flex justify-end">
          <SpyButton
            size={SpyButtonSize.SM}
            color={Color.Secondary}
            label="Đã hiểu"
            onClick={() => dispatch(setOpen(false))}
          />
        </div>
      </SpyModal>
    </div>
  );
}
