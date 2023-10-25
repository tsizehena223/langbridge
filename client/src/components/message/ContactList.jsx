import { RiContactsLine, RiMoreFill } from "react-icons/ri";
import ProfilePic from "../common/ProfilePic";
import SearchInput from "../search/SearchInput";
import { useState } from "react";

const ContactList = ({ users, onSelect }) => {
  const [filter, setFilter] = useState(null);

  return (
    <div
      className="p-4 w-full sm:w-1/3 space-y-6 
      flex flex-col rounded-md grow-0
      bg-light dark:bg-gray-2"
    >
      <div className="ml-1 flex items-center font-semibold">
        <RiContactsLine size={20} className="mr-3" />
        <div>Contacts</div>
      </div>
      <div className="space-y-4 h-full overflow-y-scroll">
        {users.map((user) => {
          if (!filter || user.name.match(filter)) {
            return (
              <button
                key={user.id}
                className="w-full p-2 flex items-center justify-between
                rounded-md
                hover:cursor-pointer hover:bg-purple hover:text-light"
                onClick={() => onSelect(user)}
              >
                <div className="flex items-center">
                  <ProfilePic
                    key={user.id}
                    img={user.image}
                    country={user.country}
                  />
                  <span className="ml-3 font-semibold">{user.name}</span>
                </div>
                <RiMoreFill />
              </button>
            );
          }
        })}
      </div>
      <SearchInput onSearch={setFilter} />
    </div>
  );
};

export default ContactList;
