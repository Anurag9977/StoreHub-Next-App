"use client";

import { toast } from "@/hooks/use-toast";
import { renameFile } from "@/utils/actions";
import { renameFileSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Models } from "node-appwrite";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import { SubmitButton } from "../form/Buttons";
import { usePathname } from "next/navigation";

function FileRename({
  file,
  setIsOpen,
}: {
  file: Models.Document;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const pathname = usePathname();

  const defaultValues: z.infer<typeof renameFileSchema> = {
    name: file.name,
  };
  const form = useForm<z.infer<typeof renameFileSchema>>({
    resolver: zodResolver(renameFileSchema),
    defaultValues,
  });

  const [message, setMessage] = useState("");

  const onSubmit = async (data: any) => {
    const response = await renameFile({ file, newName: data.name, pathname });
    if (response.message) {
      setMessage(response.message);
      if (response.payload) setIsOpen(false);
    }
  };

  useEffect(() => {
    if (message) {
      toast({ description: message });
    }
  }, [message]);

  return (
    <FormContainer form={form} submitAction={onSubmit}>
      <FormInput name="name" type="text" control={form.control} />
      <SubmitButton
        text="save changes"
        className="mt-4 text-sm"
        isSubmitting={form.formState.isSubmitting}
      />
    </FormContainer>
  );
}
export default FileRename;
