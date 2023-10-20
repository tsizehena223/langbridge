import { getAllCountries, getAllLanguages } from "../utils/country-language";
import { RiEarthLine, RiSpeakLine } from "react-icons/ri";

const searchFilters = [
  {
    name: "country",
    placeholder: "Country",
    options: getAllCountries(),
    icon: RiEarthLine,
  },
  {
    name: "language",
    placeholder: "Learning",
    options: getAllLanguages(),
    icon: RiSpeakLine,
  },
];

export default searchFilters;
