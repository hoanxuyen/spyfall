import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
type SpyFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: React.ReactNode;
};
export default function SpyForm({ onSubmit, children }: SpyFormProps) {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
