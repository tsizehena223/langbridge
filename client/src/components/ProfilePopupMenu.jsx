import { FaCircleUser, FaPen } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import MenuItem from "./MenuItem";

const ProfilePopupMenu = () => {
  const handleViewProfile = () => {
    // TODO
  };

  const handleEditProfile = () => {
    // TODO
  };

  const handleLogout = () => {
    // TODO
  };

  return (
    <div className="z-40 p-5 top-10 -right-5 absolute w-max flex flex-col gap-4 shadow-[0_0_4px_2px] shadow-gray-0 rounded-md">
      <MenuItem
        icon={FaCircleUser}
        label="View profile"
        onSelect={handleViewProfile}
      />
      <MenuItem
        icon={FaPen}
        label="Edit profile"
        onSelect={handleEditProfile}
      />
      <MenuItem icon={MdLogout} label="Log out" onSelect={handleLogout} />
    </div>
  );
};

export default ProfilePopupMenu;
