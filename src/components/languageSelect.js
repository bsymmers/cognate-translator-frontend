import React, { useState } from "react";
import PropTypes from "prop-types";

import "./languageSelect.css";
export default function LanguageSelect({ retLanguage, isReadOnly }) {
  const getInitialState = () => {
    const val = "spanish";
    return val;
  };

  const [value, setValue] = useState(getInitialState);

  const handleChange = (e) => {
    setValue(e.target.value);
    retLanguage(value);
  };

  return (
    <div className="LanguageSelect">
      <label htmlFor="selectedLanguage">
        Pick the {isReadOnly ? "target" : "source"} language:
      </label>
      <select value={value} onChange={handleChange} id="selectedLanguage">
        <option value="spanish">Spanish</option>
        <option value="english">English</option>
      </select>
    </div>
  );
}

LanguageSelect.propTypes = {
  retLanguage: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool.isRequired,
};
