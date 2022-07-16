import { useState } from "react";
import { Box } from "@mui/material";
import { Success, UploadFile } from "../components/home";

export function Home() {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {showSuccess ? (
        <Success onBackClicked={() => setShowSuccess(false)} />
      ) : (
        <UploadFile onSuccess={() => setShowSuccess(true)} />
      )}
    </Box>
  );
}
