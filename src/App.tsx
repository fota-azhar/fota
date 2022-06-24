import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { createUpdate } from "./utils/firebase/database.util";
import { uploadFile } from "./utils/firebase/storage.util";

function App() {
  const [image, setImage] = useState<File | undefined>(undefined);

  const upload = async () => {
    if (!image) {
      return;
    }

    uploadFile({
      file: image,
      onProgress: (progress) => {
        console.log({ progress });
      },
      onComplete: async (fileUrl) => {
        createUpdate(fileUrl);
      },
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <input
          type="file"
          onChange={(e) => {
            const file = e?.target?.files?.[0];
            setImage(file);
          }}
        />
        <button onClick={upload}>Upload</button>
      </header>
    </div>
  );
}

export default App;
