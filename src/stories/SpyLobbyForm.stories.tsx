import { Meta, StoryObj } from "@storybook/react";
import SpyLobbyForm from "../components/SpyLobbyForm";

const meta: Meta<typeof SpyLobbyForm> = {
  title: "Form/Lobby Form",
  component: SpyLobbyForm,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="border p-4">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof meta>;
export const LobbyForm: Story = {};
