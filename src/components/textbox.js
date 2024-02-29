import PropTypes from "prop-types";
import React, { useState } from "react";
import LanguageSelect from "./languageSelect";
import { Textarea, Button, Icon, Heading } from "@chakra-ui/react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import "./textbox.css";

export default function TextBox({ status = "empty", isReadOnly }) {
  const [source, setSource] = useState("Spanish");
  const [target, setTarget] = useState("English");
  const [taResponse, setTaResponse] = useState(undefined);

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

    // console.log("Sending", Object.fromEntries(formData.entries()));

    fetch("http://localhost:8080/sourceText", {
      method: "POST",
      mode: "cors",
      body: formData,
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setTaResponse(data);
      });
    // const content = response.json();
    // setTaResponse(content);
    // console.log(response.json());
  };

  return (
    <div className="wrapper">
      <Heading className="Title">Spanglish Translator</Heading>
      <div className="LanguageSelect">
        <LanguageSelect
          id="Source"
          retLanguage={languageHandler}
          type="Source"
        />
        <Icon as={FaArrowRightArrowLeft} color="grey" />
        <LanguageSelect
          id="Target"
          retLanguage={languageHandler}
          type="Target"
        />
      </div>
      {/* <div className="Textbox"> */}
      <form method="post" onSubmit={submitHandler}>
        <div className="row">
          <Textarea name="postContent" readOnly={false} />
          <Textarea
            isDisabled={taResponse === undefined}
            readOnly={true}
            placeholder="Translation"
            value={taResponse}
          />
        </div>
        <br />
        <Button type="submit" colorScheme="teal" size="sm" value={isReadOnly}>
          Translate
        </Button>
      </form>
      {/* </div> */}
    </div>
  );
}

TextBox.propTypes = {
  status: PropTypes.string.isRequired,
  isReadOnly: PropTypes.bool.isRequired,
};
