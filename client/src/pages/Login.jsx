import { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { TbHelpCircleFilled } from "react-icons/tb";
import LoginIllustration from "../assets/login.svg";
import FormInput from "../components/FormInput";
import { Link } from "react-router-dom";

const Login = () => {
  const [info, setInfo] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleLogin = async () => {
    // TODO
    console.log(info);
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
          <FormInput
            name="email"
            type="text"
            placeholder="E-mail"
            value={info.email}
            OnChange={handleChange}
          />
          <div className="relative">
            <FormInput
              name="password"
              type="password"
              placeholder="Password"
              value={info.password}
              OnChange={handleChange}
            />
            <TbHelpCircleFilled
              className="absolute right-3 top-3 text-purple bg-light hover:cursor-pointer hover:text-green"
              size={20}
            />
          </div>
          <button
            className="py-2 px-6 mb-6 rounded-2xl text-light bg-purple hover:bg-green"
            onClick={handleLogin}
          >
            Next
          </button>
          <div className="font-semibold text-sm">
            <span className="text-gray-1">Don't have an account? </span>
            <Link to="/signup" className="text-purple">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
