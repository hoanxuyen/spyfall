import { Meta, StoryObj } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";
import SpyTextInput from "../components/form/SpyTextInput";

const meta: Meta<typeof SpyTextInput> = {
  title: "Form/NumberInput",
  component: SpyTextInput,
  argTypes: {
    name: { control: { disable: true } },
    label: { control: "text" },
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

export const Default: Story = {
  args: {
    name: "example",
    label: "Example",
  },
};
export const WithValidation: Story = {
  args: {
    name: "validated",
    label: "Validated",
    rules: { required: "Required" },
  },
  render: ({ ...args }) => (
    <>
      <FormTextInput {...args} />
      <button type="submit">Submits</button>
    </>
  ),
};
