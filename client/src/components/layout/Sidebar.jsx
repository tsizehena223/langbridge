import { Link } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import sidebarLinks from "../../static/sidebar-links";
import MenuItem from "../common/MenuItem";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const Sidebar = () => {
  const { userData, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.info("Logged out");
  };

  return (
    <div
      className="z-50 sticky top-0 
      hidden md:flex flex-col
      h-screen w-fit min-w-[200px] space-y-8 py-6 px-8
      bg-light dark:bg-gray-2"
    >
      <div className="flex space-x-2 items-center">
        <h1 className="font-semibold text-xl text-purple">LangBridge</h1>
      </div>

      <div className="h-full flex flex-col justify-between">
        <div>
          {sidebarLinks.map((item, key) => (
            <Link
              key={key}
              to={
                item.path == "/profile" ? `/profile/${userData.id}` : item.path
              }
              state={userData}
              className="mb-4 flex items-center 
              font-semibold hover:text-purple"
            >
              <item.icon size={20} />
              <span className="ml-3 text-md">{item.label}</span>
            </Link>
          ))}
        </div>
        <MenuItem
          icon={RiLogoutBoxLine}
          label="Log out"
          onSelect={handleLogout}
        />
      </div>
    </div>
  );
};

export default Sidebar;
