import { useEffect, useState } from "react";
import { Feed, MainNavBar, Sidebar, Widgets } from "../components";
import api from "../utils/api";
import config from "../config";
import decode from "jwt-decode";

const Newsfeed = () => {
  const token = localStorage.getItem("token");
  const decoded = decode(token);
  const username = decoded.username;
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    api.get(config.baseUrl, "/api/posts", {}).then(value => {
      setPostList(value.data.posts);
    });
  }, []);

  return (
    <div className="w-screen h-full flex bg-gray-0 sm:justify-between">
      <Sidebar />

      <div className="w-full">
        <MainNavBar username={username} />

        <div className="flex">
          <Feed postList={postList} />
          <div className="w-1/3 bg-light h-full">
            <Widgets />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsfeed;
