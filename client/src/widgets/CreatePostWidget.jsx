import {
  DeleteOutlined,
  EditOutlined,
  ImageOutlined,
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
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { Formik } from "formik";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
// import * as yup from "yup";
import FlexBetween from "../components/FlexBetween";
import MultipleInputField from "../components/MultipleInputField";
import WidgetWrapper from "../components/WidgetWrapper";
import { setPosts } from "../state";

// const createPostSchema = yup.object().shape({
//   title: yup.string().required("Required"),
//   lostLocation: yup.string().required("Required"),
//   picturePath: yup.string().required("Required"),
// });

const initialCreatePostSchema = {
  title: "",
  lostLocation: "",
};

export default function CreatePostWidget() {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const isMobileScreens = useMediaQuery("(min-width: 760px)");

  const [isImage, setIsImage] = useState(false);
  const [lostDate, setLostDate] = useState(dayjs());
  const [image, setImage] = useState(null);

  const { _id: userId } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const characteristics = useSelector((state) => state.postCharacteristics);

  const { medium, mediumMain } = palette.neutral;

  const handlePostFormSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();

    for (const value in values) {
      formData.append(value, values[value]);
    }

    formData.append("userId", userId);
    formData.append("lostDate", lostDate.format("dddd, MMMM D YYYY"));

    characteristics.forEach(function (characteristic, idx) {
      formData.append(`characteristics[${idx}]`, characteristic);
    });

    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const createPostResponse = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const posts = await createPostResponse.json();
    dispatch(setPosts({ posts }));
    onSubmitProps.resetForm();
    setImage(null);
    setIsImage(false);
  };

  return (
    <WidgetWrapper>
      <Formik
        onSubmit={handlePostFormSubmit}
        initialValues={initialCreatePostSchema}
        // validationSchema={createPostSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isMobileScreens ? undefined : "span 4",
                },
              }}
            >
              <TextField
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={Boolean(touched.title) && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />
              <Box sx={{ gridColumn: "span 2" }}>
                <DesktopDatePicker
                  label="Lost Date"
                  inputFormat="MM/DD/YYYY"
                  renderInput={(params) => <TextField {...params} />}
                  onBlur={handleBlur}
                  onChange={(dateValue) => setLostDate(dateValue)}
                  value={lostDate}
                  name="lostDate"
                />
              </Box>
              <TextField
                label="Lost Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lostLocation}
                name="lostLocation"
                error={
                  Boolean(touched.lostLocation) && Boolean(errors.lostLocation)
                }
                helperText={touched.lostLocation && errors.lostLocation}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            <Box mt="1rem">
              <MultipleInputField />
            </Box>

            {isImage && (
              <Box
                border={`1px solid ${medium}`}
                borderRadius="5px"
                mt="1rem"
                p="1rem"
              >
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                >
                  {({ getRootProps, getInputProps }) => (
                    <FlexBetween>
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        width="100%"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!image ? (
                          <p>Add Image Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{image.name}</Typography>
                            <EditOutlined />
                          </FlexBetween>
                        )}
                      </Box>
                      {image && (
                        <IconButton
                          onClick={() => setImage(null)}
                          sx={{ width: "15%" }}
                        >
                          <DeleteOutlined />
                        </IconButton>
                      )}
                    </FlexBetween>
                  )}
                </Dropzone>
              </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0" }} />

            <FlexBetween>
              <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                <ImageOutlined sx={{ color: mediumMain }} />
                <Typography
                  color={mediumMain}
                  sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                >
                  Image
                </Typography>
              </FlexBetween>

              <Button
                type="submit"
                // disabled={}
                sx={{
                  color: palette.background.alt,
                  backgroundColor: palette.primary.main,
                  borderRadius: "3rem",
                }}
              >
                POST
              </Button>
            </FlexBetween>
          </form>
        )}
      </Formik>
    </WidgetWrapper>
  );
}
