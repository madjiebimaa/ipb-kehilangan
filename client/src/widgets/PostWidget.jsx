import {
  CalendarToday,
  ChatBubbleOutlineOutlined,
  CreateRounded,
  Download,
  LocationOnOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { toPng } from "html-to-image";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../components/FlexBetween";
import WidgetWrapper from "../components/WidgetWrapper";
import { API_URL } from "../constants";
import { setPost } from "../state";

const PostWidget = ({
  postId,
  postUserId,
  title,
  lostStatus,
  lostDate,
  lostLocation,
  characteristics,
  picturePath,
  comments,
}) => {
  const ref = useRef(null);
  const { palette } = useTheme();
  const isMobileScreens = useMediaQuery("(min-width: 760px)");
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);
  const loggedInUser = useSelector((state) => state.user);

  const [isComments, setIsComments] = useState(false);
  const [comment, setComment] = useState("");

  const { main, medium } = palette.neutral;

  const handleDownloadClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = picturePath;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref, picturePath]);

  const handleAddCommentClick = async () => {
    const updatedPostResponse = await fetch(
      `${API_URL}/posts/${postId}/comments`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUser._id, comment }),
      }
    );

    const updatedPost = await updatedPostResponse.json();
    dispatch(setPost({ post: updatedPost }));

    setComment("");
  };

  return (
    <WidgetWrapper m="2rem 0" ref={ref}>
      <FlexBetween>
        <Typography variant="h3" color={main}>
          {title}
        </Typography>

        <Button disabled>{lostStatus}</Button>
      </FlexBetween>

      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${API_URL}/assets/${picturePath}`}
        />
      )}

      <FlexBetween
        mt="1rem"
        sx={
          !isMobileScreens && {
            flexDirection: "column",
            alignItems: "start",
            gap: "0.5rem",
          }
        }
      >
        <Box display="flex" alignItems="center" gap="1rem">
          <LocationOnOutlined fontSize="large" sx={{ color: medium }} />
          <Typography color={main}>{lostLocation}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <CalendarToday fontSize="large" sx={{ color: medium }} />
          <Typography color={main}>{lostDate}</Typography>
        </Box>
      </FlexBetween>

      <Box sx={{ mt: "0.75rem" }}>
        <Typography variant="h5">Characteristics</Typography>
        {characteristics && (
          <Box mt="0.5rem">
            {characteristics.map((characteristic, i) => (
              <Box key={`${characteristic}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {characteristic}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Box>
        )}
      </Box>

      <FlexBetween mt="0.75rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="2rem">
          <IconButton onClick={handleDownloadClick}>
            <Download />
          </IconButton>

          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
      </FlexBetween>

      {isComments && (
        <Box mt="0.5rem">
          {loggedInUser._id !== postUserId && (
            <FlexBetween gap="0.75rem" mb="0.5rem">
              <TextField
                fullWidth
                label="comment"
                onChange={(e) => {
                  setComment(e.target.value);
                  console.log(comment);
                }}
                value={comment}
                name="comment"
              />
              <IconButton onClick={handleAddCommentClick}>
                <CreateRounded />
              </IconButton>
            </FlexBetween>
          )}
          {comments.map((comment, i) => (
            <Box key={`${title}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider sx={{ mt: "0.5rem" }} />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
