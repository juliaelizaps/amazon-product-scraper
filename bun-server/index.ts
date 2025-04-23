// @ts-ignore
import express from "express";
import type { Request, Response } from "express";
import { scrapeAmazon } from "./scrape-amazon";

const app = express();
const port = 8080;

// GET route at /api/scrape (Ex.request:GET http://localhost:8080/api/scrape?keyword=dress)
app.get("/api/scrape", async (req: Request, res: Response) => {
    const keyword = req.query.keyword as string;
    await scrapeAmazon(keyword);
    res.json({keyword});
});

// Starting the server
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});





