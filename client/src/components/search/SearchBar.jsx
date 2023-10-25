import { useState } from "react";
import searchFilters from "../../static/search-filters";
import FormSelect from "../form/FormSelect";
import SearchInput from "./SearchInput";
import { RiFilterLine, RiFilterOffLine } from "react-icons/ri";
import userService from "../../services/user";
import { toast } from "react-toastify";

const SearchBar = ({ userData, onResult }) => {
  const [filters, setFilters] = useState({
    country: "",
    language: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const clearFilters = () => {
    setFilters({ country: null, language: null });
    toast.info("Filters cleared");
  };

  const handleSearch = async (input) => {
    const users = await userService.getUsers(
      {
        name: input,
        countries: filters.country,
        language: filters.language,
      },
      userData.token
    );

    onResult(users);
  };

  return (
    <div className="w-full p-6 bg-light dark:bg-gray-2 rounded-md">
      <SearchInput onSearch={handleSearch} />
      <div className="mt-6 flex justify-between items-center gap-4">
        <div className="hidden sm:flex items-center font-semibold">
          <RiFilterLine className="mr-2" size={20} />
          <span>Filters:</span>
        </div>
        {searchFilters.map((filter, key) => (
          <FormSelect
            key={key}
            icon={filter.icon}
            name={filter.name}
            placeholder={filter.placeholder}
            options={filter.options}
            value={filters[filter.name]}
            width={"full"}
            onChange={handleChange}
          />
        ))}
        <button
          className="p-2 rounded-md
          border-2 border-gray-2 dark:border-light hover:border-purple
          text-xl hover:!text-purple"
          onClick={clearFilters}
        >
          <RiFilterOffLine />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
