import { HomeNavBar, Landing, Section1, Section2 } from "../components";
const Home = () => {
  return (
    <div className="bg-light dark:bg-gray-2">
      <HomeNavBar />
      <div className="px-4 flex flex-col items-center text-gray-1">
        <Landing />
        <Section1 />
        <Section2 />
      </div>
    </div>
  );
};

export default Home;
