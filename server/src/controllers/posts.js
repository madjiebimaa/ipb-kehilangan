import Post from "../models/Post.js";
import User from "../models/User.js";

export async function createPostController(req, res) {
  try {
    const {
      userId,
      title,
      lostDate,
      lostLocation,
      picturePath,
      characteristics,
    } = req.body;

    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      title,
      lostStatus: "LOST",
      lostDate,
      lostLocation,
      picturePath,
      characteristics,
      viewedCount: 0,
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();

    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
}

export async function getPostsController(req, res) {
  try {
    const post = await Post.find();

    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export async function getUserPostsController(req, res) {
  try {
    const { userId } = req.params;

    const post = await Post.find({ userId });

    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
