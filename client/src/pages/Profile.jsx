import { useLocation, useParams, Link } from "react-router-dom";
import { MainLayout, PostContainer } from "../components";
import { useEffect, useMemo, useState } from "react";
import ProfilePic from "../components/common/ProfilePic";
import postService from "../services/post";
import { useAuth } from "../contexts/AuthContext";
import Avatar from "../assets/avatar.svg";

const Profile = () => {
  const { userData } = useAuth();
  const { pathname } = useLocation();
  const [postList, setPostList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const id = useMemo(() => pathname.match(/\d+/));

  const fetchData = async () => {
    const post = await postService.getUserPosts(id, userData.token);
    setPostList(post);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="w-full flex flex-col-reverse md:flex-row md:space-x-4">
        <div className="w-full">
          <PostContainer postList={postList} />
        </div>
        <div className="sticky top-20 md:w-1/3">
          <div className="flex justify-center">
            <img
              className="w-40 h-40 relative top-0 z-50 border-8 
              dark:border-gray-1 border-silver rounded-full"
              src={userData.image || Avatar}
              alt="pfp"
            />
          </div>
          <div
            className="relative -top-20 w-full h-fit 
            flex flex-col items-center  space-x-4 p-6
            text-center bg-light dark:bg-gray-2 rounded-md"
          >
            <div className="mt-20 space-y-4">
              <div className="font-semibold text-center text-xl">
                {userData.name}
              </div>
              <div className="font-semibold">
                <span className="text-purple">Country: </span>
                <span>{userData.country}</span>
              </div>
              <div className="font-semibold">
                <span className="text-purple">Learning: </span>
                <span>{userData.language}</span>
              </div>
            </div>
            <button className="mt-6 py-2 px-4 rounded-md hover:bg-green bg-purple text-light">
              Message
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
