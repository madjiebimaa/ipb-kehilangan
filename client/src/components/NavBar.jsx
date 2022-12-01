import {
  Close,
  DarkMode,
  Menu,
  Message,
  Notifications,
  Search,
} from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout, setMode } from "../state";
import FlexBetween from "./FlexBetween";

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1060px)");

  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const user = useSelector((state) => state.user);
  let fullName = user ? `${user.firstName} ${user.lastName}` : "anonymous";

  if (fullName.length > 10) {
    fullName = fullName.slice(0, 7);
    fullName = `${fullName}...`;
  }

  return (
    <FlexBetween padding={"1rem 6%"} bgcolor={palette.background.alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight={"bold"}
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color={"primary"}
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          IPB Kehilangan
        </Typography>

        {/* SEARCH INPUT */}
        {isNonMobileScreens && (
          <FlexBetween
            bgcolor={palette.neutral.light}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..."></InputBase>
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <DarkMode sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <Message sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton>
            <Notifications sx={{ fontSize: "25px" }} />
          </IconButton>
          <FormControl>
            <Select
              value={fullName}
              sx={{
                backgroundColor: palette.neutral.light,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: palette.neutral.light,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          bgcolor={palette.background.default}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="2rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            gap="3rem"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton onClick={() => dispatch(setMode())}>
              {palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <DarkMode sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton>
              <Message sx={{ fontSize: "25px" }} />
            </IconButton>
            <IconButton>
              <Notifications sx={{ fontSize: "25px" }} />
            </IconButton>
            <FormControl>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: palette.neutral.light,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: palette.neutral.light,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
}
