import React, { useState } from "react";
import PropTypes from "prop-types";

import "./languageSelect.css";
export default function LanguageSelect({ retLanguage, type }) {
  const getInitialState = () => {
    const val = type === "Target" ? "English" : "Spanish";
    return val;
  };

  const [value, setValue] = useState(getInitialState);

  const handleChange = (e) => {
    setValue(e.target.value);
    retLanguage(e.target.value, e.target.id);
  };

  return (
    <div className="LanguageSelect">
      <label>
        Pick the {type} language:
        <select
          name="selectedLanguage"
          defaultValue={value}
          onChange={handleChange}
          id={type === "Target" ? "selectedTarget" : "selectedSource"}
        >
          <option value="Spanish">Spanish</option>
          <option value="English">English</option>
        </select>
      </label>
    </div>
  );
}

LanguageSelect.propTypes = {
  retLanguage: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
