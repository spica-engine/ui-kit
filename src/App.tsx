import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import RichTextInput from "components/atoms/inputs/normal/rich-text/RichText";

function App() {
  const test = ``
  return (
    <div className="App">
      <RichTextInput value={test} onChange={() => {}}/>
    </div>
  );
}

export default App;
