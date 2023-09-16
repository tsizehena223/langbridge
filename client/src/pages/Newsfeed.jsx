import { useEffect, useState } from "react";
import {
  PostInput,
  PostContainer,
  MainLayout,
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
    <MainLayout userList={userList}>
      <div className="w-full">
        <PostInput />
        <PostContainer postList={postList} />
      </div>
      <UserSidebar userList={userList} />
    </MainLayout>
  );
};

export default Newsfeed;
