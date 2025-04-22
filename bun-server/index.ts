// @ts-ignore
import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = 8080;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "hello, express bun here" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});





