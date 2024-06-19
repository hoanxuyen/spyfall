import type { Meta, StoryObj } from "@storybook/react";
import SpyParagraph from "../components/typography/SpyParagraph";

const meta: Meta<typeof SpyParagraph> = {
  title: "Typography/Paragraph",
  component: SpyParagraph,
  decorators: [
    (Story) => (
      <div className="prose text-white text-">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    text: { control: { disable: true } },
    className: { control: { disable: true } },
  },
  tags: ["autodocs","typography","text"],
};

export default meta;
type Story = StoryObj<typeof SpyParagraph>;

export const Default: Story = {
  args: {
    text: "Hello from SpyParagraph!",
  },
};

export const ParagraphXS: Story = {
  args: {
    text: "This is paragraph size xs",
    className: "text-xs",
  },
};
export const ParagraphSM: Story = {
  args: {
    text: "This is paragraph size sm",
    className: "text-sm",
  },
};
export const ParagraphLG: Story = {
  args: {
    text: "This is paragraph size lg",
    className: "text-lg",
  },
};
export const ParagraphXL: Story = {
  args: {
    text: "This is paragraph size xl",
    className: "text-xl",
  },
};
export const Paragraph3XL: Story = {
  args: {
    text: "This is paragraph size 3xl",
    className: "text-3xl",
  },
};
export const Paragraph4XL: Story = {
  args: {
    text: "This is paragraph size 4xl",
    className: "text-4xl",
  },
};
export const Paragraph5XL: Story = {
  args: {
    text: "This is paragraph size 5xl",
    className: "text-5xl",
  },
};
export const Paragraph6XL: Story = {
  args: {
    text: "This is paragraph size 6xl",
    className: "text-6xl",
  },
};
export const Paragraph7XL: Story = {
  args: {
    text: "This is paragraph size 7xl",
    className: "text-7xl",
  },
};
export const Paragraph8XL: Story = {
  args: {
    text: "This is paragraph size 8xl",
    className: "text-8xl",
  },
};
export const Paragraph9XL: Story = {
  args: {
    text: "This is paragraph size 9xl",
    className: "text-9xl",
  },
};
