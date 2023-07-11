import Aos from "aos";
import { useEffect } from "react";
import {
  HomeNavBar,
  Landing,
  SectionA,
  SectionB,
  SectionC,
  Footer,
} from "../components";
import ISPM from "../assets/logoISPM.jpg";

const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 2000, offset: 225 });
  }, []);

  return (
    <div>
      <img
        src={ISPM}
        alt="logoMaminay"
        className="z-50 fixed bottom-10 right-14 w-24 f-3w-24 rounded-full animate-[bounce_1.5s_infinite]"
      />
      <HomeNavBar />
      <div className="px-4 flex flex-col items-center text-gray-1">
        <Landing />
        <SectionA />
        <SectionB />
        <SectionC />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
