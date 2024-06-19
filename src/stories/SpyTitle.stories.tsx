import type { Meta, StoryObj } from "@storybook/react";
import SpyTitle from "../components/SpyTitle";

const meta: Meta<typeof SpyTitle> = {
  title: "Components/SpyTitle",
  component: SpyTitle,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="prose prose-headings:text-white">
        <Story />
      </div>
    ),
  ],
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
};

export default meta;

type Story = StoryObj<typeof SpyTitle>;

export const Title: Story = {
  args: {
    label: "Điệp viên hai mang",
    animation: "animate-bounce",
  },
};
