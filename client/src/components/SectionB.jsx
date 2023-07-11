import MeetIllustration from "../assets/meet.svg";

const SectionB = () => {
  return (
    <div className="max-w-3xl mt-32 flex flex-col-reverse items-center sm:flex-row">
      <img
        data-aos="fade-right"
        src={MeetIllustration}
        className="w-80 sm:mr-10"
      />
      <div className="flex flex-col items-center sm:items-start">
        <h2 className="mb-2 font-bold text-3xl">Meet people</h2>
        <p className="mb-4 leading-7 text-center sm:text-start">
          Meet people from all around the world and make new friends, find
          partners and teachers. Find native speakers and learn together by
          joining our community.
        </p>
      </div>
    </div>
  );
};

export default SectionB;
