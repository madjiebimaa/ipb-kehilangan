import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 5,
    },
    lostStatus: {
      type: String,
      default: "LOST",
      required: true,
    },
    lostDate: {
      type: String,
      required: true,
    },
    lostLocation: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    characteristics: {
      type: Array,
      default: [],
    },
    viewedCount: Number,
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamp: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
