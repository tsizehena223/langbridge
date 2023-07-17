import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import MenuItem from "./MenuItem";

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div className="relative">
      <input
        type="search"
        placeholder="Search..."
        size={13}
        value={inputValue}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        onChange={(e) => setInputValue(e.target.value)}
        className="py-2 px-4 pl-8 border-2 border-light rounded-xl font-semibold text-gray-1 focus:outline-none focus:border-purple focus:text-purple focus:placeholder:text-purple"
      />
      <button
        onClick={() => onSearch(inputValue)}
        className="absolute left-1 bottom-[0.80rem]">
        <FaSearch
          className={`${
            isInputFocused ? "text-purple" : "text-gray-1"
          } hover:text-purple`}
        />
      </button>
    </div>
  );
};

export default SearchBar;
