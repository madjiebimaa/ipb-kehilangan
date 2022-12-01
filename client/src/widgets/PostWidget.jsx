import {
  CalendarToday,
  ChatBubbleOutlineOutlined,
  Download,
  LocationOnOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { toPng } from "html-to-image";
import { useCallback, useRef, useState } from "react";
import FlexBetween from "../components/FlexBetween";
import WidgetWrapper from "../components/WidgetWrapper";

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

  const [isComments, setIsComments] = useState(false);

  const { main, medium } = palette.neutral;

  const onDownloadClick = useCallback(() => {
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
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}

      <FlexBetween mt="1rem">
        <Box display="flex" alignItems="center" gap="1rem">
          <LocationOnOutlined fontSize="large" sx={{ color: medium }} />
          <Typography color={main}>{lostLocation}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <CalendarToday fontSize="large" sx={{ color: medium }} />
          <Typography color={main}>
            {lostDate.format("dddd, MMMM D YYYY")}
          </Typography>
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
          <IconButton onClick={onDownloadClick}>
            <Download />
          </IconButton>

          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
      </FlexBetween>

      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${title}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
