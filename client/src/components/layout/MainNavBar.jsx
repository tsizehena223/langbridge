import { useMemo } from "react";
import { RiSettings4Line, RiSunLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import sidebarLinks from "../../static/sidebar-links";

const MainNavBar = () => {
  const { pathname } = useLocation();
  const Link = useMemo(() =>
    sidebarLinks.find(({ path }) => path === pathname)
  );

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem("theme");
    const newTheme = currentTheme == "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div
      className="z-40 sticky top-0 w-full py-4 px-8 
      flex items-center justify-between 
      shadow-sm bg-light dark:bg-gray-2"
    >
      <div
        className="flex items-center 
        text-md text-purple font-semibold"
      >
        <Link.icon size={20} className="mr-3" />
        <div>{Link.label}</div>
      </div>

      <div className="flex items-center text-gray-1 dark:text-light">
        <button onClick={toggleTheme} className="ml-4 rounded-full w-9 h-9">
          <RiSunLine size={20} className="hover:text-purple" />
        </button>
      </div>
    </div>
  );
};

export default MainNavBar;
