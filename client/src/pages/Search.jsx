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
import MeetIllustration from "../assets/meet.svg";
import NoMatchIllustration from "../assets/no_match.svg";
import { RiUserFill } from "react-icons/ri";

const Search = () => {
  const [userList, setUserList] = useState([]);
  const [resultList, setResultList] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
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

  const handleResult = (result) => {
    setHasSearched(true);
    setResultList(result);
  };

  return (
    <MainLayout>
      <div className="h-full flex space-x-4">
        <div className="min-h-full w-full space-y-6">
          <SearchBar userData={userData} onResult={handleResult} />
          <UserSidebar userList={userList} />
          <div
            className="p-4 space-y-6 flex flex-col items-center rounded-md 
            bg-light dark:bg-gray-2"
          >
            {hasSearched ? (
              !resultList.length ? (
                <div className="flex flex-col items-center space-y-6">
                  <img src={NoMatchIllustration} className="h-56" />
                  <div className="font-semibold text-xl">
                    <span className="text-purple">No</span> match found
                  </div>
                </div>
              ) : (
                <div className="flex space-x-2 items-center font-semibold text-md">
                  <RiUserFill />{" "}
                  <span>
                    {resultList.length} result
                    {resultList.length > 1 && "s"} found
                  </span>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center space-y-6">
                <img src={MeetIllustration} className="h-56" />
                <div className="font-semibold text-xl">
                  Search <span className="text-purple">partners</span> around
                  the <span className="text-purple">world</span>
                </div>
              </div>
            )}
          </div>
          <SearchResult results={resultList} />
        </div>
        <UserSidebar userList={userList} right={true} />
      </div>
    </MainLayout>
  );
};

export default Search;
