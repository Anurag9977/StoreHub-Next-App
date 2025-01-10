import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

type OTPFormInputProps = {
  name: string;
  control: Control<any>;
};
function OTPFormInput({ name, control }: OTPFormInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <InputOTP maxLength={6} {...field}>
              <InputOTPGroup className="w-3/5 mx-auto">
                <InputOTPSlot index={0} className="w-full" />
                <InputOTPSlot index={1} className="w-full" />
                <InputOTPSlot index={2} className="w-full" />
                <InputOTPSlot index={3} className="w-full" />
                <InputOTPSlot index={4} className="w-full" />
                <InputOTPSlot index={5} className="w-full" />
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
export default OTPFormInput;
