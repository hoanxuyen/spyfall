import type { Meta, StoryObj } from "@storybook/react";
import { SpyHeadingType } from "../components/typography/SpyHeadingType";
import SpyHeading from "../components/typography/SpyHeading";

const meta: Meta<typeof SpyHeading> = {
  title: "Typography/Heading",
  component: SpyHeading,
  argTypes: {
    text: { control: { disable: true } },
    type: { control: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className="prose prose-headings:text-white">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SpyHeading>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Heading1: Story = {
  args: {
    text: "This is heading 1",
    type: SpyHeadingType.h1,
  },
};
export const Heading2: Story = {
  args: {
    text: "This is heading 2",
    type: SpyHeadingType.h2,
  },
};
export const Heading3: Story = {
  args: {
    text: "This is heading 3",
    type: SpyHeadingType.h3,
  },
};
export const Heading4: Story = {
  args: {
    text: "This is heading 4",
    type: SpyHeadingType.h4,
  },
};
export const Heading5: Story = {
  args: {
    text: "This is heading 5",
    type: SpyHeadingType.h5,
  },
};
export const Heading6: Story = {
  args: {
    text: "This is heading 6",
    type: SpyHeadingType.h6,
  },
};
