const FormSelect = ({ label, name, options, error, onChange }) => (
  <select
    name={name}
    onChange={onChange}
    defaultValue={label}
    className={`w-56 mt-4 py-2 pl-3 border-2 ${
      error ? "border-red" : "border-gray-0"
    } rounded-md font-semibold text-[#a2a8b4] bg-light focus:outline-none focus:border-purple focus:text-purple focus:placeholder:text-purple`}
  >
    <option disabled>{label}</option>
    {options.map((value, key) => (
      <option key={key} value={value}>
        {value}
      </option>
    ))}
  </select>
);

export default FormSelect;
