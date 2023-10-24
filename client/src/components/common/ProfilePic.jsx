import ReactCountryFlag from "react-country-flag";
import { getCountryCode } from "../../utils/country-language";
import Avatar from "../../assets/avatar.svg";

const ProfilePic = ({ img, country }) => {
  console.log(img)
  return (
    <div className="relative">
      <img src={img ? img : Avatar} className="w-10 h-10" />
      <ReactCountryFlag
        countryCode={getCountryCode(country)}
        svg={true}
        className="absolute -bottom-1 right-0"
      />
    </div>
  );
};

export default ProfilePic;
