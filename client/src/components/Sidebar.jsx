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
    <div className="sticky top-0 h-screen w-1/6 space-y-4 pl-8 pt-6 bg-light rounded-l-lg z-50">
      <div className="flex">
        <img className="w-14 h-14 relative" src={Logo} alt="LangBridge"  />
        <h1 className="text-blue mt-4 font-bold text-xl">LangBridge</h1>
      </div>
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
