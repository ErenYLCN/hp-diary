import { Router } from "express";
import { signIn, signOut, signUp, refreshToken, revokeAllTokens } from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/signout", signOut);
authRouter.post("/refresh", refreshToken);
authRouter.post("/revoke-all", authMiddleware, revokeAllTokens);

export default authRouter;
