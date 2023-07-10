import { useEffect } from "react";
import BookIllustration from "../assets/book.svg";
import AOS from "aos";
import "aos/dist/aos.css";

function SectionC() {
  useEffect(() => {
    AOS.init({duration:2000});
    AOS.refresh();
  }, []);
  return (
    <div className="max-w-3xl mt-32 flex flex-col items-center sm:flex-row">
      <div className="flex flex-col items-center sm:items-start">
        <h2 className="mb-2 font-bold text-3xl">Learn new cultures</h2>
        <p className="mb-4 leading-7 text-center sm:text-start">
          Embark on a fascinating journey of discovery as you dive into the world
          of learning new cultures. Our language learning platform provides you
          with a gateway to explore the rich tapestry of diverse cultures from
          around the globe
        </p>
      </div>
      <img data-aos="fade-left" src={BookIllustration} className="w-60 sm:ml-10" />
    </div>
  );
}

export default SectionC;
