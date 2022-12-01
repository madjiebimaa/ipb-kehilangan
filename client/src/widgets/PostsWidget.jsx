import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../constants";
import { setPosts } from "../state";
import PostWidget from "./PostWidget";

export default function PostsWidget({ userId, isProfile = false }) {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const postsResponse = await fetch(`${API_URL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const posts = await postsResponse.json();
    dispatch(setPosts({ posts }));
  };

  const getUserPosts = async () => {
    const postsResponse = await fetch(`${API_URL}/users/${userId}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const posts = await postsResponse.json();
    dispatch(setPosts({ posts }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      {posts.map(
        ({
          _id,
          userId,
          title,
          lostStatus,
          lostDate,
          lostLocation,
          picturePath,
          characteristics,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            title={title}
            lostStatus={lostStatus}
            lostDate={lostDate}
            lostLocation={lostLocation}
            picturePath={picturePath}
            characteristics={characteristics}
            comments={comments}
          />
        )
      )}
    </Box>
  );
}
