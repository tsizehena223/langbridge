import { HomeNavBar, Landing, Section1 } from "../components";
const Home = () => {
  return (
    <div>
      <HomeNavBar />
      <div className="px-4 flex flex-col items-center text-gray-1">
        <Landing />
        <Section1 />
      </div>
    </div>
  );
};

export default Home;
