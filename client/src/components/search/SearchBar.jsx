import { useState } from "react";
import searchFilters from "../../static/search-filters";
import FormSelect from "../form/FormSelect";
import SearchInput from "./SearchInput";
import { RiFilterOffLine } from "react-icons/ri";

import userService from "../../services/user";
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
      <div className="mt-2 flex space-x-6 items-center">
        {searchFilters.map((filter, key) => (
          <FormSelect
            key={key}
            icon={filter.icon}
            name={filter.name}
            label={filter.placeholder}
            options={filter.options}
            value={filters[filter.name]}
            width={"full"}
            onChange={handleChange}
          />
        ))}
        <RiFilterOffLine
          onClick={clearFilters}
          className="pt-2 min-w-[10px]
          text-3xl text-gray-1 dark:text-light hover:!text-purple"
        />
      </div>
    </div>
  );
};

export default SearchBar;
