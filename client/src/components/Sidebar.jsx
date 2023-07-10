import SearchBar from "./SearchBar";
import {
  FaHouse,
  FaArrowRightToBracket,
  FaCartShopping,
  FaCircleUser,
  FaComment,
  FaBell,
} from "react-icons/fa6";
import Logo from "../assets/logo.svg";
import MenuItem from "./MenuItem";
import { Link,useNavigate } from "react-router-dom"

const Sidebar = () => {
  const handleSearch = (input) => {
    // TODO
  };

  return (
    <div className="h-screen w-1/6&& space-y-4 p-8 bg-light rounded-l-lg z-50">
      {/* logo */}
      <h1 className="font-semibold text-gray-1">LangBridge</h1>
      <div className="flex">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="flex flex-col h-4/5 justify-between">
        <div className="space-y-4">
          <div>
            <Link to="/NewsFeed">
              <MenuItem icon={FaHouse} label="Home" />
            </Link>
          </div>
          <div>
            <Link to="/EditProfile">
              <MenuItem icon={FaCircleUser} label="Profile" />
            </Link>
          </div>
          <MenuItem icon={FaBell} label="Notification" />
          <MenuItem icon={FaComment} label="Chat" />
          <MenuItem icon={FaCartShopping} label="Home" />
        </div>
        <MenuItem icon={FaArrowRightToBracket} label="LogOut" />
      </div>
    </div>
  );
};

export default Sidebar;
