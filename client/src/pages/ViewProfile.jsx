import React from "react";
import {
  MainNavBar,
  Profile,
  Sidebar,
} from "../components";

const ViewProfile = () => {
  return (
    <div className="w-screen h-full flex bg-gray-0 dark:bg-dark sm:justify-between">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="w-full">
        <MainNavBar />

        <div className="flex flex-row">
          <div className="w-full rounded-xl m-10 bg-light h-full p-8">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
