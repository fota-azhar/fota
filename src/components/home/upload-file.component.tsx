import { LoadingButton } from "@mui/lab";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { HexFile } from "../../types";
import { createUpdate } from "../../utils/firebase/database.util";

export function UploadFile({ onSuccess }: { onSuccess: () => void }) {
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
    onSuccess();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 8 }}>
        Upload HEX file to FOTA real time database
      </Typography>

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
                .replaceAll("\r", "")
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
        sx={{ marginTop: 2 }}
      >
        Upload
      </LoadingButton>
    </Box>
  );
}
