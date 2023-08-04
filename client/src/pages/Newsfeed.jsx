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
import postMock from "../mock/post";

const Newsfeed = () => {
  const [postList, setPostList] = useState(postMock);
  const { userData } = useAuth();

  // useEffect(() => {
  //   postService.getPosts(userData.token).then((data) => {
  //     setPostList(data);
  //   });
  // }, []);

  return (
    <div
      className="w-screen h-full 
      flex sm:justify-between 
      bg-silver"
    >
      <Sidebar />
      <div className="w-full">
        <MainNavBar />
        <div className="p-4 flex">
          <div>
            <PostInput />
            <PostContainer postList={postList} />
          </div>
          <UserSidebar />
        </div>
      </div>
    </div>
  );
};

export default Newsfeed;
