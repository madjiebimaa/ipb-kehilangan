import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 5,
    },
    lostStatus: {
      type: String,
      required: true,
    },
    lostDate: {
      type: Date,
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
    viewedCount: Number,
  },
  { timestamp: true }
);

const Post = mongoose.Model("Post", postSchema);

export default Post;
