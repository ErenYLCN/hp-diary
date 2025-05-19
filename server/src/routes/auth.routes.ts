import { Request, Response, Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (req: Request, res: Response) => {
  res.send({ title: "Sign up route" });
});

export default authRouter;
