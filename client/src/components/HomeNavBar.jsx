import { Link } from "react-router-dom";

const HomeNavBar = () => (
  <div className="z-40 w-screen py-6 px-4 fixed top-0 flex items-center justify-between shadow-md bg-light">
    <h1 className="font-semibold text-gray-1">LangBridge</h1>
    <div>
      <Link
        to="/signup"
        className="mr-3 py-2 px-5 rounded-md font-semibold border-2 border-purple text-purple hover:bg-purple hover:text-light duration-200"
      >
        Sign up
      </Link>
      <Link
        to="/login"
        className="py-2 px-5 rounded-md font-semibold border-2 border-purple text-light bg-purple hover:bg-green hover:border-green duration-200"
      >
        Login
      </Link>
    </div>
  </div>
);

export default HomeNavBar;
