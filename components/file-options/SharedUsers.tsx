import { Models } from "node-appwrite";
import { Separator } from "../ui/separator";
import { Accordion, AccordionTrigger } from "../ui/accordion";
import { AccordionContent, AccordionItem } from "@radix-ui/react-accordion";
import RemoveSharedUser from "./RemoveSharedUser";

function SharedUsers({ file }: { file: Models.Document }) {
  if (file.users.length < 1) return null;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-base tracking-wide">
          Shared with : {file.users.length} users
        </AccordionTrigger>
        <AccordionContent>
          {file.users.map((user: string, index: any) => {
            return (
              <div key={index}>
                <div className=" flex justify-between items-center">
                  <p className="text-sm tracking-wide truncate font-medium">
                    {user}
                  </p>
                  <div className="justify-self-end">
                    <RemoveSharedUser file={file} email={user} />
                  </div>
                </div>
                <Separator className="my-2" />
              </div>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
export default SharedUsers;
