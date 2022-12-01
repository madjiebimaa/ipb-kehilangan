import { Button, useMediaQuery } from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import WidgetWrapper from "../components/WidgetWrapper";

export default function FilterWidget() {
  const isNonMobileScreens = useMediaQuery("(min-width: 1060px)");

  return (
    <WidgetWrapper sx={!isNonMobileScreens && { mt: "1rem" }}>
      <FlexBetween
        sx={!isNonMobileScreens && { flexDirection: "column", gap: "1rem" }}
      >
        <Button>FOUND</Button>
        <Button>LOST</Button>
      </FlexBetween>
    </WidgetWrapper>
  );
}
