import { Router } from "express";
import { getCurrentUser, getUser, getUsers } from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.get("/me", authMiddleware, getCurrentUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);

export default userRouter;
