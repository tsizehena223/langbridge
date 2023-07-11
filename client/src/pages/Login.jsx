import { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import LoginIllustration from "../assets/login.svg";
import { FormInput, ErrorMessage } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { loginRules, validateForm } from "../utils/form";
import api from "../utils/api";
import config from "../config";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [requestError, setRequestError] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleLogin = async () => {
    const errors = validateForm(data, loginRules);
    setErrors(errors);

    if (Object.keys(errors).length) return;

    try {
      const res = await api.post(config.baseUrl, "/api/login", data);
      const token = res.data.token;
      localStorage.setItem("token", token);
      navigate("/newsfeed");
    } catch (error) {
      setRequestError(error.response.data.message);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center sm:justify-between">
      <div className="w-1/2 h-full bg-purple hidden sm:flex justify-center items-center">
        <img src={LoginIllustration} className="w-96" />
      </div>
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="py-4 px-6 flex flex-col items-center rounded-md">
          <FaCircleUser size={60} className="mb-2 text-gray-1" />
          <h1 className="mb-2 font-bold text-gray-1 text-2xl">Login</h1>
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
          <ErrorMessage message={requestError} />
          <button
            className="py-2 px-6 m-6 rounded-2xl text-light bg-purple hover:bg-green"
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
