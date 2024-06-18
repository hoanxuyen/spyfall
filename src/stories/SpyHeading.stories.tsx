import type { Meta, StoryObj } from "@storybook/react";
import SpyHeadings from "../components/typography/SpyHeading";
import { SpyHeadingType } from "../components/typography/SpyHeadingType";

const meta: Meta<typeof SpyHeadings> = {
  title: "Typography/Heading",
  component: SpyHeadings,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="prose">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SpyHeadings>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Heading1: Story = {
  args: {
    text: "This is heading 1",
    type: SpyHeadingType.h1,
    className: "",
  },
};
export const Heading2: Story = {
  args: {
    text: "This is heading 2",
    type: SpyHeadingType.h2,
    className: "",
  },
};
export const Heading3: Story = {
  args: {
    text: "This is heading 3",
    type: SpyHeadingType.h3,
    className: "",
  },
};
export const Heading4: Story = {
  args: {
    text: "This is heading 4",
    type: SpyHeadingType.h4,
    className: "",
  },
};
export const Heading5: Story = {
  args: {
    text: "This is heading 5",
    type: SpyHeadingType.h5,
    className: "",
  },
};
export const Heading6: Story = {
  args: {
    text: "This is heading 6",
    type: SpyHeadingType.h6,
    className: "",
  },
};
