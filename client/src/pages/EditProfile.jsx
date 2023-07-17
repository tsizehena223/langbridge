import React from "react";
import {
  LeftProfile,
  ProfileNavBar,
  RightProfile,
  Sidebar,
} from "../components";

const EditProfile = () => {
  return (
    <div className="w-screen h-full flex bg-gray-0 sm:justify-between">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="w-full">
        <ProfileNavBar />

        <div className="flex">
          {/* LeftProfile */}
          <div className="w-1/5 ml-10 mt-10 bg-light rounded-xl h-full p-8">
            <LeftProfile />
          </div>

          {/* RightProfile  */}
          <div className="w-full rounded-xl mt-10 mr-10 bg-light h-full p-8">
            <RightProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
