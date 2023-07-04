import { useState } from "react";
import { FaUserPen } from "react-icons/fa6";
import SignupIllustration from "../assets/signup.svg";
import { FormInput, ErrorMessage } from "../components";
import { Link } from "react-router-dom";
import { signupRules, validateForm } from "../utils/form";

const Signup = () => {
  const base = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const [data, setData] = useState(base);
  const [errors, setErrors] = useState(base);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSignup = async () => {
    const errors = validateForm(data, signupRules);
    setErrors(errors);

    if (!Object.keys(errors).length) {
      // TODO
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center sm:justify-between">
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="py-4 px-6 flex flex-col items-center rounded-md">
          <FaUserPen size={60} className="mb-2 text-gray-1" />
          <h1 className="font-bold text-gray-1 text-2xl">Sign up</h1>
          <FormInput
            name="username"
            type="text"
            placeholder="Username"
            value={data.username}
            error={errors.username}
            OnChange={handleChange}
          />
          <ErrorMessage message={errors.username} />
          <FormInput
            name="email"
            type="text"
            placeholder="E-mail"
            value={data.email}
            error={errors.email}
            OnChange={handleChange}
          />
          <ErrorMessage message={errors.email} />
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            value={data.password}
            error={errors.password}
            OnChange={handleChange}
          />
          <ErrorMessage message={errors.password} />
          <FormInput
            name="passwordConfirm"
            type="password"
            placeholder="Confirm Password"
            value={data.passwordConfirm}
            error={errors.passwordConfirm}
            OnChange={handleChange}
          />
          <ErrorMessage message={errors.passwordConfirm} />
          <button
            className="m-6 py-2 px-6 rounded-2xl text-light bg-purple hover:bg-green"
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
