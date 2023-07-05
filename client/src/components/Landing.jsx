import WorldIllustration from "../assets/world.svg";

const Landing = () => (
  <div className="w-screen h-screen px-4 relative flex items-center justify-center">
    <div className="max-w-3xl flex flex-col-reverse items-center sm:flex-row">
      <div className="text-gray-1 flex flex-col items-center sm:items-start">
        <h2 className="mb-2 font-bold text-3xl">Welcome to LangBridge</h2>
        <p className="leading-7 text-center sm:text-start">
          Let language be the bridge that connects you to endless possibilities
          and lifelong connections. Welcome to LangBridge, where the world
          becomes your classroom.
        </p>
        <button className="mt-4 py-3 px-6 rounded-md font-semibold text-light bg-purple hover:bg-green">
          Get started
        </button>
      </div>
      <img src={WorldIllustration} alt="World illustration" className="w-80" />
    </div>
  </div>
);

export default Landing;
