// @ts-ignore
import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = 8080;

// GET route at /api/scrape (Ex.request:GET http://localhost:8080/api/scrape?keyword=dress)
app.get("/api/scrape", (req: Request, res: Response) => {
    const keyword = req.query.keyword as string;
    res.json({ message: `Received keyword: ${keyword}` });
});

// Starting the server
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});





