import FileUpload from "./FileUpload";
import NavSearch from "./NavSearch";
import UserIcon from "./UserIcon";

function Navbar({
  avatar,
  firstName,
  $id: ownerID,
  accountID,
}: {
  avatar: string;
  firstName: string;
  $id: string;
  accountID: string;
}) {
  return (
    <nav className="h-24 flex justify-between items-center gap-x-4">
      <NavSearch />
      <div className="flex items-center gap-x-4">
        <FileUpload ownerID={ownerID} accountID={accountID} />
        <UserIcon avatar={avatar} firstName={firstName} />
      </div>
    </nav>
  );
}
export default Navbar;
