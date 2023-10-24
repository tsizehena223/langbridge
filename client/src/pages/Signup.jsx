import { useEffect, useState } from "react";
import { RiUserAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SignupIllustration from "../assets/signup.svg";
import { FormInput, FormSelect, ErrorMessage } from "../components";
import { signupRules, validateForm } from "../utils/form";
import { signupFields } from "../static/form-fields";
import userService from "../services/user";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    country: "",
    language: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({});
  const [requestError, setRequestError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(errors).length) {
      const errors = validateForm(formData, signupRules);
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

  const handleSignup = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData, signupRules);
    setErrors(errors);

    if (!Object.keys(errors).length) {
      try {
        await userService.createUser(formData);
        navigate("/login");
      } catch (error) {
        setRequestError(error.response.data.message);
      }
    }
  };

  return (
    <div
      className="w-screen h-screen 
      flex items-center sm:justify-between
      dark:bg-gray-2"
    >
      <div
        className="space-y-4 p-6 w-full sm:w-1/2 max-h-full
        flex flex-col items-center overflow-scroll"
      >
        <div className="w-full flex flex-col items-center">
          <RiUserAddLine size={40} className="mb-2" />
          <h1 className="font-bold text-2xl">Sign up</h1>
        </div>

        <form
          onSubmit={handleSignup}
          noValidate
          className="flex flex-col items-center space-y-5"
        >
          {signupFields.map((field, key) => {
            const value = formData[field.name];
            const error = errors[field.name];
            return field.select ? (
              <FormSelect
                key={key}
                icon={field.icon}
                name={field.name}
                placeholder={field.placeholder}
                options={field.options}
                value={value}
                error={error}
                onChange={handleChange}
              />
            ) : (
              <FormInput
                key={key}
                icon={field.icon}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={value}
                error={error}
                onChange={handleChange}
              />
            );
          })}
          <button
            type="submit"
            className="mb-3 py-2 px-6 rounded-md
            text-light bg-purple hover:bg-green"
          >
            Create an account
          </button>
        </form>

        <ErrorMessage message={requestError} />

        <div className="w-full font-semibold text-sm text-center">
          <span>Already have an account? </span>
          <Link to="/login" className="text-purple">
            Sign in
          </Link>
        </div>
      </div>

      <div
        className="w-1/2 h-full 
        hidden sm:flex justify-center items-center
        bg-purple"
      >
        <img src={SignupIllustration} className="w-96" />
      </div>
    </div>
  );
};

export default Signup;
