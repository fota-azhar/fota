import { Button, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export function Success({ onBackClicked }: { onBackClicked: () => void }) {
  return (
    <>
      <CheckCircleOutlineIcon color="success" sx={{ fontSize: 100 }} />
      <Typography color="green" fontSize={30}>
        File uploaded successfully 🔥
      </Typography>
      <Button sx={{ textDecoration: "underline" }} onClick={onBackClicked}>
        upload new file?
      </Button>
    </>
  );
}
