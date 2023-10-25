import { useLocation, Link } from "react-router-dom";
import { MainLayout, PostContainer } from "../components";
import { useEffect, useState } from "react";
import postService from "../services/post";
import { useAuth } from "../contexts/AuthContext";
import Avatar from "../assets/avatar.svg";
import userService from "../services/user";

const Profile = () => {
  const { userData } = useAuth();
  const { state, pathname } = useLocation();
  const [user, setUser] = useState(state || {});
  const [postList, setPostList] = useState([]);

  const fetchData = async () => {
    const post = await postService.getUserPosts(user.id, userData.token);
    setPostList(post);
  };

  const fetchUser = async () => {
    const id = pathname.match(/\d+/)[0];
    const data = await userService.getUserById(id, userData.token);
    setUser(data);
  };

  useEffect(() => {
    if (!Object.keys(user).length) {
      fetchUser();
    } else {
      fetchData();
    }
  }, [user]);

  return (
    <MainLayout>
      <div className="w-full flex flex-col-reverse md:flex-row md:space-x-4">
        <div className="w-full">
          <PostContainer postList={postList} />
        </div>
        <div>
          <div className="md:w-1/3 min-w-[300px] md:sticky top-20">
            <div className="flex justify-center">
              <img
                className="w-40 h-40 relative top-0 z-10 border-8 
                dark:border-gray-1 border-silver rounded-full"
                src={user.image || Avatar}
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
                  {user.name}
                </div>
                <div className="font-semibold">
                  <span className="text-purple">Country: </span>
                  <span>{user.country}</span>
                </div>
                <div className="font-semibold">
                  <span className="text-purple">Learning: </span>
                  <span>{user.language}</span>
                </div>
              </div>
              {user.id != userData.id && (
                <Link
                  to="/message"
                  state={user}
                  className="mt-6 py-2 px-4 rounded-md 
                  hover:bg-green bg-purple text-light"
                >
                  Message
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
