import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type SubmitButtonProps = {
  text: string;
  size?: "sm" | "default" | "lg";
  isSubmitting: boolean;
  className?: string;
};

export function SubmitButton({
  text,
  size = "default",
  isSubmitting,
  className,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      size={size}
      className={cn(
        "w-full capitalize tracking-wide text-base font-medium rounded-3xl",
        className
      )}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="animate-spin h-5 w-5 mr-3" />
          Please wait
        </>
      ) : (
        text
      )}
    </Button>
  );
}
