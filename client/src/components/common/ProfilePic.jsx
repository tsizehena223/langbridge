import ReactCountryFlag from "react-country-flag";
import { getCountryCode } from "../../utils/country-language";

const ProfilePic = ({ img, country }) => {
  return (
    <div className="relative">
      <img src={img} className="w-10 h-10" />
      <ReactCountryFlag
        countryCode={getCountryCode(country)}
        svg={true}
        className="absolute -bottom-1 right-0"
      />
    </div>
  );
};

export default ProfilePic;
