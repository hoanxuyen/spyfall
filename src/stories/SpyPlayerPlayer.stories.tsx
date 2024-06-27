import { Provider } from "react-redux";
import { store } from "../store/store";
import { Meta, StoryObj } from "@storybook/react";
import SpyPlayerComponent from "../components/SpyPlayerComponent";
import SpyAnnounceRole from "../components/SpyAnnounceRole";

const meta: Meta<typeof SpyAnnounceRole> = {
  title: "Components/Announce Player",
  component: SpyPlayerComponent,
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
