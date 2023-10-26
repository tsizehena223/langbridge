import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { useState } from "react";

const linkClass = "py-2 px-5 rounded-md border-2 font-semibold duration-200";

const HomeNavBar = () => {
  const [theme, setTheme] = useState("light");
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
      className="z-40 fixed top-0 w-screen py-4 px-4 
      flex items-center justify-between 
      shadow-md bg-light dark:bg-gray-2"
    >
      <div className="flex items-center space-x-2">
        <img className="w-10 h-w-10" src={Logo} alt="" />
        <h1 className="font-semibold text-purple text-xl">LangBridge</h1>
      </div>

      <div>
        <button
          onClick={handleThemeSwitch}
          className="p-3 mr-3 bg-purple rounded-full text-light hover:rotate-180 duration-500"
        >
          {theme === "light" ? <RiSunLine /> : <RiMoonLine />}
        </button>
        <Link
          to="/signup"
          children="Sign up"
          className={`${linkClass} mr-3 text-purple border-purple
          hover:bg-purple hover:text-light`}
        />
        <Link
          to="/login"
          children="Login"
          className={`${linkClass} text-light bg-purple border-purple
          hover:bg-green hover:border-green`}
        />
      </div>
    </div>
  );
};

export default HomeNavBar;
