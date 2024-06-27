import { Provider } from "react-redux";
import { store } from "../store/store";
import { Meta, StoryObj } from "@storybook/react";
import SpyAnnounceRole from "../components/SpyAnnounceRole";
import SpySpy from "../components/SpySpy";

const meta: Meta<typeof SpyAnnounceRole> = {
  title: "Components/Announce Player",
  component: SpySpy,
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
export const SpyAnnounce: Story = {};
