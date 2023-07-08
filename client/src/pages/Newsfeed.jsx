import { Feed, MainNavBar, Sidebar, Widgets } from "../components";

const Newsfeed = () => {
  return (
    <div className="w-screen h-screen flex bg-gray-0 sm:justify-between">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}  
      <div className="w-full">
        <MainNavBar />
        
        <div className="flex">
          {/* Feed */}
          <div className="w-full m-10 bg-light rounded-xl">
            <Feed />
          </div>

          {/* Widgets  */}
          <div className="w-1/3 bg-light h-full">
            <Widgets />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Newsfeed;
