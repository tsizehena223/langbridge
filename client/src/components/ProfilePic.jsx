import ReactCountryFlag from "react-country-flag";
import countries from "i18n-iso-countries";

const ProfilePic = ({ img, country }) => (
  <div className="relative">
    <img src={img} className="w-10 h-10" />
    <ReactCountryFlag
      countryCode={countries.getAlpha2Code(country, "en")}
      svg={true}
      className="absolute -bottom-1 right-0"
    />
  </div>
);

export default ProfilePic;
