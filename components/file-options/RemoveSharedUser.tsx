"use client";

import { toast } from "@/hooks/use-toast";
import { removeSharedUser, shareFiles } from "@/utils/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { Models } from "node-appwrite";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormContainer from "../form/FormContainer";
import { Button } from "../ui/button";
import { LuX } from "react-icons/lu";
import { Loader2 } from "lucide-react";
import { removeSharedUserSchema } from "@/utils/schemas";

function RemoveSharedUser({
  file,
  email,
}: {
  file: Models.Document;
  email: string;
}) {
  if (file.users.length < 1) return null;

  const pathname = usePathname();

  const form = useForm<z.infer<typeof removeSharedUserSchema>>({
    resolver: zodResolver(removeSharedUserSchema),
  });

  const [message, setMessage] = useState("");

  const onSubmit = async (data: any) => {
    const response = await removeSharedUser({ file, email, pathname });
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
    <FormContainer form={form} submitAction={onSubmit}>
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? (
          <Loader2 className="animate-spin" />
        ) : (
          <LuX />
        )}
      </Button>
    </FormContainer>
  );
}
export default RemoveSharedUser;
