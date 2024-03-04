import React, { useState } from "react";
import PropTypes from "prop-types";
import { Select } from "@chakra-ui/react";

export default function LanguageSelect({ retLanguage, type, languageList }) {
  const getInitialState = () => {
    // TODO: Change to undefined as initial state
    const val = type === "Target" ? "English" : "Spanish";
    return val;
  };

  const [, setValue] = useState(getInitialState);

  const handleChange = (e) => {
    setValue(e.target.value);
    retLanguage(e.target.value, e.target.id);
  };

  const mapDropdown = languageList.map((x) => {
    return (
      <option key={x} value={x}>
        {x}
      </option>
    );
  });

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
        {mapDropdown}
      </Select>
    </div>
  );
}

LanguageSelect.propTypes = {
  retLanguage: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  languageList: PropTypes.array,
};
