import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { createUpdate } from "./utils/firebase/database.util";

function App() {
  const [hex, setHex] = useState<string>("");

  const upload = async () => {
    if (!hex) {
      return;
    }

    createUpdate(hex);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <input
          type="file"
          onChange={(e) => {
            const file = e?.target?.files?.[0];
            if (!file) {
              return;
            }

            const reader = new FileReader();

            reader.readAsText(file, "UTF-8");

            reader.onload = function (event) {
              const fileContent = event?.target?.result
                ?.toString()
                .replaceAll("\n", "")
                .replaceAll(" ", "")
                .replaceAll(":", "");

              if (fileContent) {
                setHex(fileContent);
              }
            };
          }}
          accept=".hex"
        />
        <button onClick={upload}>Upload</button>
      </header>
    </div>
  );
}

export default App;
