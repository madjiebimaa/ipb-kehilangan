import express from "express";
import { getUserPostsController } from "../controllers/posts.js";
import { getUserController } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const route = express.Router();

route.get("/:userId", verifyToken, getUserController);
route.get("/:userId/posts", verifyToken, getUserPostsController);

export default route;
