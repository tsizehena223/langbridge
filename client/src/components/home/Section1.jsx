import FlagIllustration from "../../assets/countries_flags.png";

function Section1() {
  return (
    <div id="section-a" className="max-w-3xl flex flex-col items-center">
      <img src={FlagIllustration} />
      <h2 className="mt-6 mb-2 font-bold text-3xl">Learn any language</h2>
      <p className="leading-7 text-center">
        Join our vibrant community of language enthusiasts, where you can easily
        search for language partners based on their country of origin or the
        language they speak. Make exchanges with people from all around the
        world.
      </p>
    </div>
  );
}

export default Section1;
