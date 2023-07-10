import {
  HomeNavBar,
  Landing,
  SectionA,
  SectionB,
  SectionC,
  Footer,
} from "../components";
import ISPM from "../assets/logoISPM.jpg"

const Home = () => (
  <div>
    <img src={ISPM} alt="logoMaminay" className="absolute bottom-10 right-10 w-24 f-3w-24 rounded-full animate-spin" />
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

export default Home;
