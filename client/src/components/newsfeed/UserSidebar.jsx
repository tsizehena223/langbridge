import { RiUserSearchFill } from "react-icons/ri";
import Avatar from "../../assets/avatar.svg";
import ProfilePic from "../common/ProfilePic";
import { Link } from "react-router-dom";

const UserSidebar = ({ userList }) => {
  return (
    <div
      className="sticky
      w-1/3 h-full ml-4 p-4
      rounded-md bg-light dark:bg-gray-2"
    >
      <div className="ml-1 mb-4 flex items-center font-semibold">
        <RiUserSearchFill size={20} className="mr-3" />
        <div>Meet people</div>
      </div>
      <div>
        {userList.map((user) => {
          return (
            <div key={user.id} className="mb-4 flex items-center">
              <ProfilePic key={user.id} img={Avatar} country={user.country} />
              <Link
                to={`/profile?id=${user.id}`}
                className="ml-3 font-semibold hover:text-purple"
              >
                {user.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserSidebar;
