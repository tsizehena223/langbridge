import React from "react";
import {
  ProfileNavBar,
  RightProfile,
  Sidebar,
} from "../components";

const EditProfile = () => {
  return (
    <div className="w-screen h-full flex bg-gray-0 dark:bg-dark sm:justify-between">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="w-full">
        <ProfileNavBar />

        <div className="flex flex-row">
          {/* LeftProfile */}
          {/* <div className="w-1/5 ml-10 mt-10 bg-light rounded-xl h-full p-8">
            <LeftProfile />
          </div> */}

          {/* RightProfile  */}
          <div className="w-full rounded-xl m-10 bg-light h-full p-8">
            <RightProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
