import { Provider } from "react-redux";
import { store } from "../store/store";
import { Meta, StoryObj } from "@storybook/react";
import SpySpyComponent from "../components/SpySpyComponent";
import SpyAnnounceRole from "../components/SpyAnnounceRole";

const meta: Meta<typeof SpyAnnounceRole> = {
  title: "Components/Announce Player",
  component: SpySpyComponent,
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
