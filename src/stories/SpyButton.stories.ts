import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import SpyButton from "../components/SpyButton";
import { Color } from "../theme";
import { SpyButtonSize } from "../components/SpyButtonType";

const meta = {
  title: "Components/SpyButton",
  component: SpyButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },

  argTypes: {
    color: { control: "radio", options: Object.values(Color) },
    size: { control: "radio", options: Object.values(SpyButtonSize) },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof SpyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    color: Color.Primary,
    size: SpyButtonSize.MD,
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    color: Color.Secondary,
    size: SpyButtonSize.MD,
    label: "Button",
  },
};
