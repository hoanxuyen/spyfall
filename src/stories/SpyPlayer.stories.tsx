import { Provider } from "react-redux";
import { store } from "../store/store";
import { Meta, StoryObj } from "@storybook/react";
import SpyAnnounceRole from "../components/SpyAnnounceRole";
import SpyPlayer from "../components/SpyPlayer";

const meta: Meta<typeof SpyAnnounceRole> = {
  title: "Components/Announce Player",
  component: SpyPlayer,
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
