import React from "react";
import WorldIllustration from "../../assets/world.svg";

import image1 from "../../assets/flags/fr.svg";
import image2 from "../../assets/flags/mg.svg";
import image3 from "../../assets/flags/us.svg";
import image4 from "../../assets/flags/arab.svg";
import image5 from "../../assets/flags/ci.svg";
import image6 from "../../assets/flags/ru.svg";
import image7 from "../../assets/flags/gb-eng.svg";
import image8 from "../../assets/flags/jp.svg";
import image9 from "../../assets/flags/es.svg";
import image10 from "../../assets/flags/ca.svg";
import image11 from "../../assets/flags/md.svg";
import image12 from "../../assets/flags/af.svg";
import image13 from "../../assets/flags/by.svg";

const Landing = () => {
  return (
    <div className="w-screen h-screen px-4 relative flex xl:flex-col items-center justify-center">
      <div className="max-w-6xl flex flex-col-reverse items-center sm:flex-row">
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="mb-4 font-extrabold text-5xl dark:text-light">
            Welcome to
            <span className="text-purple"> LangBridge</span>
          </h2>
          <p className="leading-7 text-center font-normal text-lg sm:text-start dark:text-light">
            Let language be the bridge that connects you to endless
            possibilities and lifelong connections. Welcome to LangBridge, where
            the world becomes your classroom.
          </p>
          <a
            href="#section-a"
            className="mt-4 py-3 px-6 rounded-md font-semibold text-light bg-purple hover:bg-green"
          >
            Get started
          </a>
        </div>
        <img
          src={WorldIllustration}
          alt="World illustration"
          className="w-96"
        />
      </div>
      <div className="mt-14 flex space-x-10 items-center justify-center">
        <img
          className="animate-[bounce_1s_infinite] w-10 h-10 rounded-full"
          src={image1}
          alt=""
        />
        <img
          className="animate-[bounce_1.1s_infinite] w-10 h-10 rounded-full"
          src={image2}
          alt=""
        />
        <img
          className="animate-[bounce_1.1s_infinite] w-10 h-10 rounded-full"
          src={image3}
          alt=""
        />
        <img
          className="animate-[bounce_1.2s_infinite] w-10 h-10 rounded-full"
          src={image4}
          alt=""
        />
        <img
          className="animate-[bounce_1.3s_infinite] w-10 h-10 rounded-full"
          src={image5}
          alt=""
        />
        <img
          className="animate-[bounce_1.4s_infinite] w-10 h-10 rounded-full"
          src={image6}
          alt=""
        />
        <img
          className="animate-[bounce_1.5s_infinite] w-10 h-10 rounded-full"
          src={image7}
          alt=""
        />
        <img
          className="animate-[bounce_1.6s_infinite] w-10 h-10 rounded-full"
          src={image8}
          alt=""
        />
        <img
          className="animate-[bounce_1.7s_infinite] w-10 h-10 rounded-full"
          src={image9}
          alt=""
        />
        <img
          className="animate-[bounce_1.8s_infinite] w-10 h-10 rounded-full"
          src={image10}
          alt=""
        />
        <img
          className="animate-[bounce_1.9s_infinite] w-10 h-10 rounded-full"
          src={image11}
          alt=""
        />
        <img
          className="animate-[bounce_2.0s_infinite] w-10 h-10 rounded-full"
          src={image12}
          alt=""
        />
        <img
          className="animate-[bounce_2.1s_infinite] w-10 h-10 rounded-full"
          src={image13}
          alt=""
        />
      </div>
    </div>
  );
};

export default Landing;
