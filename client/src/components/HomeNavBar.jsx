import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHouse, FaGear, FaMoon } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";
import Logo from "../assets/logo.svg";

const HomeNavBar = () => (
  <div className="z-40 w-screen py-4 px-4 fixed top-0 flex items-center justify-between shadow-md bg-light">
    <div className="flex items-center space-x-2">
      <img className="w-10 h-w-10" src={Logo} alt="" />
      <h1 className="font-semibold text-purple">LangBridge</h1>
    </div>
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
