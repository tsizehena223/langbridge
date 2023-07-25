import {
  RiKeyLine,
  RiMailOpenLine,
  RiEarthLine,
  RiSpeakLine,
  RiUser3Line,
} from "react-icons/ri";
import { getAllCountries, getAllLanguages } from "../utils/country-language";

const signupFields = [
  {
    name: "username",
    type: "text",
    placeholder: "Username",
    icon: RiUser3Line,
  },
  {
    name: "email",
    type: "email",
    placeholder: "E-mail",
    icon: RiMailOpenLine,
  },
  {
    select: true,
    name: "country",
    placeholder: "Country",
    options: getAllCountries(),
    icon: RiEarthLine,
  },
  {
    select: true,
    name: "language",
    placeholder: "Learning",
    options: getAllLanguages(),
    icon: RiSpeakLine,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    icon: RiKeyLine,
  },
  {
    name: "passwordConfirm",
    type: "password",
    placeholder: "Confirm password",
    icon: RiKeyLine,
  },
];

const loginFields = [
  {
    name: "email",
    type: "email",
    placeholder: "E-mail",
    icon: RiMailOpenLine,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    icon: RiKeyLine,
  },
];

export { signupFields, loginFields };
