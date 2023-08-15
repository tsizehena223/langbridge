import { useState, useEffect } from "react";
import { RiUserSharedLine } from "react-icons/ri";
import LoginIllustration from "../assets/login.svg";
import { FormInput, ErrorMessage } from "../components";
import { Link } from "react-router-dom";
import { loginRules, validateForm } from "../utils/form";
import { loginFields } from "../static/form-fields";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [requestError, setRequestError] = useState();
  const { login } = useAuth();

  useEffect(() => {
    if (Object.keys(errors).length) {
      const errors = validateForm(formData, loginRules);
      setErrors(errors);
    }
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData, loginRules);
    setErrors(errors);

    if (!Object.keys(errors).length) {
      try {
        await login(formData);
      } catch (error) {
        setRequestError(error.response.data.message);
      }
    }
  };

  return (
    <div
      className="w-screen h-screen 
      flex justify-center sm:justify-between"
    >
      <div
        className="w-1/2 h-full 
        hidden sm:flex justify-center items-center
        bg-purple"
      >
        <img src={LoginIllustration} className="w-96" />
      </div>

      <div className="w-full sm:w-1/2 max-h-full flex justify-center items-center">
        <div className="p-6">
          <div className="mb-4 w-full flex flex-col items-center">
            <RiUserSharedLine size={40} className="mb-2 text-gray-1" />
            <h1 className="font-bold text-gray-1 text-2xl">Login</h1>
          </div>

          <form
            onSubmit={handleLogin}
            noValidate
            className="flex flex-col items-center"
          >
            {loginFields.map((field, key) => (
              <FormInput
                key={key}
                icon={field.icon}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name]}
                error={errors[field.name]}
                onChange={handleChange}
              />
            ))}
            <button
              type="submit"
              className="mt-6 mb-3 py-2 px-6 rounded-md 
              text-light bg-purple hover:bg-green"
            >
              continue
            </button>
          </form>

          <ErrorMessage message={requestError} />

          <div className="mt-4 w-full font-semibold text-sm text-center">
            <span className="text-gray-1">
              Don't have have an account yet?{" "}
            </span>
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
