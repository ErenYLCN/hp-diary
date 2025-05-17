import express, { Request, Response } from "express";

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
