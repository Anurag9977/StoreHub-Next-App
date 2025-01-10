"use client";

import { UseFormReturn } from "react-hook-form";
import { Form } from "../ui/form";

type FormContainerProps = {
  form: UseFormReturn<any>;
  submitAction: (data: any) => Promise<void>;
  children: React.ReactNode;
};

function FormContainer({ form, submitAction, children }: FormContainerProps) {
  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(submitAction)}>
        {children}
      </form>
    </Form>
  );
}
export default FormContainer;
