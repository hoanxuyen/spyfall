import { Meta, StoryObj } from "@storybook/react";
import SpyToggle from "../components/form/SpyToggle";

const meta: Meta<typeof SpyToggle> = {
  title: "Components/Toggle",
  component: SpyToggle,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    containerHeight: { control: "number", defaultValue: 24 },
    containerWidth: { control: "number", defaultValue: 48 },
    knobSize: { control: "number", defaultValue: 12 },
    disabled: { control: "boolean", defaultValue: false },
    toggled: { control: "boolean", defaultValue: false },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;
export const Toggle: Story = {
  args: {
    containerHeight: 24,
    containerWidth: 48,
    knobSize: 12,
    toggled: true,
    disabled: false,
    onChange: () => {},
  },
};
