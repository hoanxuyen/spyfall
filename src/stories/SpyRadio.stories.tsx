import { Meta, StoryObj } from "@storybook/react";
import SpyRadio from "../components/form/SpyRadio";
import { FormProvider, useForm } from "react-hook-form";

const meta: Meta<typeof SpyRadio> = {
  title: "Form/ Radio Button",
  component: SpyRadio,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => {
      const methods = useForm();
      const onSubmit = () => console.log("submitted");
      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Story />
          </form>
        </FormProvider>
      );
    },
  ],
};
export default meta;
type Story = StoryObj<typeof meta>;
export const RadioButton: Story = {
  args: {
    name: "radioStory",
  },
  render: (args) => (
    <>
      <SpyRadio {...args} label="Option 1" submitValue="option1" />
      <SpyRadio {...args} label="Option 2" submitValue="option2" />
      <SpyRadio {...args} label="Option 3" submitValue="option3" />
    </>
  ),
};
