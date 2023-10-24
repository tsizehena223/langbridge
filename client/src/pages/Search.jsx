import { useState, useEffect } from "react";
import userService from "../services/user";
import { useAuth } from "../contexts/AuthContext";
import {
  MainLayout,
  SearchBar,
  SearchResult,
  UserSidebar,
} from "../components";
import { getCountrySpeaking } from "../utils/country-language";

const Search = () => {
  const [userList, setUserList] = useState([]);
  const [resultList, setResultList] = useState([]);
  const { userData } = useAuth();

  const fetchData = async () => {
    const countrySpeaking = getCountrySpeaking(userData.language);
    const users = await userService.getUsers(
      { countries: countrySpeaking.join(","), number: 6 },
      userData.token
    );
    setUserList(users);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="w-full">
        <SearchBar userData={userData} onResult={setResultList} />
        <SearchResult results={resultList} />
      </div>
      <UserSidebar userList={userList} />
    </MainLayout>
  );
};

export default Search;
