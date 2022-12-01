import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import CreatePostWidget from "../widgets/CreatePostWidget";
import FilterWidget from "../widgets/FilterWidget";
import HomeNavigationWidget from "../widgets/HomeNavigationWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";

export default function HomePage() {
  const isNonMobileScreens = useMediaQuery("(min-width: 1060px)");
  const isCreatePostShow = useSelector((state) => state.isCreatePostShow);

  const user = useSelector((state) => state.user);
  const { _id: userId, picturePath } = user;

  return (
    <Box>
      <NavBar />

      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {isNonMobileScreens && (
            <Box
              position="fixed"
              display="flex"
              gap="1rem"
              flexDirection="column"
            >
              <UserWidget userId={userId} picturePath={picturePath} />
              <HomeNavigationWidget />
            </Box>
          )}
        </Box>

        <Box flexBasis={isNonMobileScreens ? "42%" : undefined}>
          <Box display="flex" gap="1rem" flexDirection="column">
            {isCreatePostShow && <CreatePostWidget />}
            <FilterWidget />
            <PostsWidget userId={userId} />
          </Box>
        </Box>

        {isNonMobileScreens && (
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}></Box>
        )}
      </Box>
    </Box>
  );
}
