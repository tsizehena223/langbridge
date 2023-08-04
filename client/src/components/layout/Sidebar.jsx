import { Link } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import Logo from "../../assets/logo.svg";
import SearchBar from "../common/SearchBar";
import sidebarLinks from "../../static/sidebar-links";
import MenuItem from "../common/MenuItem";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  const handleSearch = () => {
    // TODO
  };

  return (
    <div
      className="z-50 sticky top-0 
      flex flex-col
      h-screen w-fit space-y-5 py-6 px-8 
      bg-light"
    >
      <div className="flex space-x-2 items-center">
        <img src={Logo} alt="logo" className="w-10 h-10" />
        <h1 className="font-semibold text-xl text-purple">LangBridge</h1>
      </div>

      <div>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="h-full flex flex-col justify-between">
        <div>
          {sidebarLinks.map((item, key) => (
            <Link
              key={key}
              to={item.path}
              className="mb-4 flex items-center 
              font-semibold text-gray-1 hover:text-purple"
            >
              <item.icon size={20} />
              <span className="ml-3 text-md">{item.label}</span>
            </Link>
          ))}
        </div>
        <MenuItem icon={RiLogoutBoxLine} label="Log out" onSelect={logout} />
      </div>
    </div>
  );
};

export default Sidebar;
