import { useState, useMemo } from "react";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import sidebarLinks from "../../static/sidebar-links";

const MainNavBar = () => {
  const [theme, setTheme] = useState("light");
  const { pathname } = useLocation();
  const Link = useMemo(
    () =>
      sidebarLinks.find(
        ({ path }) => path !== "/" && pathname.startsWith(path)
      ) || sidebarLinks[0]
  );
  const handleThemeSwitch = () => {
    const body = document.querySelector("body");
    if (theme === "light") {
      setTheme("dark");
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
      setTheme("light");
    }
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
        <button
          onClick={handleThemeSwitch}
          className="ml-4 rounded-full w-9 h-9"
        >
          {theme === "light" ? <RiSunLine /> : <RiMoonLine />}
        </button>
      </div>
    </div>
  );
};

export default MainNavBar;
