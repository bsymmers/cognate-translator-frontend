import React from "react";
import TextBox from "./textbox";
import "./translationArea.css";
export default function TranslationArea() {
  return (
    <>
      {/* <div className="rowC"> */}
      <TextBox isReadOnly={false} />
      {/* <TextBox isReadOnly={true} /> */}
      {/* </div> */}
    </>
  );
}
