import React from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import RelationInput from "@atoms/relation/RelationInput";

function App() {
  return (
    <div className={styles.app}>
      <RelationInput
        label={"fs"}
        value={[
          "asdas",
          "sdfsd",
          "fsd",
          "dfsd",
          "sdfsd",
          "fsd",
          "dfsd",
          "sdfsd",
          "fsd",
          "dfsd",
          "sdfsd",
          "fsd",
          "dfsd",
          "sdfsd",
          "fsd",
          "dfsd",
          "sdfsd",
          "fsd",
          "dfsd",
          "sdfsd",
          "fsd",
          "dfsd",
        ]}
      ></RelationInput>
    </div>
  );
}

export default App;
