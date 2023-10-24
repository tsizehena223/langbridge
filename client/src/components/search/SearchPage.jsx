import SearchBar from "./SearchBar";
import MainLayout from "../layout/MainLayout";
import UserSidebar from "../newsfeed/UserSidebar";
import userService from "../../services/user";
import { useAuth } from "../../contexts/AuthContext";
import { getCountrySpeaking } from "../../utils/country-language";
import { useState, useEffect } from "react";
import SearchResult from "./SearchResult";

const SearchPage = () => {
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

export default SearchPage;
