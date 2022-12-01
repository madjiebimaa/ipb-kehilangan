import express from "express";
import { getUserPostsController } from "../controllers/posts.js";
import { getUserController } from "../controllers/users.js";

const route = express.Router();

route.get("/:userId", getUserController);
route.get("/:userId/posts", getUserPostsController);

export default route;
