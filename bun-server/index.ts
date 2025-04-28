import express from "express";
import type { Request, Response } from "express";
import { scrapeAmazon } from "./scrape-amazon";
import cors from "cors";

const app = express();
const port = 8080;
app.use(cors());

app.get("/api/scrape", async (req: Request, res: Response) => {
    const keyword = req.query.keyword as string;
    //verificar se é string
    try {
        const response = await scrapeAmazon(keyword);
    res.json(response || []);
    } catch (error) {
        res.status(500).json({error:'Failed to scrape Amazon.com'})
    }
});

// Starting the server
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});





