import PropTypes from "prop-types";
import React, { useState } from "react";
import LanguageSelect from "./languageSelect";
import { Textarea, Button, Icon, Divider } from "@chakra-ui/react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import TitleHeader from "./titleHeader";
import "./textbox.css";

export default function TextBox({ status = "empty", isReadOnly }) {
  const [source, setSource] = useState("Spanish");
  const [target, setTarget] = useState("English");
  const [taResponse, setTaResponse] = useState(undefined);
  const [languageList, setLanguageList] = useState([
    "Spanish",
    "English",
    "Italian",
    "French",
  ]);
  const lanCompatability = {
    English: ["Spanish", "Italian", "French"],
    Italian: ["English"],
    French: ["English"],
    Spanish: ["English"],
  };

  const languageHandler = (l, s) => {
    if (s === "selectedSource") {
      setSource(l);
      setLanguageList(lanCompatability[l]);
    } else if (s === "selectedTarget") {
      setTarget(l);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setTaResponse("loading");
    const form = e.target;
    const formData = new FormData(form);
    formData.append("Source", source);
    formData.append("Target", target);

    //TODO: proper handling of post request if proper things aren't connected
    //add highlighting for changed words https://www.npmjs.com/package/react-highlight-within-textarea
    // add to backend the sliding scale of adding prepositions

    fetch("http://localhost:8080/sourceText", {
      method: "POST",
      mode: "cors",
      body: formData,
    })
      .then((response) => {
        if (response.status === 400) {
          return "Invalid";
        }
        return response.text();
      })
      .then((data) => {
        setTaResponse(data);
      });
  };

  return (
    <div className="wrapper">
      <TitleHeader />
      <Divider />
      <div className="LanguageSelect">
        <LanguageSelect
          id="Source"
          retLanguage={languageHandler}
          type="Source"
          languageList={["Spanish", "English", "Italian", "French"]}
        />
        <Icon as={FaArrowRightArrowLeft} color="grey" />
        <LanguageSelect
          id="Target"
          retLanguage={languageHandler}
          type="Target"
          languageList={languageList}
        />
      </div>
      <form method="post" onSubmit={submitHandler}>
        <div className="row">
          <Textarea name="postContent" readOnly={false} />
          <Textarea
            isDisabled={(taResponse === undefined) | (taResponse === "loading")}
            isInvalid={taResponse === "Invalid"}
            readOnly={true}
            placeholder="Translation"
            value={
              taResponse === "Invalid"
                ? "Invalid Source or Target Language"
                : taResponse
            }
          />
        </div>
        <br />
        <Button
          type="submit"
          colorScheme="teal"
          size="sm"
          isLoading={taResponse === "loading"}
          value={isReadOnly}
        >
          Translate
        </Button>
      </form>
    </div>
  );
}

TextBox.propTypes = {
  status: PropTypes.string.isRequired,
  isReadOnly: PropTypes.bool.isRequired,
};
