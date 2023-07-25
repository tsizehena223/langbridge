import { Link } from "react-router-dom";
import { HomeNavBar } from "../components";
import NotFoundIllustration from "../assets/not_found.svg";

const NotFound = () => (
  <div
    className="w-screen h-screen 
    flex flex-col justify-center items-center"
  >
    <HomeNavBar />
    <img
      src={NotFoundIllustration}
      alt="404 Error: page not found"
      className="w-72 mb-2"
    />
    <div className="mb-10 font-bold text-gray-1 text-3xl">Page not found</div>
    <Link
      to="/"
      className="py-3 px-5 rounded-md font-semibold text-light bg-purple hover:bg-green"
    >
      Return to homepage
    </Link>
  </div>
);

export default NotFound;
