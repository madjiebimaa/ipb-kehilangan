import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const postsResponse = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const posts = await postsResponse.json();
    dispatch(setPosts({ posts }));
  };

  const getUserPosts = async () => {
    const postsResponse = await fetch(
      `http://localhost:3001/users/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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
    <>
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
    </>
  );
};

export default PostsWidget;
