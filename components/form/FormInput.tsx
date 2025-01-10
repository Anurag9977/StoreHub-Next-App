import { HTMLInputTypeAttribute } from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type FormInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  control: Control<any>;
};

function FormInput({
  name,
  label,
  placeholder,
  type,
  control,
}: FormInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="tracking-wide capitalize text-base">
              {label || name}
            </FormLabel>
            <FormControl>
              <Input {...field} type={type} placeholder={placeholder ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
export default FormInput;
