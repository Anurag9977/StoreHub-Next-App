"use client";

import { toast } from "@/hooks/use-toast";
import { deleteFile } from "@/utils/actions";
import { deleteFileSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Models } from "node-appwrite";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

function FileDelete({
  file,
  setIsOpen,
}: {
  file: Models.Document;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const pathname = usePathname();

  const form = useForm<z.infer<typeof deleteFileSchema>>({
    resolver: zodResolver(deleteFileSchema),
  });

  const [message, setMessage] = useState("");

  const onSubmit = async () => {
    const response = await deleteFile({ file, pathname });
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
      <h1>Are you sure you want to delete this file?</h1>
      <div className="mt-4 flex justify-end gap-x-2">
        <SubmitButton
          text="delete"
          className="text-sm w-max"
          isSubmitting={form.formState.isSubmitting}
        />
        <Button
          variant="secondary"
          type="button"
          className="text-sm tracking-wide font-medium rounded-3xl bg-black/10"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </FormContainer>
  );
}
export default FileDelete;
