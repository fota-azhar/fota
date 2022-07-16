import { Box, Button, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export function Success({ onBackClicked }: { onBackClicked: () => void }) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <CheckCircleOutlineIcon color="success" sx={{ fontSize: 180 }} />

      <Typography color="green" fontSize={30} marginBottom={4}>
        File uploaded successfully 🔥
      </Typography>

      <Button sx={{ textDecoration: "underline" }} onClick={onBackClicked}>
        upload new file?
      </Button>
    </Box>
  );
}
