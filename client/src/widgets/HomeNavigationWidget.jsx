import { Create, Home, Message } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import WidgetWrapper from "../components/WidgetWrapper";
import { setIsCreatePostShow } from "../state";

export default function HomeNavigationWidget() {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <WidgetWrapper>
      <Box
        display="flex"
        alignItems="center"
        gap="1rem"
        mb="1rem"
        borderRadius="9px"
        color={palette.neutral.medium}
        sx={{
          "&:hover": {
            color: palette.neutral.dark,
            cursor: "pointer",
          },
        }}
        onClick={() => navigate("/")}
      >
        <Home />
        <Typography>Home</Typography>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        gap="1rem"
        mb="1rem"
        borderRadius="9px"
        color={palette.neutral.medium}
        sx={{
          "&:hover": {
            color: palette.neutral.dark,
            cursor: "pointer",
          },
        }}
        onClick={() => navigate("/chat")}
      >
        <Message />
        <Typography>Chat</Typography>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        gap="1rem"
        mb="1rem"
        borderRadius="9px"
        color={palette.neutral.medium}
        sx={{
          "&:hover": {
            color: palette.neutral.dark,
            cursor: "pointer",
          },
        }}
        onClick={() => dispatch(setIsCreatePostShow())}
      >
        <Create />
        <Typography>Create Post</Typography>
      </Box>
    </WidgetWrapper>
  );
}
