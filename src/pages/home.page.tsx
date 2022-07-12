import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { HexFile } from "../types";
import { createUpdate } from "../utils/firebase/database.util";

export function Home() {
  const [hexFile, setHexFile] = useState<HexFile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const upload = async () => {
    if (!hexFile) {
      return;
    }

    setLoading(true);

    await createUpdate(hexFile);

    setHexFile(null);
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Typography>{hexFile?.name}</Typography>
        <Button variant="contained" component="label">
          Upload File
          <input
            type="file"
            hidden
            accept=".hex"
            onChange={(e) => {
              const hexFile = e?.target?.files?.[0];
              if (!hexFile) {
                return;
              }

              const reader = new FileReader();

              reader.readAsText(hexFile, "UTF-8");

              reader.onload = function (event) {
                const fileContent = event?.target?.result
                  ?.toString()
                  .replaceAll("\n", "")
                  .replaceAll(" ", "")
                  .replaceAll(":", "");

                if (fileContent) {
                  setHexFile({ name: hexFile.name, content: fileContent });
                }
              };
            }}
          />
        </Button>

        <LoadingButton
          variant="contained"
          onClick={upload}
          disabled={!hexFile}
          loading={loading}
        >
          Upload
        </LoadingButton>
      </header>
    </div>
  );
}
