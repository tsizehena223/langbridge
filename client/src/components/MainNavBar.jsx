import Popup from "reactjs-popup";
import SearchBar from "./SearchBar";
import Avatar from "../assets/avatar.svg";
import ProfilePopupMenu from "./ProfilePopupMenu";
import { FaHouse, FaComment, FaBell } from "react-icons/fa6";
import MenuItem from "./MenuItem";

const MainNavBar = ({ username }) => {
  const handleSearch = (input) => {
    // TODO
  };

  return (
    <div className="sticky top-0 z-40 w-full py-4 px-8 flex items-center justify-between shadow-lg bg-light">
      <MenuItem icon={FaHouse} label="Home" />
      <div className="flex items-center">
        <div>{username}</div>
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

export default MainNavBar;
