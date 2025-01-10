import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { OptionsDialog } from "@/utils/types";

function FileOptionsDialog({
  isOpen,
  setIsOpen,
  optionsDialog,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  optionsDialog: OptionsDialog;
}) {
  const { heading, description, component } = optionsDialog;
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="rounded-lg w-11/12 sm:w-4/5 gap-y-2">
        <DialogHeader>
          <DialogTitle className="capitalize tracking-wide">
            {heading}
          </DialogTitle>
          <DialogDescription className="font-medium">
            {description || ""}
          </DialogDescription>
        </DialogHeader>
        <section>{component}</section>
      </DialogContent>
    </Dialog>
  );
}
export default FileOptionsDialog;
