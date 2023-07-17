import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";
import Newsfeed from "../pages/Newsfeed";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleSearch = (input) => {
    // TODO
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sticky top-0 h-screen w-1/5 space-y-4 py-6 px-8 bg-light rounded-l-lg z-50">
      {/* Logo */}
      <div className="flex space-x-2 items-center">
        <img src={Logo} alt="logo" className="w-10 h-10"/>
        <h1 className="font-semibold text-xl text-blue">LangBridge</h1>
      </div>
      <div className="flex">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="flex flex-col h-4/5 justify-between">
        <div className="space-y-4">
          <div>
            <Link to="/Newsfeed" className="">
              <MenuItem icon={FaHouse} label="Home" />
            </Link>
          </div>
          <div>
            <Link to="/EditProfile">
              <MenuItem icon={FaCircleUser} label="Profile" />
            </Link>
          </div>
          <div>
            <Link to="/EditProfile">
              <MenuItem icon={FaBell} label="Notification" />
            </Link>
          </div>
          <div>
            <Link to="/EditProfile">
              <MenuItem icon={FaComment} label="Chat" />
            </Link>
          </div>
          <div>
            <Link to="/EditProfile">
              <MenuItem icon={FaCartShopping} label="Shop" />
            </Link>
          </div>
        </div>
        <div>
          <MenuItem
            icon={FaArrowRightToBracket}
            label="LogOut"
            onSelect={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
