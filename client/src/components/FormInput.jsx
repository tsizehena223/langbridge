const FormInput = ({ name, type, placeholder, value, OnChange }) => (
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    className="mb-6 py-2 px-4 border-2 border-gray-0 rounded-md font-semibold text-gray-1 focus:outline-none focus:border-purple focus:text-purple focus:placeholder:text-purple"
    value={value}
    onChange={OnChange}
  />
);

export default FormInput;
