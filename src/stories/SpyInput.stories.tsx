import { Meta, StoryObj } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";
import SpyInput from "../components/form/SpyInput";

const meta: Meta<typeof SpyInput> = {
  title: "Form/Input",
  component: SpyInput,
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
      <SpyInput {...args} />
      <button type="submit">Submits</button>
    </>
  ),
};
