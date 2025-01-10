"use client";

import { toast } from "@/hooks/use-toast";
import { shareFiles } from "@/utils/actions";
import { shareFileSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { Models } from "node-appwrite";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import { SubmitButton } from "../form/Buttons";
import SharedUsers from "./SharedUsers";

function FileShare({ file }: { file: Models.Document }) {
  const pathname = usePathname();

  const defaultValues: z.infer<typeof shareFileSchema> = {
    emails: "",
  };
  const form = useForm<z.infer<typeof shareFileSchema>>({
    resolver: zodResolver(shareFileSchema),
    defaultValues,
  });

  const [message, setMessage] = useState("");

  const onSubmit = async (data: any) => {
    const emailsList = data.emails;
    const response = await shareFiles({
      file,
      emails: emailsList,
      pathname,
    });
    if (response.message) {
      setMessage(response.message);
    }
  };

  useEffect(() => {
    if (message) {
      toast({ description: message });
    }
  }, [message]);

  return (
    <section className="flex flex-col gap-y-2">
      <SharedUsers file={file} />
      <FormContainer form={form} submitAction={onSubmit}>
        <FormInput
          name="emails"
          label="add emails"
          type="text"
          control={form.control}
        />
        <SubmitButton
          text="save changes"
          className="mt-4 text-sm"
          isSubmitting={form.formState.isSubmitting}
        />
      </FormContainer>
    </section>
  );
}
export default FileShare;
