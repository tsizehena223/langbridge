import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

const FormSelect = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2 flex flex-col items-center">
      <div className="flex flex-col w-fit">
        {props.label && (
          <label
            htmlFor={props.name}
            className="w-full mb-2 
            font-semibold text-gray-1 dark:text-light"
          >
            {props.label}
          </label>
        )}
        <div
          className={`w-${props.width ? props.width : "60"} py-2 px-4
          flex items-center
          border-2 ${isFocused && "!border-purple"} ${
            props.value
              ? "border-gray-1 dark:border-light"
              : "border-placeholder"
          } ${props.error && !isFocused && "!border-red"} rounded-md
          font-semibold text-gray-1`}
        >
          <props.icon
            size={22}
            className={`${isFocused && "!text-purple"} ${
              props.value ? "text-gray-1 dark:text-light" : "text-placeholder"
            } ${props.error && !isFocused && "!text-red"}`}
          />
          <select
            name={props.name}
            defaultValue={props.value ? props.value : props.placeholder}
            onChange={props.onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`ml-4 w-full
            bg-transparent
            font-semibold ${
              props.value ? "text-gray-1 dark:text-light" : "text-placeholder"
            } bg-light 
            focus:outline-none focus:text-purple 
            ${props.error && !props.value && "text-red"}`}
          >
            <option disabled>{props.placeholder}</option>
            {props.options.map((value, key) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ErrorMessage message={props.error} />
    </div>
  );
};

export default FormSelect;
