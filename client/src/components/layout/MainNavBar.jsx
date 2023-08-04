import { useMemo } from "react";
import { RiSettings4Line, RiSunLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import sidebarLinks from "../../static/sidebar-links";

const MainNavBar = () => {
  const { pathname } = useLocation();
  const link = useMemo(() =>
    sidebarLinks.find(({ path }) => path === pathname)
  );

  const toggleTheme = () => {
    // TODO
  };

  return (
    <div
      className="z-40 sticky top-0 w-full py-4 px-8 
      flex items-center justify-between 
      shadow-sm bg-light"
    >
      <div
        className="flex items-center 
        text-md text-purple font-semibold"
      >
        <link.icon size={20} className="mr-3" />
        <div>{link.label}</div>
      </div>

      <div className="flex items-center">
        <button onClick={toggleTheme} className="ml-4 rounded-full w-9 h-9">
          <RiSunLine size={20} className="text-gray-1 hover:text-purple" />
        </button>
        <button className="ml-4 rounded-full w-9 h-9 ">
          <RiSettings4Line
            size={20}
            className="text-gray-1 hover:text-purple"
          />
        </button>
      </div>
    </div>
  );
};

export default MainNavBar;
