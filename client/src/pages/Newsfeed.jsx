import { useEffect, useState } from "react";
import countries from "i18n-iso-countries";
import enLocaleCountry from "i18n-iso-countries/langs/en.json";
import { Feed, MainNavBar, Sidebar, Widgets } from "../components";
import api from "../utils/api";
import config from "../config";
import decode from "jwt-decode";
import { UserContextProvider } from "../contexts/userContext";

countries.registerLocale(enLocaleCountry);

const Newsfeed = () => {
  const token = localStorage.getItem("token");
  const decoded = decode(token);
  const contextValue = {
    token,
    tokenDecoded: decoded,
  };
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    api.get(config.baseUrl, "/api/posts", {}).then((value) => {
      setPostList(value.data.posts);
    });
  }, []);

  return (
    <UserContextProvider value={contextValue}>
      <div className="w-screen h-full flex bg-gray-0 sm:justify-between">
        <Sidebar />

        <div className="w-full">
          <MainNavBar />

          <div className="flex">
            <Feed postList={postList} />
            <div className="w-1/3 bg-light h-full">
              <Widgets />
            </div>
          </div>
        </div>
      </div>
    </UserContextProvider>
  );
};

export default Newsfeed;
