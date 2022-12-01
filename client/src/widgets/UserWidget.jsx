import { Box, Divider, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../components/FlexBetween";
import UserImage from "../components/UserImage";
import WidgetWrapper from "../components/WidgetWrapper";

export default function UserWidget({ userId, picturePath }) {
  const { palette } = useTheme();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const { firstName, lastName } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={palette.neutral.dark}
              fontSize="1rem"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>
    </WidgetWrapper>
  );
}
