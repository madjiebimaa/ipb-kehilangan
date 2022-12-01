import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import AuthForm from "../components/AuthForm";

export default function AuthPage() {
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1060px)");

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={palette.background.alt}
        p="5px 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          IPB Kehilangan
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "90%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={palette.background.alt}
      >
        <AuthForm />
      </Box>
    </Box>
  );
}
