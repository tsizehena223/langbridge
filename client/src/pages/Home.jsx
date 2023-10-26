import {
  Footer,
  HomeNavBar,
  Landing,
  Section1,
  Section2,
  Section3,
} from "../components";
import IspmLogo from "../assets/logoISPM.jpg";

const Home = () => {
  return (
    <div className="bg-light dark:bg-gray-2">
      <HomeNavBar />
      <div className="px-4 flex flex-col items-center text-gray-1">
        {/* <div className="h-screen w-screen flex items-center justify-center"> */}
        {/*   <img src={IspmLogo} /> */}
        {/* </div> */}
        <Landing />
        <Section1 />
        <Section2 />
        <Section3 />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
