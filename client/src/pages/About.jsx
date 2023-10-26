import { MainLayout } from "../components";
import Logo from "../assets/logo.svg";
import IspmLogo from "../assets/logoISPM.jpg";

const About = () => {
  return (
    <MainLayout>
      <div
        className="w-full p-8 flex flex-col items-center space-y-4
        rounded-md bg-light dark:bg-gray-2"
      >
        <div className="flex space-x-8">
          <img src={Logo} />
          <img src={IspmLogo} />
        </div>
        <div className="text-purple text-3xl font-semibold">Langbridge</div>
        <div className="text-center">
          Langbridge is a social media where learners and native speakers come
          together to exchange not just words, but stories, traditions, and
          experiences. Whether you're a beginner or a seasoned polyglot,
          LangBridge offers a space where everyone is welcomed, supported, and
          encouraged to grow.
        </div>
        <div>
          Made with ❤️ by{" "}
          <span className="text-purple font-semibold">Team Langbridge</span> at
          <span className="text-purple font-semibold"> ISPM</span>.
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
