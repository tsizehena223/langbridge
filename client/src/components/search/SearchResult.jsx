import ProfilePic from "../common/ProfilePic";
import Avatar from "../../assets/avatar.svg";
import { Link } from "react-router-dom";

const SearchResult = ({ results }) => {
  return (
    <div>
      {results.map((user) => (
        <div
          key={user.id}
          className="flex w-full mt-6 p-6 rounded-md
          bg-light dark:bg-gray-2"
        >
          <ProfilePic key={user.id} img={Avatar} country={user.country} />
          <div className="w-full flex pt-2 ml-4 font-semibold justify-between">
            <Link to={`/profile?id=${user.id}`} className="hover:text-purple">
              {user.name}
            </Link>
            <div>
              <span>Country: </span>
              <span className="text-purple">{user.country}</span>
              <span>, Learning: </span>
              <span className="text-pink">{user.language}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
