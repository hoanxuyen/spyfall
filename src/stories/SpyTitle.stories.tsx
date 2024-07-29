import type { Meta, StoryObj } from "@storybook/react";
import SpyTitle from "../components/SpyTitle";
import { BrowserRouter } from "react-router-dom";

const meta: Meta<typeof SpyTitle> = {
  title: "Components/SpyTitle",
  component: SpyTitle,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text" },
    animation: {
      control: { type: "select" },
      options: [
        "animate-bounce",
        "animate-spin",
        "animate-ping",
        "animate-pulse",
        "animate-none",
      ],
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="prose">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SpyTitle>;

export const Title: Story = {
  args: {
    label: "Điệp viên hai mang",
    animation: "animate-bounce",
  },
};
