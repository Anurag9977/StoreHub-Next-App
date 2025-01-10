"use client";

import OTPModal from "@/components/auth/OTPModal";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { toast } from "@/hooks/use-toast";
import { loginAction, signUpAction } from "@/utils/actions";
import { getAuthSchema } from "@/utils/schemas";
import { AuthSchemaType } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function AuthForm({ authType }: { authType: AuthSchemaType }) {
  const authSchema = getAuthSchema(authType);
  const defaultValues: z.infer<typeof authSchema> = {
    email: "",
    firstName: "",
    lastName: "",
  };
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues,
  });

  const [message, setMessage] = useState("");
  const [accountID, setAccountID] = useState("");

  const onSubmit = async (data: any) => {
    try {
      const response =
        authType === "login"
          ? await loginAction(data)
          : await signUpAction(data);
      setMessage(response.message);
      if (response.payload?.accountID) {
        setAccountID(response.payload.accountID);
      }
    } catch (error: unknown) {
      setMessage(error instanceof Error ? error.message : "An error occurred");
    }
  };

  useEffect(() => {
    if (message) {
      toast({ description: message });
    }
  }, [message]);

  return (
    <section className="w-10/12 md:w-4/5 lg:w-3/5">
      <h1 className="font-bold text-3xl">
        {authType === "login" ? "Login" : "Sign Up"}
      </h1>
      <FormContainer form={form} submitAction={onSubmit}>
        <div className="mt-6 rounded-lg pt-6 pb-7 px-8 border border-slate-100 shadow-md shadow-slate-100">
          {authType === "sign-up" && (
            <>
              <FormInput
                name="firstName"
                label="first name"
                type="text"
                placeholder="Enter your first name..."
                control={form.control}
              />
              <div className="my-6">
                <FormInput
                  name="lastName"
                  label="last name"
                  type="text"
                  placeholder="Enter your last name..."
                  control={form.control}
                />
              </div>
            </>
          )}
          <FormInput
            name="email"
            type="email"
            placeholder="Enter your email..."
            control={form.control}
          />
        </div>
        <SubmitButton
          text={authType === "login" ? "login" : "sign up"}
          size="lg"
          isSubmitting={form.formState.isSubmitting}
          className="mt-6"
        />
      </FormContainer>
      <p className="mt-4 text-center text-sm">
        {authType === "login"
          ? "Don't have an account? "
          : "Already have an account? "}
        <Link
          href={authType === "login" ? "/signup" : "/login"}
          className="text-primary tracking-wide font-semibold hover:underline duration-300"
        >
          {authType === "login" ? "Sign Up" : "Login"}
        </Link>
      </p>
      {accountID && <OTPModal accountID={accountID} />}
    </section>
  );
}
export default AuthForm;
