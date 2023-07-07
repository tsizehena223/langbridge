import Popup from "reactjs-popup";
import SearchBar from "./SearchBar";
import Avatar from "../assets/avatar.svg";
import ProfilePopupMenu from "./ProfilePopupMenu";

const MainNavBar = () => {
  const handleSearch = (input) => {
    // TODO
  };

  return (
    <div className="z-40 w-screen py-4 px-8 fixed top-0 flex items-center justify-between shadow-md bg-light">
      <h1 className="font-semibold text-gray-1">LangBridge</h1>
      <div className="flex items-center">
        <SearchBar onSearch={handleSearch} />
        <Popup
          trigger={
            <button className="ml-4 rounded-full">
              <img src={Avatar} className="w-9 h-9 rounded-full object-cover" />
            </button>
          }
        >
          <ProfilePopupMenu />
        </Popup>
      </div>
    </div>
  );
};

export default MainNavBar;
