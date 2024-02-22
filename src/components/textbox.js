import PropTypes from "prop-types";
import React, { useState } from "react";
import LanguageSelect from "./languageSelect";
import "./textbox.css";

export default function TextBox({ status = "empty", isReadOnly }) {
  const [language, setLanguage] = useState(null);

  const languageHandler = (l) => {
    setLanguage(l);
    console.log("Language is:", language);
  };

  if (status === "success") {
    // send result to backend
  }

  return (
    <div className="wrapper">
      <LanguageSelect retLanguage={languageHandler} isReadOnly={isReadOnly} />
      <div id="Textbox">
        <form>
          <textarea readOnly={isReadOnly} />
          <br />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

TextBox.propTypes = {
  status: PropTypes.string.isRequired,
  isReadOnly: PropTypes.bool.isRequired,
};
