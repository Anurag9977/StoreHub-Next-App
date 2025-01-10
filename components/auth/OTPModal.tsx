"use client";

import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { OTPSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { verifyOTPAction } from "@/utils/actions";
import FormContainer from "../form/FormContainer";
import OTPFormInput from "./OTPFormInput";
import { SubmitButton } from "../form/Buttons";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

function OTPModal({ accountID }: { accountID: string }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      pin: "",
    },
  });

  const [message, setMessage] = useState("");

  async function onSubmit(data: any) {
    try {
      const verifyOTPActionWithAccountID = verifyOTPAction.bind(
        null,
        accountID
      );
      const response = await verifyOTPActionWithAccountID(data);
      setMessage(response.message);
      const sessionID = response?.payload?.sessionID;
      if (sessionID) {
        router.push("/");
      }
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : "An error occurred");
    }
  }

  useEffect(() => {
    if (message) {
      toast({ description: message });
    }
  }, [message]);

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="rounded-lg w-4/5 sm:w-3/5">
        <AlertDialogHeader>
          <AlertDialogTitle>One-Time Password</AlertDialogTitle>
          <AlertDialogDescription>
            Please enter the 6-digit OTP sent to your email.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* OTP Form */}
        <FormContainer form={form} submitAction={onSubmit}>
          <OTPFormInput control={form.control} name="pin" />
          <AlertDialogFooter className="mt-8 gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <SubmitButton
                text="submit"
                isSubmitting={form.formState.isSubmitting}
                className="sm:w-max"
              />
            </AlertDialogAction>
          </AlertDialogFooter>
        </FormContainer>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default OTPModal;
