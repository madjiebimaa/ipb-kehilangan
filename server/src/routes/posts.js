import express from "express";
import {
  createPostController,
  getPostsController,
} from "../controllers/posts.js";

const route = express.Router();

route.get("/", getPostsController);

export default route;
