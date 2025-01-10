import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Logout from "./Logout";
import { TiArrowSortedDown } from "react-icons/ti";

function UserIcon({
  firstName,
  avatar,
}: {
  firstName: string;
  avatar: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2 bg-accent h-10 w-full lg:w-max rounded-3xl px-4 shadow">
          <Image
            src={avatar}
            alt="avatar"
            height={20}
            width={20}
            className="h-5 w-5 object-cover"
          />
          <div className="flex items-center gap-x-2">
            <h3 className="text-sm font-medium tracking-wide">{firstName}</h3>
            <TiArrowSortedDown strokeWidth={2.5} />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={10}>
        <DropdownMenuItem className="w-full p-0">
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default UserIcon;
