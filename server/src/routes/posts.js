import express from "express";
import {
  addPostCommentController,
  getPostsController,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const route = express.Router();

route.get("/", verifyToken, getPostsController);
route.patch("/:postId/comments", verifyToken, addPostCommentController);

export default route;
