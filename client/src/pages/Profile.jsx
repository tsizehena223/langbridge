import { useLocation, useParams, Link } from "react-router-dom";
import { MainLayout, PostContainer } from "../components";
import { useEffect, useMemo, useState } from "react";
import ProfilePic from "../components/common/ProfilePic";
import postService from "../services/post";
import { useAuth } from "../contexts/AuthContext";
import Avatar from "../assets/avatar.svg";

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
    console.log(userData
      
      );
  }, []);

  return (
    <MainLayout>
      <div className="w-full">
        <PostContainer postList={postList} />
      </div>
      <div className="sticky -top- w-1/3">
        <center>
          <img className="w-40 h-40 relative top-0 z-50 border-8 dark:border-gray-1 border-silver rounded-full" src={Avatar} alt="" />
        </center>
        <div className="relative -top-20 w-full h-screen bg-light dark:bg-gray-2 rounded-md space-x-4 p-4">
          <center>
            <div className="mt-20 space-y-4">
              <p className="font-bold">{userData.name}</p>
              <p className="font-semibold">Country: {userData.country}</p>
              <p className="font-semibold">Learning: {userData.language}</p>
            </div>
          </center>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
