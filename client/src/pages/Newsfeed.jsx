import { useMemo } from "react";
import decode from "jwt-decode";
import { Feed, MainNavBar, Sidebar, Widgets } from "../components";
import { UserContextProvider } from "../contexts/userContext";

const Newsfeed = () => {
  const token = useMemo(() => localStorage.getItem("token"));
  const {
    id: userId,
    username,
    language,
    country,
  } = useMemo(() => decode(token));

  return (
    <UserContextProvider value={{ token, userId, username, language, country }}>
      <div className="w-screen h-full flex bg-silver sm:justify-between">
        <Sidebar />
        <div className="w-full">
          <MainNavBar />
          <div className="flex">
            <Feed />
            <Widgets />
          </div>
        </div>
      </div>
    </UserContextProvider>
  );
};

export default Newsfeed;
