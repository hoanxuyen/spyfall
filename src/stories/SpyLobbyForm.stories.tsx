import { Meta, StoryObj } from "@storybook/react";
import SpyLobbyForm from "../components/SpyLobbyForm";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";

const meta: Meta<typeof SpyLobbyForm> = {
  title: "Form/Lobby Form",
  component: SpyLobbyForm,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Provider store={store}>
            <Story />
        </Provider>
      </BrowserRouter>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof meta>;
export const LobbyForm: Story = {};
