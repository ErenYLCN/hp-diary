import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/signout", signOut);

export default authRouter;
