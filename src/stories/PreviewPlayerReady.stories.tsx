import { Provider } from "react-redux";
import { store } from "../store/store";
import { Meta, StoryObj } from "@storybook/react";
import PreviewPlayer from "../components/PreviewPlayer";
import ReadyComponent from "../components/PreviewPlayerReady";

const meta: Meta<typeof PreviewPlayer> = {
  title: "Components/PreviewPlayer",
  component: ReadyComponent,
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
