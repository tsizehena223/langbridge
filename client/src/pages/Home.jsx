import {
  HomeNavBar,
  Landing,
  SectionA,
  SectionB,
  SectionC,
  Footer,
} from "../components";

const Home = () => (
  <div>
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
