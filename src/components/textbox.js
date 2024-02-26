import PropTypes from "prop-types";
import React, { useState } from "react";
import LanguageSelect from "./languageSelect";
import "./textbox.css";

export default function TextBox({ status = "empty", isReadOnly }) {
  const [language, setLanguage] = useState("Spanish");

  const languageHandler = (l) => {
    setLanguage(l);
    console.log("Language is:", language);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    const form = e.target;
    const formData = new FormData(form);
    formData.append("Source", language);
    formData.append("Target", "English");

    console.log("Sending", Object.fromEntries(formData.entries()));

    const response = fetch("http://localhost:8080/sourceText", {
      method: form.method,
      mode: "cors",
      body: formData,
    });

    console.log(response);
  };
  // TODO: Add in target language support

  return (
    <div className="wrapper">
      <div className="row">
        <LanguageSelect
          id="Source"
          retLanguage={languageHandler}
          isReadOnly={false}
        />
        <LanguageSelect
          id="Target"
          retLanguage={languageHandler}
          isReadOnly={true}
        />
      </div>
      <div id="Textbox">
        <form method="post" onSubmit={submitHandler}>
          <div className="row">
            <textarea name="postContent" readOnly={false} />
            <textarea readOnly={true} />
          </div>
          <br />
          <button type="submit" value={isReadOnly}>
            Translate
          </button>
        </form>
      </div>
    </div>
  );
}

TextBox.propTypes = {
  status: PropTypes.string.isRequired,
  isReadOnly: PropTypes.bool.isRequired,
};
