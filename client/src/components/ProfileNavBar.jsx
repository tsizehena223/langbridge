import Popup from "reactjs-popup";
import SearchBar from "./SearchBar";
import Avatar from "../assets/avatar.svg";
import ProfilePopupMenu from "./ProfilePopupMenu";
import { FaCircleUser, FaGear, FaMoon } from "react-icons/fa6"
import { MdSunny } from "react-icons/md"
import MenuItem from "./MenuItem";

const ProfileNavBar = () => {
  const handleSearch = (input) => {
    // TODO
  };

  return (
    <div className="z-40 w-full py-4 px-8 top-0 flex items-center justify-between shadow-lg bg-light">
        <MenuItem icon={FaCircleUser} label="MyProfile" />
      <div className="flex items-center">
        <button className="ml-4 rounded-full w-9 h-9 "><MdSunny className="w-5 h-5 rounded-full object-cover text-gray-1 hover:text-purple justify-center items-center"/></button>
        <button className="ml-4 rounded-full w-9 h-9 "><FaGear className="w-5 h-5 rounded-full items-center text-gray-1 hover:text-purple"/></button>
        <Popup
          trigger={
            <button className="ml-4 rounded-full">
              <img src={Avatar} className="w-9 h-9 rounded-full object-cover" />
            </button>
          }
        >
          <ProfilePopupMenu />
        </Popup>
      </div>
    </div>
  );
};

export default ProfileNavBar;
