import { Provider } from "react-redux";
import { store } from "../store/store";
import { Meta, StoryObj } from "@storybook/react";
import PreviewPlayer from "../components/PreviewPlayer";
import PlayerComponent from "../components/PreviewPlayerPlayer";

const meta: Meta<typeof PreviewPlayer> = {
  title: "Components/PreviewPlayer",
  component: PlayerComponent,
  parameters: { layout: "centered" },
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
export const PlayerAnnounce: Story = {};
