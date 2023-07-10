import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import countries from "i18n-iso-countries";
import languages from "@cospired/i18n-iso-languages";
import enLocaleCountry from "i18n-iso-countries/langs/en.json";
import enLocaleLang from "@cospired/i18n-iso-languages/langs/en.json";

countries.registerLocale(enLocaleCountry);
languages.registerLocale(enLocaleLang);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
