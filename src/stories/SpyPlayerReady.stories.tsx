import { Provider } from "react-redux";
import { store } from "../store/store";
import { Meta, StoryObj } from "@storybook/react";
import SpyReadyComponent from "../components/SpyReadyComponent";
import SpyAnnounceRole from "../components/SpyAnnounceRole";

const meta: Meta<typeof SpyAnnounceRole> = {
  title: "Components/Announce Player",
  component: SpyReadyComponent,
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
export const ReadyAnnounce: Story = {};
