import { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import ErrorMessage from "./ErrorMessage";

const FormInput = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`mt-4 w-60 py-2 px-4 
        flex items-center
        border-2 ${isFocused && "!border-purple"} ${
          props.value ? "border-gray-1 dark:border-light" : "border-placeholder"
        } ${props.error && !isFocused && "!border-red"} rounded-md
        font-semibold`}
      >
        <props.icon
          size={22}
          className={`${isFocused && "!text-purple"} ${
            props.value ? "text-gray-1 dark:text-light" : "text-placeholder"
          } ${props.error && "text-red"}`}
        />
        <input
          name={props.name}
          type={isPasswordVisible ? "text" : props.type}
          placeholder={props.placeholder}
          className={`ml-4 w-full                   
          dark:bg-gray-2
          focus:outline-none focus:text-purple
          placeholder-placeholder placeholder:focus:text-purple ${
            props.error && "placeholder:text-red"
          }`}
          value={props.value}
          onChange={props.onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {props.type === "password" && (
          <button
            type="button"
            onClick={togglePassword}
            className={`hover:text-purple ${
              props.value ? "text-gray-1 dark:text-light" : "text-placeholder"
            }`}
          >
            {isPasswordVisible ? <RiEyeOffLine /> : <RiEyeLine />}
          </button>
        )}
      </div>
      <ErrorMessage message={props.error} />
      {props.label && (
        <label>{props.label}</label>
      )}
    </div>
  );
};

export default FormInput;
