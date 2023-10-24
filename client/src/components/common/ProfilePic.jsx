import ReactCountryFlag from "react-country-flag";
import { getCountryCode } from "../../utils/country-language";
import Avatar from "../../assets/avatar.svg";

const ProfilePic = ({ img, country }) => (
  <div className="relative">
    <div className="w-11 h-11 rounded-full overflow-clip">
      <img src={img || Avatar} className="w-full h-full object-cover" />
    </div>
    <ReactCountryFlag
      countryCode={getCountryCode(country)}
      svg={true}
      className="absolute -bottom-1 right-0"
    />
  </div>
);

export default ProfilePic;
