import {
  getCountries,
  getLanguage,
  getLanguages,
} from "@ladjs/country-language";

const getAllCountries = () => {
  return getCountries().map(({ name }) => name);
};

const getAllLanguages = () => {
  return getLanguages().map(({ name }) => name);
};

const getCountryCode = (country) => {
  const searched = getCountries().find(({ name }) => name === country);
  return searched.code_2;
};

const getCountrySpeaking = (language) => {
  const countries = [];

  getLanguage(language, (_, lang) => {
    const countriesSpeakingLang = lang.countries.map(({ name }) => name);
    countries.push(...countriesSpeakingLang);
  });

  return countries;
};

export { getAllCountries, getAllLanguages, getCountryCode, getCountrySpeaking };
