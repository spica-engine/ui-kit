import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import StorageInput from "components/atoms/inputs/normal/storage/Storage";

function App() {
  const [link, setLink] = useState("");

  const handleFileUpload = (file: File) => {
    const fileType = file.type;

    if (fileType.startsWith("image/")) {
      const objectURL = URL.createObjectURL(file);
      console.log("objectURL: ", typeof objectURL);
      setLink(objectURL)
      // setPreview(objectURL);
      // setIsImage(true);
    } else {
      // setPreview(null);
      // setIsImage(false);
    }

    // onFileUpload(file);
  };

  return (
    <div className="App">
      <StorageInput label="Storage" fileLink={link} onFileUpload={(file) => handleFileUpload(file)} />
    </div>
  );
}

export default App;
