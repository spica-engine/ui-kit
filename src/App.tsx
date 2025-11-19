import React from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import { Color, ColorPicker } from "./index.export";

function App() {
  return (
    <div className={styles.app}>
      <Color value="#1677ff" />
      <ColorPicker
        defaultValue="#1677FF"
        onChange={(color) => console.log(color.hex, color.rgb, color.hsl)}
        format="hex"
        placement="bottom-start"
        disabled={false}
      />
    </div>
  );
}

export default App;
