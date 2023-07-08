import SearchBar from "./SearchBar"; 
import { FaHouse, FaArrowRightToBracket, FaCartShopping,FaCircleUser, FaComment, FaBell } from "react-icons/fa6";
import Logo from "../assets/logo.svg"
import MenuItem from "./MenuItem";

const Sidebar = () => {
  const handleSearch = (input) => {
    // TODO
  };
  return (
    <div className="h-full w-1/4 space-y-4 p-8 bg-light rounded-l-lg z-50 relative">
      {/* logo */}
      <h1 className="font-semibold text-gray-1">LangBridge</h1>
      <div className="flex">
        <SearchBar onSearch={handleSearch}/>
      </div>
      <div className="justify-between ">
        <div className="space-y-4">
          <MenuItem icon={FaHouse} label="Home"/>
          <MenuItem icon={FaCircleUser} label="Profile"/>
          <MenuItem icon={FaBell} label="Notification"/>
          <MenuItem icon={FaComment} label="Chat"/>
          <MenuItem icon={FaCartShopping} label="Home"/>
        </div>
        <MenuItem icon={FaArrowRightToBracket} label="LogOut"/>
      </div>
    </div>
  );
};

export default Sidebar;