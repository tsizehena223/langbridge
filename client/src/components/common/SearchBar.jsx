import { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div
      className={`flex items-center py-2 px-4 
        border-[1px] ${
          isInputFocused ? "border-purple" : "border-gray-0"
        } rounded-md`}
    >
      <input
        type="search"
        placeholder="Search..."
        size={10}
        value={inputValue}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        onChange={(e) => setInputValue(e.target.value)}
        className="text-gray-1 
        focus:outline-none focus:border-purple focus:text-purple 
        focus:placeholder:text-purple"
      />
      <button onClick={() => onSearch(inputValue)}>
        <RiSearch2Line
          size={20}
          className={`hover:text-purple ${
            isInputFocused ? "text-purple" : "text-gray-0"
          }`}
        />
      </button>
    </div>
  );
};

export default SearchBar;
