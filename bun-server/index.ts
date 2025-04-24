// @ts-ignore
import express from "express";
import type { Request, Response } from "express";
import { scrapeAmazon } from "./scrape-amazon";

const app = express();
const port = 8080;

app.get("/api/scrape", async (req: Request, res: Response) => {
    const keyword = req.query.keyword as string;
    const response = await scrapeAmazon(keyword);
    res.json(response);
});

// Starting the server
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});





