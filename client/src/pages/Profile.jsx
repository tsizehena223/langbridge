import { useLocation, useParams } from "react-router-dom";
import { MainLayout, PostContainer } from "../components";
import { useEffect, useMemo, useState } from "react";
import ProfilePic from "../components/common/ProfilePic";
import postService from "../services/post";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { pathname } = useLocation();
  const [postList, setPostList] = useState([]);
  const id = useMemo(() => pathname.match(/\d+/));
  const { userData } = useAuth();

  const fetchData = async () => {
    const post = await postService.getUserPosts(id, userData.token);
    setPostList(post);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="w-full">
        <PostContainer postList={postList} />
      </div>
      <div
        className="sticky top-20 
        w-1/3 h-full ml-4 p-4
        rounded-md bg-light dark:bg-gray-2"
      ></div>
    </MainLayout>
  );
};

export default Profile;
