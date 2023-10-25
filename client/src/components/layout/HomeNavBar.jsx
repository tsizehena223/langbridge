import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";

const linkClass = "py-2 px-5 rounded-md border-2 font-semibold duration-200";

const HomeNavBar = () => (
  <div
    className="z-40 fixed top-0 w-screen py-4 px-4 
    flex items-center justify-between 
    shadow-md bg-light"
  >
    <div className="flex items-center space-x-2">
      <img className="w-10 h-w-10" src={Logo} alt="" />
      <h1 className="font-semibold text-purple">LangBridge</h1>
    </div>

    <div>
      <button onClick={toggleTheme} className="ml-4 rounded-full w-9 h-9">
        <RiSunLine size={20} className="hover:text-purple" />
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

export default HomeNavBar;
