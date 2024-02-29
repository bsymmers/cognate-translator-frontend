import React, { useState } from "react";
import PropTypes from "prop-types";
import { Select } from "@chakra-ui/react";

import "./languageSelect.css";
export default function LanguageSelect({ retLanguage, type }) {
  const getInitialState = () => {
    const val = type === "Target" ? "English" : "Spanish";
    return val;
  };

  const [, setValue] = useState(getInitialState);

  const handleChange = (e) => {
    setValue(e.target.value);
    retLanguage(e.target.value, e.target.id);
  };

  return (
    <div className="LanguageSelect">
      <Select
        placeholder={type}
        name="selectedLanguage"
        variant="filled"
        // defaultValue={value}
        onChange={handleChange}
        id={type === "Target" ? "selectedTarget" : "selectedSource"}
      >
        <option value="Spanish">Spanish</option>
        <option value="English">English</option>
      </Select>
    </div>
  );
}

LanguageSelect.propTypes = {
  retLanguage: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
