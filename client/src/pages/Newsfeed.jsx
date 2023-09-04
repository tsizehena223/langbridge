import { useEffect, useState } from "react";
import {
  MainNavBar,
  PostInput,
  PostContainer,
  Sidebar,
  UserSidebar,
} from "../components";
import { useAuth } from "../contexts/AuthContext";
import postService from "../services/post";
import userService from "../services/user";
import { getCountrySpeaking } from "../utils/country-language";
// import postMock from "../mock/post";

const Newsfeed = () => {
  const [postList, setPostList] = useState([]);
  const [userList, setUserList] = useState([]);
  const { userData } = useAuth();

  const fetchData = async () => {
    const post = await postService.getPosts(userData.token);
    setPostList(post);
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
    <div
      className="w-screen h-full 
      flex sm:justify-between 
      bg-silver dark:bg-gray-1"
    >
      <Sidebar />
      <div className="w-full">
        <MainNavBar />
        <div className="p-4 flex">
          <div className="w-full">
            <PostInput />
            <PostContainer postList={postList} />
          </div>
          <UserSidebar userList={userList} />
        </div>
      </div>
    </div>
  );
};

export default Newsfeed;
