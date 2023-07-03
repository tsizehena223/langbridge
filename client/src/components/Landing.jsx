import WorldIllustration from "../assets/world.svg";
import SideImg from "../assets/styleside.svg";

const Landing = () => (
  <div className="w-screen h-screen relative flex items-center justify-center">
    <div className="max-w-3xl flex">
      <div className="text-gray-1">
        <h2 className="mb-2 font-bold text-3xl">Welcome to LangBridge</h2>
        <p className="leading-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          quisquam iusto hic reprehenderit a, eius perspiciatis adipisci numquam
          dolore atque vel rem enim soluta maiores.
        </p>
        <button className="mt-4 py-3 px-6 rounded-md font-semibold text-light bg-purple hover:bg-green">
          Get started
        </button>
      </div>
      <img src={WorldIllustration} alt="World illustration" className="w-80" />
      <img src={SideImg} className="w-40 absolute bottom-0 left-0" />
    </div>
  </div>
);

export default Landing;
