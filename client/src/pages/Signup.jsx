import { useState } from "react";
import { FaUserPen } from "react-icons/fa6";
import { Link } from "react-router-dom";
import countries from "i18n-iso-countries";
import languages from "@cospired/i18n-iso-languages";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import enLocaleCountry from "i18n-iso-countries/langs/en.json";
import enLocaleLang from "@cospired/i18n-iso-languages/langs/en.json";
import SignupIllustration from "../assets/signup.svg";
import { FormInput, FormSelect, ErrorMessage } from "../components";
import { signupRules, validateForm } from "../utils/form";

countries.registerLocale(enLocaleCountry);
languages.registerLocale(enLocaleLang);

const Signup = () => {
  const [data, setData] = useState({
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
  const countryList = Object.values(
    countries.getNames("en", { select: "official" })
  );
  const languageList = Object.values(languages.getNames("en"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSignup = () => {
    const errors = validateForm(data, signupRules);
    setErrors(errors);

    if (Object.keys(errors).length) return;

    try {
      axios.post("http://localhost:8001/api/register", data);
      navigate("/login");
    } catch (error) {
      setRequestError(error.response.data.message);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center sm:justify-between">
      <div className="w-1/2 h-full max-h-screen overflow-scroll flex justify-center items-center">
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
          <FormSelect
            label="Country"
            name="country"
            value={data.country}
            options={countryList}
            error={errors.country}
            onChange={handleChange}
          />
          <ErrorMessage message={errors.country} />
          <FormSelect
            label="Learning"
            name="language"
            value={data.language}
            options={languageList}
            error={errors.language}
            onChange={handleChange}
          />
          <ErrorMessage message={errors.language} />
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
          <ErrorMessage message={requestError} />
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
