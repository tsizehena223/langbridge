import ProfilePic from "../common/ProfilePic";
import Avatar from "../../assets/avatar.svg";
import { Link } from "react-router-dom";

const SearchResult = ({ results }) => {
  return (
    <div>
      {results.map((user) => (
        <div
          key={user.id}
          className="flex items-center w-full mt-6 p-6 rounded-md
          bg-light dark:bg-gray-2"
        >
          <div>
            <ProfilePic key={user.id} img={Avatar} country={user.country} />
          </div>
          <div
            className="w-full flex flex-col sm:flex-row ml-4 space-y-2
            font-semibold justify-between items-center"
          >
            <Link
              to={`/profile/${user.id}`}
              state={user}
              className="hover:text-purple"
            >
              <div>{user.name}</div>
              <div className="text-placeholder">Joined {user.createdAt}</div>
            </Link>
            <div className="space-y-2 text-end">
              <div>
                <span>Country: </span>
                <span className="text-purple">{user.country}</span>
              </div>
              <div>
                <span>Learning: </span>
                <span className="text-pink">{user.language}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
