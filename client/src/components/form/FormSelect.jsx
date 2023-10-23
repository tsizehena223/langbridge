import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

const FormSelect = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex items-center">
      <div
        className={`w-${props.width ? props.width : "60"} py-2 px-4
        flex items-center
        border-2 ${isFocused && "!border-purple"} ${
          props.value ? "border-gray-1 dark:border-light" : "border-placeholder"
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
          defaultValue={props.label}
          onChange={props.onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`ml-2 w-full
          dark:bg-gray-2
          font-semibold ${
            props.value ? "text-gray-1 dark:text-light" : "text-placeholder"
          } bg-light 
          focus:outline-none focus:text-purple 
          ${props.error && !props.value && "text-red"}`}
        >
          <option disabled>{props.label}</option>
          {props.options.map((value, key) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <ErrorMessage message={props.error} />
    </div>
  );
};

export default FormSelect;
