import { useState } from "react";
import { FaUserPen } from "react-icons/fa6";
import SignupIllustration from "../assets/signup.svg";
import FormInput from "../components/FormInput";
import { Link } from "react-router-dom";

const Signup = () => {
  const [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSignup = async () => {
    // TODO
    console.log(info);
  };

  return (
    <div className="w-screen h-screen flex justify-center sm:justify-between">
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="py-4 px-6 flex flex-col items-center rounded-md">
          <FaUserPen size={60} className="mb-2 text-gray-1" />
          <h1 className="mb-8 font-bold text-gray-1 text-2xl">Sign up</h1>
          <FormInput
            name="username"
            type="text"
            placeholder="Username"
            value={info.username}
            OnChange={handleChange}
          />
          <FormInput
            name="email"
            type="text"
            placeholder="E-mail"
            value={info.email}
            OnChange={handleChange}
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            value={info.password}
            OnChange={handleChange}
          />
          <FormInput
            name="passwordConfirm"
            type="password"
            placeholder="Confirm Password"
            value={info.passwordConfirm}
            OnChange={handleChange}
          />
          <button
            className="py-2 px-6 mb-6 rounded-2xl text-light bg-purple hover:bg-green"
            onClick={handleSignup}
          >
            Create an account
          </button>
          <div className="font-semibold text-sm">
            <span className="text-gray-1">Already have an account? </span>
            <Link to="/login" className="text-purple">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full bg-purple hidden sm:flex justify-center items-center">
        <img src={SignupIllustration} className="w-96" />
      </div>
    </div>
  );
};

export default Signup;
