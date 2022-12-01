import express from "express";
import { loginController } from "../controllers/auth.js";

const route = express.Router();

route.post("/login", loginController);

export default route;
