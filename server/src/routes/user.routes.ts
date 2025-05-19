import { Router } from "express";

const userRouter = Router();

userRouter.get("/me", (req, res) => {
  res.send({ title: "User route" });
});

export default userRouter;
