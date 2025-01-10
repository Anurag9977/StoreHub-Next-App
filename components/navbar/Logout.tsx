"use client";

import { LuLogOut } from "react-icons/lu";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { logoutAction } from "@/utils/actions";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import FormContainer from "../form/FormContainer";
import { logoutSchema } from "@/utils/schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function Logout() {
  const defaultValues: z.infer<typeof logoutSchema> = {};
  const form = useForm<z.infer<typeof logoutSchema>>({
    resolver: zodResolver(logoutSchema),
    defaultValues,
  });

  const [message, setMessage] = useState("");

  const onSubmit = async () => {
    try {
      const response = await logoutAction();
      setMessage(response.message);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not logout! Please try again later."
      );
    }
  };

  useEffect(() => {
    if (message) {
      toast({ description: message });
    }
  }, [message]);

  return (
    <FormContainer form={form} submitAction={onSubmit}>
      <Button
        variant="ghost"
        type="submit"
        disabled={form.formState.isSubmitting}
        className="font-medium tracking-wider w-full hover:bg-destructive/20 text-destructive hover:text-destructive"
      >
        {form.formState.isSubmitting ? (
          <>
            <Loader2 size={26} strokeWidth={3} className="animate-spin mr-3" />
            Please wait
          </>
        ) : (
          <>
            <LuLogOut strokeWidth={2.5} />
            Logout
          </>
        )}
      </Button>
    </FormContainer>
  );
}
export default Logout;
