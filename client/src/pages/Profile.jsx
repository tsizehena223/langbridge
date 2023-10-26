import { useLocation, Link } from "react-router-dom";
import { MainLayout, PostContainer } from "../components";
import { useEffect, useState } from "react";
import postService from "../services/post";
import { useAuth } from "../contexts/AuthContext";
import Avatar from "../assets/avatar.svg";
import userService from "../services/user";
import { getCountryCode } from "../utils/country-language";
import ReactCountryFlag from "react-country-flag";
import { RiMessage2Fill } from "react-icons/ri";
import NoPostIllustration from "../assets/no_post.svg";

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
        <div className="w-full h-full flex justify-center items-center">
          {postList.length ? (
            <PostContainer postList={postList} />
          ) : (
            <div className="flex flex-col items-center space-y-6">
              <img src={NoPostIllustration} className="h-72" />
              <div className="text-xl font-semibold">
                No <span className="text-purple">posts</span> yet
              </div>
            </div>
          )}
        </div>
        <div>
          <div
            className="md:w-1/3 min-w-[300px] md:sticky top-20
          flex flex-col items-center"
          >
            <div
              className="z-10 w-40 h-40 flex justify-center overflow-clip 
              rounded-full border-8 border-silver dark:border-gray-1"
            >
              <img
                className="z-10 w-full h-full relative top-0 
                object-cover"
                src={user.image || Avatar}
                alt="pfp"
              />
            </div>
            <div
              className="relative -top-20 w-full h-fit 
              flex flex-col items-center  space-x-4 p-6
              text-center bg-light dark:bg-gray-2 rounded-md"
            >
              <div className="mt-20 space-y-2">
                <div className="font-semibold text-center text-xl">
                  {user.name}
                </div>
                {user.createdAt && (
                  <div className="font-semibold text-placeholder">
                    Joined {user.createdAt}
                  </div>
                )}
                <div className="flex items-center space-x-2 font-semibold justify-center">
                  <span>From</span>
                  <span className="text-purple">{user.country}</span>
                  {user.country && (
                    <ReactCountryFlag
                      countryCode={getCountryCode(user.country)}
                      svg={true}
                      className="text-xl shadow shadow-grayrounded full"
                    />
                  )}
                </div>
                <div className="flex space-x-2 font-semibold">
                  <span>Learning</span>
                  <span className="text-purple">{user.language}</span>
                </div>
              </div>
              {user.id != userData.id && (
                <Link
                  to="/message"
                  state={user}
                  className="mt-6 py-2 px-4 flex items-center space-x-2 
                  rounded-md font-semibold
                  hover:bg-green bg-purple text-light"
                >
                  <RiMessage2Fill />
                  <span>Message</span>
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
