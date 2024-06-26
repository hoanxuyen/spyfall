import { Provider } from "react-redux";
import { store } from "../store/store";
import { Meta, StoryObj } from "@storybook/react";
import PreviewPlayer from "../components/PreviewPlayer";
import PlayerComponent from "../components/PreviewPlayer/Player";

const meta: Meta<typeof PreviewPlayer> = {
  title: "PreviewPlayer",
  component: PlayerComponent,
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
export const Ready: Story = {};
