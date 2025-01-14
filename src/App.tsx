import React from "react";
import styles from "./App.module.scss";
import FlexElement from "./components/atoms/flex-element/FlexElement";
import FluidContainer from "./components/atoms/fluid-container/FluidContainer";

function App() {
  return (
    <div className="App">
      <FluidContainer

        prefix={{ children: <span>a.</span>, alignment: "leftBottom", dimensionY: "fill" }}
        root={{ children: <span>Test</span>, dimensionY:100}}
        suffix={{ children: <span>#</span> }}
        mode="fill"
      />
          
        

    </div>
  );
}

export default App;
