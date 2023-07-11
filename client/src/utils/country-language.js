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

const getLanguageCode = (language) => {
  const searched = getLanguages().find(({ name }) => name[0] === language);
  return searched.iso639_1;
};

const getCountrySpeaking = (language) => {
  const countries = [];
  const code = getLanguageCode(language);

  getLanguage(code, (_, lang) => {
    const countriesSpeakingLang = lang.countries.map(({ name }) => name.replace("'", "''"));
    countries.push(...countriesSpeakingLang);
  });

  return countries;
};

export {
  getAllCountries,
  getAllLanguages,
  getCountryCode,
  getLanguageCode,
  getCountrySpeaking,
};
