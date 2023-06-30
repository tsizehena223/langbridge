import { FaCircleUser } from "react-icons/fa6";
import { TbHelpCircleFilled } from "react-icons/tb";
import LoginIllustration from "../assets/login.svg";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [info, setInfo] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    let res = await axios.post(
      "https://d039-41-77-17-12.ngrok-free.app/api/login",
      info
    );
    console.log(res.status);
  };

  return (
    <div className="w-screen h-screen flex justify-center sm:justify-between">
      <div className="w-1/2 h-full bg-purple hidden sm:flex justify-center items-center">
        <img src={LoginIllustration} className="w-96" />
      </div>
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="py-4 px-6 flex flex-col items-center rounded-md">
          <FaCircleUser size={60} className="mb-2 text-gray-1" />
          <h1 className="mb-8 font-bold text-gray-1 text-2xl">Login</h1>
          <input
            type="text"
            placeholder="E-mail"
            className="py-2 px-4 mb-4 border-2 border-gray-0 font-semibold rounded-md focus:outline-none focus:border-purple focus:text-purple"
            value={info.email}
            onChange={(event) =>
              setInfo((prev) => ({
                ...prev,
                email: event.target.value,
              }))
            }
          />
          <div className="mb-6 relative">
            <input
              type="password"
              placeholder="Password"
              className="py-2 px-4 border-2 border-gray-0 rounded-md focus:outline-none focus:border-purple focus:text-purple"
              value={info.password}
              onChange={(event) =>
                setInfo((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
            />
            <TbHelpCircleFilled
              className="absolute right-3 top-3 text-purple hover:cursor-pointer bg-light"
              size={20}
            />
          </div>
          <button
            className="py-2 px-6 mb-6 rounded-2xl text-light bg-purple"
            onClick={handleLogin}
          >
            Next
          </button>
          <div className="font-semibold text-sm">
            <span className="text-gray-1">Don't have an account? </span>
            <a href="#" className="text-purple">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
