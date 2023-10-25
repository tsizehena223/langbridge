import { RiUserSearchFill } from "react-icons/ri";
import ProfilePic from "../common/ProfilePic";
import { Link } from "react-router-dom";

const UserSidebar = ({ userList, right }) => {
  return (
    <div
      className={`${right ? "sticky top-20 w-1/3 hidden md:block" : "md:hidden"}
        h-fit p-4
        rounded-md bg-light dark:bg-gray-2`}
    >
      <div className="ml-1 mb-4 flex items-center font-semibold">
        <RiUserSearchFill size={20} className="mr-3" />
        <div>Meet people</div>
      </div>
      <div
        className={`md:space-y-6 ${
          !right && "gap-4 grid grid-cols-2 sm:grid-cols-3"
        }`}
      >
        {userList.map((user) => (
          <div key={user.id} className="flex items-center">
            <ProfilePic key={user.id} img={user.image} country={user.country} />
            <Link
              to={`/profile/${user.id}`}
              state={user}
              className="ml-3 font-semibold hover:text-purple"
            >
              {user.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSidebar;
