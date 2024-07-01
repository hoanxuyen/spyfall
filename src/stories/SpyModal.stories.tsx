import { Meta, StoryObj } from "@storybook/react";
import SpyModal from "../components/SpyModal";
import SpyButton from "../components/SpyButton";
import { Color } from "../theme";
import { SpyButtonSize } from "../components/SpyButtonType";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store/store";
import { setOpen } from "../features/ModalSlice";

const meta: Meta<typeof SpyModal> = {
  title: "Components/Modal",
  component: SpyModal,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Modal: Story = {
  render: () => {
    const dispatch = useDispatch();
    return (
      <>
        <SpyButton
          label="Open modal"
          color={Color.Primary}
          size={SpyButtonSize.MD}
          onClick={() => {
            dispatch(setOpen(true));
          }}
        />
        <SpyModal>
          <p>This is the modal content</p>
        </SpyModal>
      </>
    );
  },
};
