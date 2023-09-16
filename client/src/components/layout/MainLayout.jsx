import { MainNavBar, Sidebar } from "../";

const MainLayout = ({ children }) => {
  return (
    <div
      className="w-screen h-full
      flex sm:justify-between
      bg-silver dark:bg-gray-1"
    >
      <Sidebar />
      <div className="w-full">
        <MainNavBar />
        <div className="p-4 flex">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
