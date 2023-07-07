const FormInput = ({ name, type, placeholder, value, error, OnChange }) => (
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    className={`mt-4 py-2 px-4 border-2 ${
      error ? "border-red" : "border-gray-0"
    } rounded-md font-semibold text-gray-1 focus:outline-none focus:border-purple focus:text-purple focus:placeholder:text-purple`}
    value={value}
    onChange={OnChange}
  />
);

export default FormInput;
