// Material imports
import {
  Typography,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const Heading = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "2rem",
});
export const Quantity = styled(TextField)({
  maxWidth: "4rem",
  input: {
    height: 8,
  },
  // height: 20,
  marginRight: "2rem",
});
export const FeatureImage = styled("img")({
  height: "95%",
  width: "95%",
});
export const SubImage = styled("img")({
  height: "80%",
  width: "80%",
});
