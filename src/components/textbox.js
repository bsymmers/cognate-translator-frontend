import PropTypes from "prop-types";
import React, { useState } from "react";
import LanguageSelect from "./languageSelect";
import "./textbox.css";

export default function TextBox({ status = "empty", isReadOnly }) {
  const [source, setSource] = useState("Spanish");
  const [target, setTarget] = useState("English");

  const languageHandler = (l, s) => {
    s === "selectedSource" ? setSource(l) : setTarget(l);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    const form = e.target;
    const formData = new FormData(form);
    formData.append("Source", source);
    formData.append("Target", target);

    console.log("Sending", Object.fromEntries(formData.entries()));

    const response = fetch("http://localhost:8080/sourceText", {
      method: form.method,
      mode: "cors",
      body: formData,
    });

    console.log(response);
  };

  return (
    <div className="wrapper">
      <div className="row">
        <LanguageSelect
          id="Source"
          retLanguage={languageHandler}
          type="Source"
        />
        <LanguageSelect
          id="Target"
          retLanguage={languageHandler}
          type="Target"
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
