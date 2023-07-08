import axios from "axios";
// import { verify } from "jsonwebtoken";
import { useEffect, useState } from "react";
import { Feed, MainNavBar, Sidebar, Widgets } from "../components";

const Newsfeed = () => {
  // const token = localStorage.getItem("token");
  // const decoded = verify(token);
  // const username = decoded.username;
  const username = "me";
  const [postList, setPostList] = useState([]);

  // useEffect(async () => {
  //   const list = await axios.get("http://localhost:8000/api/posts");
  //   setPostList(list);
  // }, []);

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
